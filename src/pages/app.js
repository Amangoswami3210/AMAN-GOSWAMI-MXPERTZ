import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoriesList from "./StoriesList";
import StoryDetail from "./StoryDetail";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoriesList />} />
        <Route path="/story/:id" element={<StoryDetail />} />
      </Routes>
    </Router>
  );
}