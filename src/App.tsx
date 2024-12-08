import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieGrid from "./components/MovieGrid";
import MovieDetails from "./components/MovieDetails";
import { Box } from "@mui/material";

const App: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Router>
        <Routes>
          <Route path="/" element={<MovieGrid />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
