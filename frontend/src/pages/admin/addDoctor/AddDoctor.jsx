import { Box, Stack } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import PersonalInformation from '../../../components/doctorAddForm/personalInfo/PersonalInformation';
import SpecialistAndExperience from '../../../components/doctorAddForm/specialistInfo/SpecialistAndExperience';
// import '../../dateRangePicker/DatePicker.css';
import dayjs from 'dayjs';
import { t } from 'i18next';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddNewDoctor from '../../../assets/admin/logo2.png';
import { CustomButtonOne } from '../../../components/customUtils/customButtons/CustomButtonOne';
import DatePickerForm from '../../../components/doctorAddForm/timings/DatePickerForm';
import TimePickerForm from '../../../components/doctorAddForm/timings/TimePickerForm';
import FormWrapper from '../../../components/formWrapper/FormWrapper';
import useRedirectLoggedOutUser from '../../../customHooks/useRedirectLoggedOutUser';
import { addDoctor } from '../../../redux/features/booking/bookingSlice';
const initialValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
  password2: '',
  hospitalName: '',
  years: '',
  fee: '',
  specialist: '',
  startDate: dayjs(new Date()),
  endDate: dayjs(new Date()),
  startTime: dayjs(new Date()),
  endTime: dayjs(new Date()),
};

function AddDoctor() {
  useRedirectLoggedOutUser('/login');
  const [formData, setFormData] = useState(initialValues);
  const [experiences, setExperiences] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    password,
    password2,
    hospitalName,
    years,
    startDate,
    endDate,
    name,
    email,
    phone,
    fee,
    startTime,
    endTime,
    specialist,
  } = formData;

  // ! ------ Yup Validation ------------------
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(`${t('authAlert.required')}`),
    email: Yup.string()
      .email(`${t('authAlert.validEmail')}`)
      .required(`${t('authAlert.required')}`),
    phone: Yup.string().required(`${t('authAlert.required')}`),
    password: Yup.string()
      .min(6, `${t('authAlert.password')}`)
      .required(`${t('authAlert.required')}`),
    password2: Yup.string()
      .oneOf([Yup.ref('password'), null], `${t('authAlert.passwordsMatch')}`)
      .required(`${t('authAlert.required')}`),
    specialist: Yup.string().required(`${t('authAlert.required')}`),
    fee: Yup.number().required(`${t('authAlert.required')}`),
    hospitalName: Yup.string().required(`${t('authAlert.required')}`),
    years: Yup.number().required(`${t('authAlert.required')}`),
    startDate: Yup.date()
      .required(`${t('authAlert.required')}`)
      .nullable(),
    endDate: Yup.date()
      .required(`${t('authAlert.required')}`)
      .nullable(),
    startTime: Yup.string().required(`${t('authAlert.required')}`),
    endTime: Yup.string().required(`${t('authAlert.required')}`),
  });
  // ! Add Experince -----------------
  function addExperience(hospitalName, years) {
    setExperiences((prevExperiences) => [
      ...prevExperiences,
      { hospitalName, years },
    ]);
  }
  // ! -----------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    setFormData({ ...formData, [name]: value });
  };

  // ! handleChange For DatePicker ------
  const handleFieldChange = (fieldName) => (value) => {
    // ! this just for formik validation
    formik.setFieldValue(fieldName, value);
    // ! bug fixed after 6 hours I forgot to setFormData
    setFormData({ ...formData, [fieldName]: value });
  };

  // ! handleChange for TimerPicker
  const handleTimeChange = (fieldName) => (time) => {
    const hour = moment(time.$d).format('HH');
    const min = moment(time.$d).format('mm');
    const formatedTime = `${hour}:${min}`;
    // console.log(`${hour}:${min}`);
    formik.setFieldValue(fieldName, time);
    // ! bug fixed after 6 hours I forgot to setFormData
    setFormData({ ...formData, [fieldName]: time });
  };

  // ! ----- Add Doctor function -----
  const AddDoctor = async () => {
    const userData = {
      name,
      password,
      startDate,
      endDate,
      email,
      phone,
      fee,
      startTime,
      endTime,
      specialist,
      experiences,
    };

    await dispatch(addDoctor(userData));
    navigate('/admin/doctors');
  };

  // ! -----useFormik -----------------
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      AddDoctor(values);
      console.log(values);
    },
  });
  return (
    <FormWrapper
      title={`${t('admin.addNewDoctor')}`}
      img={AddNewDoctor}
      altImg={'Add new Doctor'}
    >
      <Box
        sx={{
          width: '100%',
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <hr color='#ccb7c0' />
          <PersonalInformation
            values={formik.values}
            handleChange={handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched}
            errors={formik.errors}
            password={password}
            password2={password2}
          />
          <hr color='#ccb7c0' />
          <SpecialistAndExperience
            values={formik.values}
            handleChange={handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched}
            errors={formik.errors}
            hospitalName={hospitalName}
            years={years}
            experiences={experiences}
            setExperiences={setExperiences}
            addExperience={addExperience}
          />
          <hr color='#ccb7c0' />
          <DatePickerForm
            values={formik.values}
            handleChange={handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched}
            errors={formik.errors}
            handleFieldChange={handleFieldChange}
          />
          <TimePickerForm
            values={formik.values}
            handleChange={handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched}
            errors={formik.errors}
            handleTimeChange={handleTimeChange}
          />
          <Stack
            mt='1em'
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <CustomButtonOne label={`${t('admin.addDoctorBtn')}`} />
          </Stack>
        </form>
      </Box>
    </FormWrapper>
  );
}

export default AddDoctor;
