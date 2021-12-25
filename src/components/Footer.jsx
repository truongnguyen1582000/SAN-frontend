import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          SAN
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  return (
    <Box sx={{ bgcolor: '#3F51B5', p: 6, mt: 4 }} component="footer">
      <Typography variant="h5" align="center" gutterBottom>
        Student's Academic Network
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Q&A - Event - Training Point
      </Typography>
      <Copyright />
    </Box>
  );
}

export default Footer;
