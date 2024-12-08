import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieGrid from "./components/MovieGrid";
import MovieDetails from "./components/MovieDetails";
import { Box,  CssBaseline, ThemeProvider } from "@mui/material";

// Create a custom theme for better style handling
import { createTheme } from '@mui/material/styles';

// Create a custom theme for better style handling
const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#f50057',
    },
  },
  // spacing: 8, // Default value (1 spacing unit = 8px)
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f5f5f5', // Set the global background color
          margin: 0, // Remove default body margin
          padding: 16,
        },
      },
    },
  },
});




const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
       <CssBaseline />
       <Box
          sx={{
            padding: theme.spacing(3), // Add consistent padding using theme.spacing()
          }}
        >
      <Router>
        <Routes>
          <Route path="/" element={<MovieGrid />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
      </Box>
    </ThemeProvider>
  );
};

export default App;
