import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';

function Dashboard(props) {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} component={DashboardPage}></Route>
    </Switch>
  );
}

export default Dashboard;
