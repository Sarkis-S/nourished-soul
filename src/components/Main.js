import { useState } from 'react';
// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
// Child components
import NavBar from './NavBar';
import Footer from './Footer';
import LocInfo from './LocInfo';
import PrayerInfo from './PrayerInfo';
import Quote from './Quote';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingTop: '25px',
    paddingBottom: '25px',
    minWidth: 'auto',
    justify: 'center',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  leadContainer: {
    width: '100%',
    minWidth: 250,
    paddingTop: 25,
    opacity: 0.6,
  },
  leadingPaper: {
    minWidth: 'auto',
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 25,
    paddingRight: 25,
    justify: 'center',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  innerPaper: {
    minWidth: 'auto',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderStyle: 'solid',
    border: 1,
    borderColor: 'lightgray',
    color: 'gray'
  }
}));


const Main = () => {
  const styles = useStyles();
  // These states are grouped together and will be used for reference
  // Since data isn't mutated, but pulled from API it doesn't need to be
  // declared individually
  const [contact, setContact] = useState({
    Dawn: '0:00',
    Sunrise: '0:00',
    Noon: '0:00',
    Afternoon: '0:00',
    Sunset: '0:00',
    Night: '0:00'
  });
  // These states are passed to sibling components
  // Ex: city is passed to PrayerInfo.js, while setCity is sent to LocInfo.js
  // The use of 'setCity' will update the 'city' state in LocInfo.js
  const [city, setCity] = useState('San Jose');
  const [cityState, setCityState] = useState('CA');
  const [country, setCountry] = useState('United States');
  
  return (
    <Container className={styles.leadContainer}>
      <NavBar />
      <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Paper className={styles.leadingPaper} elevation={4}>
              {/* Location Info Component */}
              <section>
                <LocInfo
                  setContact={setContact}
                  city={city}
                  cityState={cityState}
                  country={country}
                  setCity={setCity}
                  setCityState={setCityState}
                  setCountry={setCountry}
                />
              </section>
              {/* An extra section for whatever is needed */}
              <Paper className={styles.innerPaper} elevation={0}>
                <aside>
                  <Typography>
                    Pro-tip: Your browser caches your input the first time. There is no need for re-input. You're welcome.
                  </Typography>
                </aside>
              </Paper>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={styles.leadingPaper} elevation={4}>
              {/* Prayer Info Component */}
              <section>
                <PrayerInfo
                  contact={contact}
                  city={city}
                  cityState={cityState}
                  country={country}
                />
              </section>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={styles.paper} elevation={4}>
              <aside>
                <Quote />
              </aside>
            </Paper>
          </Grid>
      </Grid>
      <Footer />
    </Container>
  );
}

export default Main;