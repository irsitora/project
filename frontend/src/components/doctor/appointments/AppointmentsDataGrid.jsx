import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Box, Grid, IconButton } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// ! Style Date Grid Mui --------------------------------
const styleDataGrid = {
  fontSize: '1.4rem',
  fontWeight: '600',
  mb: '0.4em',
  color: 'primary.main',
  '& .css-1sbqmwx-MuiButtonBase-root-MuiButton-root': {
    color: 'primary.dark !important',
    fontSize: '1.6rem',
  },
  '& .css-pdct74-MuiTablePagination-selectLabel': {
    color: 'primary.dark !important',
    fontSize: '1.6rem',
  },
  '& .css-16c50h-MuiInputBase-root-MuiTablePagination-select': {
    color: 'primary.dark !important',
    fontSize: '1.6rem',
  },
  '& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
    color: 'primary.dark !important',
    fontSize: '2rem !important',
  },
  '& .css-levciy-MuiTablePagination-displayedRows': {
    color: 'primary.dark !important',
    fontSize: '1.6rem !important',
  },
  '& .css-zylse7-MuiButtonBase-root-MuiIconButton-root ': {
    color: 'primary.dark !important',
    fontSize: '1.6rem !important',
  },
  '& .css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root': {
    color: 'primary.dark !important',
    fontSize: '1.6rem !important',
  },
};

function AppointmentsDataGrid({ appointments }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const columns = [
    { field: 'id', headerName: `${t('doctor.id')}`, width: 60 },
    { field: 'date', headerName: `${t('doctor.date')}`, width: 140 },
    { field: 'time', headerName: `${t('doctor.time')}`, width: 140 },
    { field: 'booked', headerName: `${t('doctor.booked')}`, width: 160 },
    {
      field: 'actions',
      headerName: `${t('doctor.showDetails')}`,
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => navigate(`${params.row?.idDB}`)}>
            <ReadMoreIcon sx={{ color: 'third.dark', fontSize: '3rem' }} />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = appointments?.map((appointment, index) => ({
    id: index + 1,
    idDB: appointment?._id,
    date: new Date(appointment?.appointmentDate).toLocaleDateString(),
    time: new Date(appointment?.appointmentTime).toLocaleTimeString(),
    booked: new Date(appointment?.createdAt).toLocaleDateString(),
  }));
  return (
    <Grid item xs={12} sm={12} md={12} mt='2em'>
      <Box sx={{ width: '100%', mt: '1em' }}>
        <DataGrid
          sx={styleDataGrid}
          rows={rows || []}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Grid>
  );
}

export default AppointmentsDataGrid;
