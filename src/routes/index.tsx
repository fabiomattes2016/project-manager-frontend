import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import NotFound from '../pages/NotFound';
import SignInClient from '../pages/SignInClient';
import SignInDev from '../pages/SignInDev';
import SignUpDev from '../pages/SignUpDev';
import Start from '../pages/Start';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Start} />
      <Route path="/dev/signin" exact component={SignInDev} />
      <Route path="/dev/signup" exact component={SignUpDev} />
      <Route path="/client/signin" exact component={SignInClient} />
      {/* <Route path="/404" exact component={NotFound} /> */}
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
