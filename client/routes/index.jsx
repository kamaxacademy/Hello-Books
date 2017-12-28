import React from 'react';  
import { Route, Switch, BrowserRouter} from 'react-router-dom';

import App from '../components/app';
import NotFoundPage from '../components/pages/NotFoundPage';
import HomePage from '../components/pages/HomePage';
import Dashboard from '../components/pages/Dashboard';  
import AdminHome from '../components/admin/index';
import AddNewBook from '../../client/components/admin/pages/AddANewBook';
import RentedBooksPage from  '../components/pages/RentedBooksPage';
import GoogleSignupPage from  '../components/pages/GoogleSignupPage';
import Profile from '../components/pages/Profile';
import Authentication from '../components/auth/Authentication';
import AdminAuthentication from '../components/auth/AdminAuthentication';
import NotificationPage from '../components/admin/pages/NotificationPage';

export const Main = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/dashboard" component={Authentication(Dashboard)} />
    <Route exact path="/admin" component={AdminAuthentication(AdminHome)} />
    <Route path="/add-book" component={AdminAuthentication(AddNewBook)} />
    <Route path="/google-signup" component={GoogleSignupPage} />
    <Route path="/notifications" component={AdminAuthentication(NotificationPage)} />
    <Route path="/rented-books" component={Authentication(RentedBooksPage)} />
    <Route path="/profile" component={Authentication(Profile)} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);

