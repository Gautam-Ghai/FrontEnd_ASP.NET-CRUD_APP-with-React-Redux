import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {store}  from './redux/store';
import { Provider } from "react-redux";
import Home from './components/Home';
function App() {
  return (
    <Provider store={store}>
     <Home />
    </Provider>
  );
}

export default App;
