import { BrowserRouter as Router, Routes, Route } from "react-router";

import "./fade.css";
import FrontEndApp from "./FrontEndApp";
import AdminApp from "./AdminApp";
import { useEffect } from "react";
import ScrollToTop from "./components/common/ScrollToTop";

const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/*" element={<FrontEndApp />} />
                <Route path="/admin/*" element={<AdminApp />} />
            </Routes>
        </Router>
    );
};

export default App;
