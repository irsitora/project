import { t } from 'i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import AllDoctors from '../../../assets/admin/medical-team.png';
import DoctorsSearchBar from '../../../components/admin/doctorSearchbar/DoctorsSearchbar';
import DoctorList from '../../../components/admin/doctorsList/DoctorList';
import FormWrapper from '../../../components/formWrapper/FormWrapper';
import { Spinner } from '../../../components/loader/Loader';

function Doctors() {
  return (
    <>
      <FormWrapper
        img={AllDoctors}
        altImg='medical team'
        title={`${t('admin.doctorList')}`}
      >
        <DoctorsSearchBar />
        <DoctorList />
      </FormWrapper>
    </>
  );
}

export default Doctors;
