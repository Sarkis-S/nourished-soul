import { useState } from 'react';
// Material-UI
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

import globe from '../images/globe.gif';


const myStyles = {
  globe: {
    maxWidth: '100%',
    maxHeight: '100%',
  }
}

const LocInfo = ({ setContact, city, cityState, country, setCity, setCityState, setCountry }) => {
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

  // PrayerTimes API - https://aladhan.com/v1
  // Endpoint - /timingsByCity
  // Tune=Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight
  // Returns all prayer times for a specific date in a particular city with customization
  const URL = `http://api.aladhan.com/v1/timingsByCity?city=${city}&state=${cityState}&country=${country}
  &method=99&methodSettings=18,null,18&tune=0,0,0,1,1,1,0,0,0`;

  const getData = async () => {
    await fetch (URL)
      .then((response) => {
        if (response.status !== 200) {
          console.log('There is a problem with the request. Status code: ' + response.status);
          return;
        }

        response.json()
          .then((data) => {
            // console.log('Response data (full): ', data);
            // console.log('Response prayer times: ', data.data.timings);

            setDate({
              day: data.data.date.gregorian.day,
              month: data.data.date.gregorian.month.en,
              year: data.data.date.gregorian.year
            });

            setContact({
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
          });
      });
    return;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
  }


  return (
    <div>
      <Typography style={{ marginBottom: 15 }}>
        <strong>
          {`Today is: ${date.month} ${date.day}, ${date.year} `}
        </strong>
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          id="outlined-helperText"
          label="City"
          defaultValue="San Jose"
          variant="outlined"
          style={{ width: 100, margin: 5 }}
          onChange={e => setCity(e.target.value)}
        />
        <TextField
          required
          id="outlined-helperText"
          label="State"
          defaultValue="CA"
          variant="outlined"
          style={{ width: 75, margin: 5 }}
          onChange={e => setCityState(e.target.value)}
        />
        <TextField
          id="outlined-helperText"
          label="Country"
          defaultValue="United States"
          variant="outlined"
          style={{ width: 150, margin: 5 }}
          onChange={e => setCountry(e.target.value)}
        /><br/>
        
        <Button
          label="Get Times"
          variant="outlined"
          type="submit" color="primary">
          Get times &nbsp;
          <QueryBuilderIcon />
        </Button>
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
