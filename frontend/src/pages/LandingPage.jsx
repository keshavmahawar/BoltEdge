import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DisplayBanner from "../components/DisplayBanner";
import AboutFeatures from "../components/AboutFeatures";

function LandingPage() {
    return (
        <div>
            <Navbar />
            <DisplayBanner />
            <AboutFeatures />
            <Footer />
        </div>
    );
}

export default LandingPage;
