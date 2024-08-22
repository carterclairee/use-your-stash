import React from "react";
import { useEffect, useState } from 'react';
import './Yarn.css';
import titleyarn from '../assets/anastasia-sogomonian-f1vPjvlE9Xs-unsplash.jpg';
import YarnForm from './YarnForm.jsx';

function Yarn() {
    const [allYarn, setAllYarn] = useState([]);

    const handleAddYarn = (newYarn) => {
        setAllYarn((state) => [...state, newYarn]);
        console.log(allYarn);
    }


    return (
        <>
        {/* Title section...I think I don't really need this because it's clear it's a yarn page already, so I may revise to just have image*/}
        <div className="card border-0">
            <div className="title-image-container">
                <img src={titleyarn} className="title-card card-img title-image" alt="yarn in background" />
            </div>
            <div className="card-img-overlay">
                {/* <h2 className="card-title text-center title-text">Yarn</h2> */}
            </div>
        </div>

        {/* Grid for overall layout */}
        <div className="row">
            {/* Form */}
            <div className="col-sm-3">
                <h3 className="text-center pt-2 pb-2">Add Yarn</h3>
                <YarnForm addYarn={(newYarn) => handleAddYarn(newYarn)}/>
            </div>

            {/* Main Content */}
            <div className="col-sm-9">
                <h3 className="container-fluid text-center pt-2">Your Yarn Stash</h3>
                
            </div>
        </div>

        </>
        )
}

export default Yarn