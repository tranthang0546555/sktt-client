import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './app/store';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from 'notistack';
import Slide from '@material-ui/core/Slide';

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>

      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        TransitionComponent={Slide}
        maxSnack={3}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
