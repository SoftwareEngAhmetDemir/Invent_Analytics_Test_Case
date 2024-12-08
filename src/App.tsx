import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieGrid from "./components";
import MovieDetails from "./components/MovieDetails";
import { Box,  CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";

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
