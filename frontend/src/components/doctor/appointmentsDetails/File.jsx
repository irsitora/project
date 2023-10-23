import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  addFile,
  deleteFile,
  getFiles,
} from '../../../redux/features/booking/bookingSlice';

const styleText = {
  fontSize: '1.6rem',
  fontWeight: '700',
  color: 'primary.dark',
};
const styleIcon = {
  download: {
    fontSize: '2rem',
    color: 'green',
  },
  delete: {
    fontSize: '2rem',
    color: 'red',
  },
};

function File({ patient, doctor }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const { files, isLoading } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);

  // ! ----------------------------------------

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        appointmentId: id,
        patientId: patient?._id,
        doctorId: doctor?._id,
        name,
        file,
      };
      await dispatch(addFile(userData));
      await dispatch(getFiles({ appointmentId: id }));
      setName('');
      setFile(null);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  const deleteItem = async (id) => {
    try {
      await dispatch(deleteFile(id));
      await dispatch(getFiles({ appointmentId: id }));
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  // ! Download appointments----------------------------
  // ! Download appointments----------------------------
  const downloadFile = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/doctor/download/${id}`,
        { responseType: 'blob' }
      );
      const blob = new Blob([res.data], { type: res.data.type });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'file.pdf';
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  // ! --------------------------------------------
  useEffect(() => {
    if (user) {
      const userData = {
        appointmentId: id,
      };
      dispatch(getFiles(userData));
    }
  }, [dispatch, user]);

  // ! --------------------------------------------
  return (
    <Grid item xs={12} sm={12} md={12}>
      <Typography sx={styleText}>Results or Analysis</Typography>
      <form onSubmit={addItem}>
        <TextField
          name='name'
          label='File Title'
          type='text'
          variant='outlined'
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ margin: '4px', width: '20%' }}
        />
        <TextField
          name='file'
          type='file'
          onChange={(e) => setFile(e.target.files[0])}
          style={{ margin: '4px', width: '20%' }}
        />
        <Button variant='contained' onClick={addItem} sx={{ mt: '1.3em' }}>
          Add
        </Button>
      </form>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> {t('patient.no')}</TableCell>
            <TableCell>{t('patient.Title')}</TableCell>
            <TableCell>{t('patient.download')}</TableCell>
            <TableCell>{t('patient.delete')}</TableCell>
          </TableRow>
        </TableHead>
        {!isLoading && files.length == 0 ? (
          <>
            <TableCell colSpan={4}>
              <Typography
                sx={{
                  ...styleText,
                  color: 'primary.light',
                  textAlign: 'center',
                }}
              >
                {t('patient.emptyFile')}
              </Typography>
            </TableCell>
          </>
        ) : (
          <TableBody>
            {files?.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <IconButton onClick={() => downloadFile(item?._id)}>
                    <DownloadIcon sx={styleIcon.download} />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteItem(item?._id)}>
                    <DeleteForeverIcon sx={styleIcon.delete} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </Grid>
  );
}

export default File;
