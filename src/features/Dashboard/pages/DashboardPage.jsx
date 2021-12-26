import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import CreateTopicForm from '../components/CreateTopicForm';
import Typography from '@mui/material/Typography';
import CreateEventForm from '../components/CreateEventForm';

function DashboardPage(props) {
  const user = useSelector((state) => state.user.current);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useHistory();
  const [seletedCpn, setSeletedCpn] = useState('User');

  useEffect(() => {
    if (user.role !== 'admin') {
      enqueueSnackbar('You not have permission', { variant: 'warning' });
      navigate.push('/');
    }
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        boxShadow: '0 0 1px 1px #C7B198',
        borderRadius: '8px',
      }}
    >
      <div
        className="dashboard-left"
        style={{
          borderRight: '1px solid #C7B198',
          width: '25%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '8px',
        }}
      >
        <h6
          className={seletedCpn === 'User' ? 'selected' : ''}
          style={{
            color: '#406882',
            textDecoration: 'none',
            marginBottom: '16px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          onClick={() => setSeletedCpn('User')}
        >
          User management
        </h6>
        <h6
          className={seletedCpn === 'Event' ? 'selected' : ''}
          style={{
            color: '#406882',
            textDecoration: 'none',
            marginBottom: '16px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          onClick={() => setSeletedCpn('Event')}
        >
          Event management
        </h6>
        <h6
          className={seletedCpn === 'Topic' ? 'selected' : ''}
          style={{
            color: '#406882',
            textDecoration: 'none',
            marginBottom: '16px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          onClick={() => setSeletedCpn('Topic')}
        >
          Topic management
        </h6>
        <NavLink
          className={seletedCpn === 'Training Point' ? 'selected' : ''}
          to="/dashboard/training-point"
          style={{
            color: '#406882',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          onClick={() => setSeletedCpn('Training Point')}
        >
          Training point management
        </NavLink>
      </div>
      <div className="dashboard-right" style={{ flex: '1', padding: '8px' }}>
        <Typography
          variant="h4"
          color="#406882"
          style={{ borderBottom: '1px solid #C7B198' }}
        >
          {seletedCpn}
        </Typography>

        {seletedCpn === 'Event' && <CreateEventForm />}
      </div>
    </div>
  );
}

export default DashboardPage;
