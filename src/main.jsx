import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createTheme, ThemeProvider } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-datepicker"
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
import {AdapterDayjs}  from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import store from "./store/store";
import { Provider } from "react-redux";
import './index.css'
const theme = createTheme({
  palette: {
    mode: "light",
    white: {
      main: "#fbfbfb",
    },
    primary: {
      main: "#0367FC",
    },
    secondary: {
      main: "#4D4D4D",
    },
  },
  typography: {
    fontFamily: "'Source Sans Pro', sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
