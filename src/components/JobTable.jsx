import {useState, useEffect} from 'react';

import {DataGrid} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import {Box, Button, Typography, FormControl} from '@mui/material';

const columns = [
  {field: 'company', headerName: 'Company', width: 175},
  {field: 'jobTitle', headerName: 'Job Title', width: 250},
  {field: 'postedDate', headerName: 'Posted On', width: 150},
];

const JobTable = ({jobs, selectedRows, setSelectedRows}) => {
  const [rows, setRows] = useState();

  const buildTableData = () => {
    const tempRows = [];
    for (const job of jobs) {
      const newRow = {};
      for (const [key, value] of Object.entries(job)) {
        if (key === 'postedDate') {
          const date = new Date(job.postedDate.seconds * 1000).toLocaleDateString();
          newRow[key] = date;
        } else {
          newRow[key] = value;
        }
      }
      tempRows.push(newRow);
    }
    setRows(tempRows);
  };
  // console.log(jobs);
  useEffect(() => {
    buildTableData();
  }, [jobs]);

  const handleClick = e => {
    console.log(e);
    console.log('selected item: ', selectedRows[0]);
  };

  return (
    <div>
      <Paper elevation={2}>
        <Typography variant="h4" gutterBottom>
          Jobs Matches
        </Typography>
        <Box component={FormControl}>
          {rows && (
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {page: 0, pageSize: 5},
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection={false}
              onRowSelectionModelChange={ids => {
                setSelectedRows(ids);
              }}
            />
          )}
          <Button onClick={handleClick}>Change Location</Button>
        </Box>
      </Paper>
    </div>
  );
};

export default JobTable;
