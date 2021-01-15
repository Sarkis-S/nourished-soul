import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles({
  root: {
    width: '100%',
    minWidth: 250,
    paddingTop:5,
    paddingBottom: 5,
    marginBottom: 5,
    backgroundColor: '#838BB2',
    color: 'white',
    textAlign: 'center',
    borderRadius: 5
  },
});


const NavBar = () => {
  const styles = useStyles();
  
  return (
    <header className={styles.root}>
      <Typography component={'span'}>
        <Box
          fontFamily="Montserrat"
          letterSpacing={12}>
          Nourished Soul
        </Box>
      </Typography>
    </header>
  );
}

export default NavBar;
