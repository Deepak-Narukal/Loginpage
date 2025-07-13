import Dashboard from "./Dashboard";
import Login from "./Login";
import Registration from "./Registration";
// import { RenderChild } from "./AuthVerify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/dashboard"
            element={
              // <RenderChild>
              <Dashboard />
              // </RenderChild>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
