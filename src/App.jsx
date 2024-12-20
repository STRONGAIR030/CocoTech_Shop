import { BrowserRouter as Router, Routes, Route} from "react-router";

import "./fade.css";
import FrontEndApp from "./FrontEndApp";
import AdminApp from "./AdminApp";

const App = () => {
    return (
      <Router>
        <Routes>
          <Route path="/*" element={<FrontEndApp />} />
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Router>
    );
  };

export default App;
