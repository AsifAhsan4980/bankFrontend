import { Routes, Route, Link } from "react-router-dom";
import {Box} from "@mui/material";
import React from "react";

import Home from "./pages/Home"

const App = () => {
  return (
      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Box>
  );
}

export default App;
