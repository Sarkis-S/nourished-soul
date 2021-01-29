import { useState, useEffect, useCallback } from 'react';
// Material-UI
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import globe from '../images/globe.gif';
// Helper functions
import useDebounce from '../helpers/debounce';
import timeConverter from '../helpers/timeConverter';

const myStyles = {
  globe: {
    maxWidth: '100%',
    maxHeight: '100%',
  }
}

const LocInfo = ({
  setPrayer, toggle, city, cityState, country,
  setCity, setCityState, setCountry }) => {
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

  /**************************************************
   * Fetches prayer data then sets new data to state
   **************************************************/
  const getData = useCallback(async () => {
    // PrayerTimes API - https://aladhan.com/v1 | Endpoint - /timingsByCity
    // Tune=Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight
    // Returns all prayer times for a specific date in a particular city with customization
    const URL = `http://api.aladhan.com/v1/timingsByCity?city=${debouncedCity}&state=${debouncedState}&country=${debouncedCountry}
    &method=99&methodSettings=18,null,18&tune=0,0,0,1,1,1,0,0,0`;

    const response = await fetch (URL);
    if (!response.ok) {
      const message = `An error has occurred. Status code: ${response.status}, Location unrecognized.`;
      console.log(message);
      return null;
    }
    const data = await response.json();
    // Fires when toggle is off (default)
    if (toggle.checked === false) {
      const prayers = data.data.timings;
      data.data.timings = timeConverter(prayers);
      return setData(data);
    }
    return setData(data);
  }, [debouncedCity, debouncedState, debouncedCountry, setData, toggle]);


  /********************************************
   * Initial prayer fetch based on geolocation
   ********************************************/
  const getGeoTimes = useCallback(async (latitude, longitude) => {
    // return all prayer times on specific date with latitude and longitude
    const URL = `http://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=99&methodSettings=18,null,18&tune=0,0,0,1,1,1,0,0,0`;

    const response = await fetch (URL);
    if (!response.ok) {
      const message = `An error has occurred. Status code: ${response.status}, There is an issue with location services`;
      console.log(message);
      return null;
    }
    const data = await response.json();
    // Fires when toggle is off (default)
    if (toggle.checked === false) {
      const prayers = data.data.timings;
      data.data.timings = timeConverter(prayers);
      return setData(data);
    }
    return setData(data);
  }, [setData, toggle]);


  const onGeolocateSuccess = useCallback((coordinates) => {
    const { latitude, longitude } = coordinates.coords;
    getGeoTimes(latitude, longitude);
  }, [getGeoTimes]);
  
  // prompts user to enable location services with options
  const onGeolocateError = (error) => {
    console.warn(error.code, error.message);
   
    if (error.code === 1) {
      // they said no
      alert('Locaton services needs to be enabled for optimal usage of the app');
    } else if (error.code === 2) {
      // position unavailable
      alert('Location services seems to be unavailable at this time');
    } else if (error.code === 3) {
      // timeout
      alert('Please refresh the page and enable location services');
    }
  }
  
  
  useEffect(() => {
    if (debouncedCity === '' && debouncedState === '' && debouncedCountry === '') {
      // first checks browser support for geolocation
      if (window.navigator && window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onGeolocateSuccess, onGeolocateError);
      }
    } else if (debouncedCity === '' || debouncedState === '' || debouncedCountry === '') {
      return null;
    } else if (debouncedCity || debouncedState || debouncedCountry) {
      let results = getData();
      return results;
    }
  }, [getData, debouncedCity, debouncedState, debouncedCountry, onGeolocateSuccess]);
  

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