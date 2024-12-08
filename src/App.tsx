import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieGrid from "./components/MovieGrid";
import MovieDetails from "./components/MovieDetails";
import { Box, createTheme, ThemeProvider } from "@mui/material";

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
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<MovieGrid />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
