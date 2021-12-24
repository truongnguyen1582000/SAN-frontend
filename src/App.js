import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Auth from './features/Auth';
import { Container, Grid } from '@mui/material';
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Post from './features/Post';
import Home from './components/Home';

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
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/post" component={Post} />
                  {/* <Route path="/event" exact component={Event} /> */}
                  <Route path="/login" component={Auth} />
                </Switch>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
