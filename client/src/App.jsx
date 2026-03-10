import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ReadLetter from "@/pages/ReadLetter";
import WriteLetter from "@/pages/WriteLetter";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/read-letter" element={<ReadLetter />} />
        <Route path="/write-letter" element={<WriteLetter />} />
      </Routes>
    </Router>
  );
};

export default App;
