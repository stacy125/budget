import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BudgetsProvider } from './contexts/BudgetsContext'
//wraps our application with BudgetsProvider

ReactDOM.render(
  <React.StrictMode>
    <BudgetsProvider>  
      <App />
    </BudgetsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


