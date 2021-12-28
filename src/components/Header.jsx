import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Menu, MenuItem, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/Auth/authSlice';
import { FormGroup, Input } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import queryString from 'query-string';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const user = useSelector((state) => state.user.current);
  const isLoggedIn = !!user._id;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useHistory();
  const [searchKey, setSearchKey] = useState('');

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      console.log(searchKey);
      setSearchKey('');
      navigate.push({
        pathname: '/search',
        search: queryString.stringify({
          name: searchKey,
        }),
      });
    }
  };

  const handleChange = (e) => {
    setSearchKey(e.target.value);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    enqueueSnackbar('Bye !!!', {
      variant: 'info',
    });
    navigate.push('/login');
    setAnchorEl(null);
  };

  useEffect(() => {}, []);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ backgroundColor: '#C10000' }}>
        <Toolbar>
          <Link
            to="/"
            style={{
              marginRight: '20px',
              textDecoration: 'none',
              color: '#fff',
            }}
          >
            <Typography variant="h6">Student's Academic Network</Typography>
          </Link>
          <FormGroup className="mt-3">
            <Input
              id="exampleSearch"
              name="search"
              placeholder="Search..."
              type="search"
              value={searchKey}
              onChange={handleChange}
              onKeyDown={handleSubmit}
            />
          </FormGroup>
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {user.role === 'admin' && (
              <NavLink to="/dashboard" className="nav-link">
                Dashboard
              </NavLink>
            )}
            <NavLink to="/post" className="nav-link">
              Post
            </NavLink>
            <NavLink to="/event" className="nav-link right-separate">
              Event
            </NavLink>
            {!isLoggedIn && (
              <Link
                to="/Login"
                color="inherit"
                style={{ color: '#fff', textDecoration: 'none' }}
              >
                Login
              </Link>
            )}
            {isLoggedIn && (
              <div>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                >
                  {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
                  {/* <MenuItem onClick={handleMenuClose}>Select Topic</MenuItem> */}
                  <MenuItem onClick={handleLogout}>Log out</MenuItem>
                </Menu>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
