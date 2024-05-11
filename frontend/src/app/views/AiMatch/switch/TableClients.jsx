import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { Fragment } from 'react';
import axios from 'axios';
const columns = [
  { id: 'name', label: 'Name', minWidth: 170, align:'center' },
  { id: 'industry', label: 'Industry', minWidth: 100, align:'center' },
  {
    id: 'contact_email',
    label: 'Description',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  }
];


// eslint-disable-next-line react/prop-types
export default function StickyHeadTable({setDisplay, setData}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [search, setSearch] = React.useState("")
	const [clients, setClients] = React.useState([])

	useEffect(() => {
		axios.get('http://localhost:8001/api/clients/')
		.then(res => {setClients(res.data)})
		.catch(err => {console.log(err)})
	},[])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

	useEffect(() => {
		if(search.length === 0) {
			axios.get('http://localhost:8001/api/clients/')
			.then(res => {setClients(res.data)})
			.catch(err => {console.log(err)})
		}else {
			setClients(clients.filter((client) => client.name.toLowerCase().includes(search)))
		}
	}, [search])
  return (
		<Fragment>
			<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TextField size='small' variant='filled' label='search' onChange={(e) => setSearch(e.target.value)}/>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {clients
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}  onClick={() => {setData({client: row}); setDisplay(2)}}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={clients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
		</Fragment>

  );
}
