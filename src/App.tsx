import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from "./layout/AppLayout";

import './App.scss';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./redux/store";

const MovieList = lazy(() => import("./pages/MovieList"));
// const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </Provider>
    </div>
  );
}

export default App;
