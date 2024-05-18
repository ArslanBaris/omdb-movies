import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from "./layout/AppLayout";

import './App.scss';

const MovieList = lazy(() => import("./pages/MovieList"));
// const MovieDetail = lazy(() => import("./pages/MovieDetail"));

const App: React.FC = () => {
  return (
    <div className="App">
      <AppLayout>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<MovieList />} />
              {/* <Route path="/movie/:movie_id" element={<MovieDetail />} /> */}
            </Routes>
          </Suspense>
        </Router>
      </AppLayout>
    </div>
  );
}

export default App;
