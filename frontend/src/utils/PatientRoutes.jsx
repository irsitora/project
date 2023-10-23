import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../redux/features/auth/authServices';

const PatientRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let user;
    let patient;
    const isPatient = async () => {
      try {
        user = await authService.getUser();
        patient = user.role == 'patient';
      } catch (error) {
        console.log(error.message);
      }

      if (!patient) {
        toast.error('You are not logged in as Patient!');
        navigate('/login');
        return;
      }
    };
    isPatient();
  }, [navigate]);

  // ! =============================

  return <Outlet />;
};

export default PatientRoutes;
