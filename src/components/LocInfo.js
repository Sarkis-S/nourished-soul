import { useState, useEffect, useCallback } from 'react';
// Material-UI
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import globe from '../images/globe.gif';
import useDebounce from '../helpers/debounce';

const myStyles = {
  globe: {
    maxWidth: '100%',
    maxHeight: '100%',
  }
}

const LocInfo = ({ setPrayer, city, cityState, country, setCity, setCityState, setCountry, toggle }) => {
  const [date, setDate] = useState({
    day: 'Day',
    month: 'Month ',
    year: 'Year'
  });

  const [meta, setMeta] = useState({
    longitude: 0,
    latitude: 0,
    zone: 'None'
  });

  const debouncedCity = useDebounce(city, 700);
  const debouncedState = useDebounce(cityState, 700);
  const debouncedCountry = useDebounce(country, 700);

  // Helper function from 24 to 12 hour conversion
  const timeConverter = (data) => {
    let newData = data;
  
    for (let key in newData) {
      let subString1 = parseInt(newData[key].substring(0, 2));
      let subString2 = newData[key].substring(3, 5);
      // Falls between (0:00 / midnight to 0:59), add 12 hours and AM
      if (subString1 === 0) {
        subString1 += 12;
        newData[key] = `${subString1}:${subString2} am`;
      // From (1:00 to 11:59), simply add AM
      } else if (subString1 >= 1 && subString1 <= 11) {
        newData[key] = `${subString1}:${subString2} am`;
      // If it's noon, simplay add PM
      } else if (subString1 === 12) {
        newData[key] = `${subString1}:${subString2} pm`;
      // For times between (13:00 to 23:59), subtract 12 hours and add PM
      } else if (subString1 >= 13 && subString1 <= 23) {
        subString1 -= 12;
        newData[key] = `${subString1}:${subString2} pm`;
      }
    }
    return newData;
  }

  // setState handler for received prayer data
  const setData = useCallback((data) => {
    setDate({
      day: data.data.date.gregorian.day,
      month: data.data.date.gregorian.month.en,
      year: data.data.date.gregorian.year
    });
    setPrayer({
      Dawn: data.data.timings.Fajr,
      Sunrise: data.data.timings.Sunrise,
      Noon: data.data.timings.Dhuhr,
      Afternoon: data.data.timings.Asr,
      Sunset: data.data.timings.Maghrib,
      Night: data.data.timings.Isha
    });
    setMeta({
      longitude: data.data.meta.longitude,
      latitude: data.data.meta.latitude,
      zone: data.data.meta.timezone
    });
  },[setPrayer]);

  // Fetches prayer data then sets new data to state
  const getData = useCallback(async () => {
    // PrayerTimes API - https://aladhan.com/v1 | Endpoint - /timingsByCity
    // Tune=Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight
    // Returns all prayer times for a specific date in a particular city with customization
    const URL = `http://api.aladhan.com/v1/timingsByCity?city=${debouncedCity}&state=${debouncedState}&country=${debouncedCountry}
    &method=99&methodSettings=18,null,18&tune=0,0,0,1,1,1,0,0,0`;

    const response = await fetch (URL);
    if (!response.ok) {
      const message = `An error has occurred. Status code: ${response.status}, Is that location forealz? Check your sources friend!`;
      console.log(message);
      return null;
    }
    const data = await response.json();
    // Fires when the toggle is left off (default)
    if (toggle.checked === false) {
      const prayers = data.data.timings;
      data.data.timings = timeConverter(prayers);
      // console.log('Data: ', data.data.timings);
      return setData(data);
    }
    // console.log('Data (toggled): ', data.data.timings);
    return setData(data);
  }, [debouncedCity, debouncedState, debouncedCountry, setData, toggle]);
  
  
  useEffect(() => {
    if (debouncedCity || debouncedState || debouncedCountry) {
      let results = getData();
      return results;
    }
  }, [getData, debouncedCity, debouncedState, debouncedCountry]);


  return (
    <div>
      <Typography style={{ marginBottom: 15 }}>
        <strong>
          {`Today is: ${date.month} ${date.day}, ${date.year} `}
        </strong>
      </Typography>

      <form>
        <TextField
          required
          id="outlined-city"
          name="City"
          label="City"
          value={city}
          variant="outlined"
          style={{ width: 100, margin: 5 }}
          InputLabelProps={{ shrink: true }}
          onChange={e => setCity(e.target.value)}
        />
        <TextField
          required
          id="outlined-state"
          name="State"
          label="State"
          value={cityState}
          variant="outlined"
          style={{ width: 75, margin: 5 }}
          InputLabelProps={{ shrink: true }}
          onChange={e => setCityState(e.target.value)}
        />
        <TextField
          id="outlined-country"
          label="Country"
          name="Country"
          value={country}
          variant="outlined"
          style={{ width: 150, margin: 5 }}
          InputLabelProps={{ shrink: true }}
          onChange={e => setCountry(e.target.value)}
        />
      </form>

      <figure>
        <img
          className="globe" src={globe} alt="globe"
          style={myStyles.globe} />
      </figure>
      <Typography>
        {`Longitude: ${meta.longitude},
        Latitude: ${meta.latitude}`}<br/>
        {`Time-Zone: ${meta.zone}`}
      </Typography>
    </div>
  );
}

export default LocInfo;