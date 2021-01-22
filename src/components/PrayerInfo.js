import React from 'react';
// Material-UI
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    }
  },
}))(TableRow);

const createData = (prayer, time) => {
  return { prayer, time };
}

const useStyles = makeStyles({
  table: {
    minWidth: 200
  }
});

const PrayerInfo = ({ prayer, city, cityState, country, toggle, setToggle }) => {
  const classes = useStyles();

  const rows = [
    createData('Dawn', prayer.Dawn),
    createData('Sunrise', prayer.Sunrise),
    createData('Noon', prayer.Noon),
    createData('Afternoon', prayer.Afternoon),
    createData('Sunset', prayer.Sunset),
    createData('Night', prayer.Night),
  ];

  const handleChange = (event) => {
    setToggle({ ...toggle, [event.target.name]: event.target.checked });
  };
  
  return (
    <div>
      <Typography component={'span'}>
        <strong>
          {`${city}, ${cityState}, ${country}`}
        </strong>
      <Switch
        checked={toggle.checked}
        onChange={handleChange}
        color="primary"
        name="checked"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      </Typography>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Prayer</StyledTableCell>
              <StyledTableCell align="right">Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.prayer}>
                <StyledTableCell component="th" scope="row">
                  {row.prayer}
                </StyledTableCell>
                <StyledTableCell align="right">{row.time}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PrayerInfo;
