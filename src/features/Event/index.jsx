import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import EventListPage from './pages/EventListPage';
import EventDetailPage from './pages/EventDetailPage';

function Event(props) {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} component={EventListPage} exact></Route>
      <Route path={`${match.path}/:id`} component={EventDetailPage}></Route>
    </Switch>
  );
}

export default Event;
