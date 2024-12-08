import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieGrid from './components/MovieGrid';
import MovieDetails from './components/MovieDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieGrid />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
