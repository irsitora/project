import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users`;

// ! Send Automated Email
const sendAutomatedEmail = async (emailData) => {
  const response = await axios.post(API_URL + '/sendAutomatedEmail', emailData);
  return response.data.message;
};

const emailServices = {
  sendAutomatedEmail,
};

export default emailServices;
