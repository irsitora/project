import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../redux/features/auth/authServices';

const DoctorRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let user;
    let doctor;
    const isDoctor = async () => {
      try {
        user = await authService.getUser();
        doctor = user.role == 'doctor';
      } catch (error) {
        console.log(error.message);
      }

      if (!doctor) {
        toast.error('You are not logged in as Doctor!');
        navigate('/login');
        return;
      }
    };
    isDoctor();
  }, [navigate]);

  // ! =============================

  return <Outlet />;
};

export default DoctorRoutes;
