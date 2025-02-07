import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApolloProvider from "./utils/ApolloProvider";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ApolloProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchBooks />} />
          <Route path="/saved" element={<SavedBooks />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;