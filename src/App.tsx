import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.scss';

const MovieList = lazy(() => import("./pages/MovieList"));

const App: React.FC = () => {
  return (
    <div className="App">
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<MovieList />} />
            </Routes>
          </Suspense>
        </Router>
    </div>
  );
}

export default App;
