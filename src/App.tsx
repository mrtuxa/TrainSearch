import React from 'react';
import logo from './logo.svg';
import './index.css';
import {Button, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import useDarkMode from "./DarkMode";
import SearchStations from "./SearchStations";

function App() {
    const [darkMode, toggleDarkMode] = useDarkMode(); // Use the custom hook

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{padding: '20px'}}>
          <Button variant="contained" color="primary" onClick={() => toggleDarkMode()}>
            Toggle Dark Mode
          </Button>
          <SearchStations />
        </div>
      </ThemeProvider>
  );
}

export default App;
