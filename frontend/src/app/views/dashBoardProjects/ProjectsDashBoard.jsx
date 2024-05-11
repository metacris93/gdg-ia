/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { SimpleCard } from 'app/components';
import { useEffect } from 'react';
import { urls } from 'app/func/InstanceAxios';
import { useState } from 'react';
import axios from 'axios';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.client.name}
        </TableCell>
        <TableCell align="center">{row.client.industry}</TableCell>
				<TableCell align="center">{row.client.contact_email}</TableCell>
        <TableCell align="center">{(row.tech_stack)? row.tech_stack.join(", "): ""}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Consultants
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align='center'>Tech Stack</TableCell>
										<TableCell align='center'>Area of interest</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.consultants.map((consultant) => (
                    <TableRow key={consultant.name}>
                      <TableCell component="th" scope="row">
                        {consultant.name}
                      </TableCell>
                      <TableCell align='center'>{(consultant.tech_stack)? consultant.tech_stack.join(", "): ""}</TableCell>
											<TableCell component="th" scope="row" align='center'>
                        {consultant.areas_of_interest.map(area => (area.name)).join(", ")}
                      </TableCell>
										</TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default function ProjectsDashBoard() {
	const [data, setData] = useState([])
	useEffect(() => {
		axios.get(urls.teams)
		.then(res => setData(res.data))
		.catch(err => console.error(err))
	},[])
  return (
		<SimpleCard>
			<TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Client Name</TableCell>
            <TableCell align="center">Industry</TableCell>
            <TableCell align="center">email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
							<Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
		</SimpleCard>

  );
}
