import React from "react";
import { useEffect, useState } from 'react';
import './Yarn.css';
import titleyarn from '../assets/anastasia-sogomonian-f1vPjvlE9Xs-unsplash.jpg';

function Yarn() {
return (
    <>
    {/* Title section */}
    <div className="card border-0">
        <div className="title-image-container">
            <img src={titleyarn} className="title-card card-img title-image" alt="yarn in background" />
        </div>
        <div className="card-img-overlay">
            <h2 className="card-title text-center title-text">Yarn</h2>
        </div>
    </div>

    {/* Grid for overall layout */}
    <div className="row">
        {/* Form */}
        <div className="col-sm-4">
        Form
        </div>

        {/* Main Content */}
        <div className="col-sm-8">
        Main Content
        </div>
    </div>

    </>
    )
}

export default Yarn