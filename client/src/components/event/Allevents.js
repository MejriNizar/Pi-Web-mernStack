import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getallevents, deleteevent} from '../../actions/event';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link, withRouter} from 'react-router-dom'


const Allevents = ({deleteevent,getallevents,events: {events,loading}}) => {
        
    useEffect(()=>{
        getallevents();
        
        
    }, [getallevents]);
    
   
   
    return (




        <TableContainer component={Paper}>
      <Table className={Allevents.events} aria-label="simple table">
        <TableHead>
          <TableRow  bgcolor="#00ace6">
            <th align="left">Title</th>
            <th align="right">Description</th>
            <th align="right">Place</th>
            <th align="right">Start date</th>
            <th align="right">End date</th>
            <th align="right" colSpan="2">Actions</th>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map(row => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <td align="right">{row.description}</td>
              <td align="right">{row.place}</td>
              <td align="right">{row.startDate}</td>
              <td align="right">{row.endDate}</td>
              <td align="right"><Link to={`/event-details/${row._id}`} ><i className="fas fa-eye"></i> </Link></td><td align="right"><Link onClick={e=>deleteevent(row._id)}><i className='fas fa-trash'></i></Link></td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>




    
    )    
};

Allevents.propTypes = {
    getallevents: PropTypes.func.isRequired,
    deleteevent: PropTypes.func.isRequired
    };
const mapStateToProps = state => ({
    events: state.events
});
export default connect(mapStateToProps,{deleteevent,getallevents}) (withRouter(Allevents));
