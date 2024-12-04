import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../shared/header/Header";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import PostDetails from "../features/posts/PostDetails";
import Footer from "../shared/footer/Footer";
import "../shared/header/style.css";

function RouteHandle() {
  return (
    <>
      <Router>
        <Header />
        <div className="mainContainer">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/posts/:id" element={<PostDetails />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default RouteHandle;
