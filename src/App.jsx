import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import React ,{ useEffect, useRef } from "react";

import ShopPage from "./Page/Front/ShopPage";
import LoginPage from "./Page/Front/LoginPage";
import RegisterPage from "./Page/Front/RegisterPage";
import OrderPage from "./Page/Front/OrderPage";
import CheckOutPage from "./Page/Front/CheckOutPage";
import ProductPage from "./Page/Front/ProductPage";

import "./fade.css";

function AnimatedRoutes() {
    const location = useLocation();

    // 為每次渲染的畫面設置單獨的 nodeRef
    const nodeRefs = useRef({});

    if (!nodeRefs.current[location.key]) {
    nodeRefs.current[location.key] = React.createRef();
    }

    return (
    // <TransitionGroup component={null}>
    //     <CSSTransition
    //         key={location.key}
    //         nodeRef={nodeRefs.current[location.key]} // 使用唯一的 ref
    //         timeout={500}
    //         classNames="fade"
    //     >
    //     </CSSTransition>
    // </TransitionGroup>
            <div ref={nodeRefs.current[location.key]}>
            <Routes location={location}>
                <Route path="/" element={<ShopPage />} />
                <Route path="/account/login" element={<LoginPage />} />
                <Route path="/account/register" element={<RegisterPage />} />
                <Route path="/account/orders" element={<OrderPage />} />
                <Route path="/checkout" element={<CheckOutPage />} />
                <Route path="/product/:productId" element={<ProductPage />} />
            </Routes>
            </div>
    );
}

function App() {

    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    );
}

export default App;
