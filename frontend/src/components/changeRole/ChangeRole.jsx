import { t } from 'i18next';
import React, { useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getUsers, upgradeUser } from '../../redux/features/auth/authSlice';
import {
  EMAIL_RESET,
  sendAutomatedEmail,
} from '../../redux/features/email/emailSlice';

function ChangeRole({ id, email }) {
  const [userRole, setUserRole] = useState('');
  const dispatch = useDispatch();

  const changeRole = async (e) => {
    e.preventDefault();

    if (!userRole) {
      toast.error(`${t('changeRole.changeRoleText')}`);
      return;
    }

    const userData = {
      role: userRole,
      id: id,
    };

    const emailData = {
      subject: `${t('changeRole.accountRoleChanged')}`,
      send_to: email,
      reply_to: 'noreply@admin',
      template: 'changeRole',
      url: '/login',
    };

    await dispatch(upgradeUser(userData));
    await dispatch(sendAutomatedEmail(emailData));
    await dispatch(getUsers());
    await dispatch(EMAIL_RESET());
  };

  return (
    <div className='sort'>
      <form
        className='--flex-start'
        onSubmit={(e) => changeRole(e, id, userRole)}
      >
        <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
          <option value=''>{t('changeRole.select')}</option>
          <option value='admin'>{t('changeRole.admin')}</option>
          <option value='subscriber'>{t('changeRole.doctor')}</option>
          <option value='subscriber'>{t('changeRole.patient')}</option>
          <option value='suspended'>{t('changeRole.suspended')}</option>
        </select>
        <button className='--btn --btn-primary'>
          <BsCheckLg size={14} color='white' />
        </button>
      </form>
    </div>
  );
}

export default ChangeRole;
