import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PostDetail from './components/PostDetail';
import PostListPage from './pages/PostListPage';

function Post(props) {
  const match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}`} component={PostListPage} exact />
        <Route path={`${match.path}/:id`} component={PostDetail} />
      </Switch>
    </div>
  );
}

export default Post;
