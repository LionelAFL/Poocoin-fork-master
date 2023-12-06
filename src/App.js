import React from 'react';
import Layout from './Component/Layout';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Layout />
      </div>
    </Provider>
  )
}

export default App;
