import React from "react";
import { useEffect, useState } from 'react';
import titleyarn from '../assets/anastasia-sogomonian-f1vPjvlE9Xs-unsplash.jpg';
import YarnForm from './YarnForm.jsx';
import YarnItem from './YarnItem.jsx';

function Yarn() {
    const [allYarn, setAllYarn] = useState([]);

    useEffect(() => {
        getYarn();
    }, []);

    // Get yarn from the database
    const getYarn = async () => {
        try {
            const results = await fetch('api/yarn');
            const json = await results.json();
            setAllYarn(json);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddYarn = async (newYarn) => {
        try {
            const results = await fetch("/api/yarn", {
                method: "POST",
                headers: {
                  // specifying that we're communicating in JSON
                  "Content-Type": "application/json"
                },
                // Send the newYarn to the server as a string
                body: JSON.stringify(newYarn)
            });
            // Get the response from the call
            const updatedYarn = await results.json();
            // Set the allYarn state to the new list
            setAllYarn(updatedYarn);
        } catch (error) {
            console.log(error);
        }
    };

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
                <h3 className="text-center pt-3 pb-2">Add Yarn</h3>
                <YarnForm addYarn={(newYarn) => handleAddYarn(newYarn)}/>
            </div>

            {/* Main Content */}
            <div className="col-sm-9">
                <h3 className="container-fluid text-center pt-3 pb-2">Your Yarn Stash</h3>
                {/* Display all yarn*/}
                <div className="row container">
                    {allYarn.map(item => (
                        <YarnItem key={item.id} item={item}/>
                    ))}
                </div>
            </div>
        </div>

        </>
        )
}

export default Yarn