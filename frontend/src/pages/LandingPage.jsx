import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DisplayBanner from "../components/DisplayBanner";
import AboutFeatures from "../components/AboutFeatures";
import NonPrivateRoute from "../route/NonPrivateRoute";

function LandingPage() {
    return (
        <div>
            <NonPrivateRoute />
            <Navbar />
            <DisplayBanner />
            <AboutFeatures />
            <Footer />
        </div>
    );
}

export default LandingPage;
