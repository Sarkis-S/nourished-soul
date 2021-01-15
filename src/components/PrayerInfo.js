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
  },
});

const PrayerInfo = ({ contact, city, cityState, country }) => {
  const classes = useStyles();

  const rows = [
    createData('Dawn', contact.Dawn),
    createData('Sunrise', contact.Sunrise),
    createData('Noon', contact.Noon),
    createData('Afternoon', contact.Afternoon),
    createData('Sunset', contact.Sunset),
    createData('Night', contact.Night),
  ];
  
  return (
    <div>
      <Typography component={'span'}>
        <strong>
          {`Location: ${city}, ${cityState} ${country}`}
        </strong>
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
