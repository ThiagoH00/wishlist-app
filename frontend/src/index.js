import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 1. Criar um tema minimalista
const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f4f6f8' // Um cinza bem claro para o fundo da página
    },
    primary: {
      main: '#0052cc', // Um azul mais moderno
    },
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h4: {
      fontWeight: 700,
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Bordas mais arredondadas
        }
      }
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
