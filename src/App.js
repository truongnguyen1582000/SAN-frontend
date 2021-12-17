import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PostListPage from './features/Post/pages/PostListPage';
import Auth from './features/Auth';
import { Container, Grid } from '@mui/material';
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '80px',
  },

  right: {
    flex: '1 1 0',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Header />
      <Container className={classes.root}>
        <Grid container spacing={1}>
          <Grid item className={classes.right}>
            <Paper elevation={1}>
              <Box padding={1}>
                <Routes>
                  <Route path="/" element={<PostListPage />} exact />
                  <Route path="/login" element={<Auth />} />
                  {/* <Route path="/cart" component={() => import('')} />
                  <Route component={() => import('')} /> */}
                </Routes>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
