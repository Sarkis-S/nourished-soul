import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    width: '100%',
    minWidth: 250,
    marginTop: '10px',
    marginBottom: '10px',
    fontSize: '12px',
    backgroundColor: '#CACFE3',
    letterSpacing: 10,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 5
  },
});

const Footer = () => {
  const styles = useStyles();

  return (
    <footer className={styles.root}>
      <Typography component={'span'}>
        <Box 
          fontFamily="Montserrat"
          letterSpacing={2}>
          calculation provided by aladhan.com
        </Box>
      </Typography>
    </footer>
  );
}

export default Footer;
