import { t } from 'i18next';
import React, { useEffect } from 'react';
import { BiUserX } from 'react-icons/bi';
import { FiUserCheck, FiUserMinus } from 'react-icons/fi';
import { GrGroup } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import {
  CALC_SUSPENDED_USER,
  CALC_VERIFIED_USER,
} from '../../redux/features/auth/authSlice';
import InfoBox from '../infoBox/InfoBox';
import './UsersStats.scss';

const icon1 = <GrGroup size={36} color='red' />;
const icon2 = <FiUserCheck size={36} color='#fff' />;
const icon3 = <FiUserMinus size={36} color='#fff' />;
const icon4 = <BiUserX size={36} color='#fff' />;

function UserStats() {
  const dispatch = useDispatch();
  const { verifiedUsers, users, suspendedUsers } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(CALC_VERIFIED_USER());
    dispatch(CALC_SUSPENDED_USER());
  }, [dispatch, users]);

  return (
    <div className='user-summary'>
      <div className='info-summary'>
        <InfoBox
          icon={icon1}
          title={`${t('changeRole.totalUser')}`}
          count={users.length}
          bgColor='card1'
        />
        <InfoBox
          icon={icon2}
          title={`${t('changeRole.verifiedUsers')}`}
          count={verifiedUsers}
          bgColor='card2'
        />
        <InfoBox
          icon={icon3}
          title={`${t('changeRole.unverifiedUsers')}`}
          count={users.length - verifiedUsers}
          bgColor='card3'
        />
        <InfoBox
          icon={icon4}
          title={`${t('changeRole.suspendedUsers')}`}
          count={suspendedUsers}
          bgColor='card4'
        />
      </div>
    </div>
  );
}

export default UserStats;
