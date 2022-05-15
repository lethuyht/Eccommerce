import React from 'react';

import { Route, Switch } from 'react-router-dom';
import './App.css';
import Product from './features/Product/product.jsx';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Product} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
z