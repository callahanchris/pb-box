import React from 'react';
import { Route } from 'react-router';
import App from '../components/App';

const routes = (
  <Route path='/' handler={App} />
);

module.exports = routes;
