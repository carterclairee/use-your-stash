import React from "react";
import { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import titleyarn from '../assets/anastasia-sogomonian-f1vPjvlE9Xs-unsplash.jpg';
import YarnForm from './YarnForm.jsx';

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

    const handleAddYarn = async (yarn) => {
        try {
            const results = await fetch("/api/yarn", {
                method: "POST",
                headers: {
                  // specifying that we're communicating in JSON
                  "Content-Type": "application/json"
                },
                // Send the newYarn to the server as a string
                body: JSON.stringify(yarn)
            });
            // Get the response from the call
            const updatedYarn = await results.json();
            // Set the allYarn state to the new list
            setAllYarn(updatedYarn);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteYarn = async (id) => {
        try {
            const results = await fetch(`/api/yarn/${id}`, {
                method: "DELETE"
            });
            const updatedYarn = await results.json();
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
                <YarnForm addYarn={(yarn) => handleAddYarn(yarn)}/>
            </div>

            {/* Main Content */}
            <div className="col-sm-9">
                {/* Yarn Display */}
                <h3 className="container-fluid text-center pt-3 pb-2">Your Yarn Stash</h3>
                {/* Display all yarn*/}
                <div className="row container">
                    {allYarn.map(item => (
                        <Link to={`/yarn/${item.id}`} key={item.id} className="yarn-display col-sm-4">
                            <div className="card bg-dark text-white mb-3">
                                <div className="card-body pb-0">
                                    <div className="d-flex justify-content-between">
                                        <h5 className="card-title yarn-card-title">{item.name}</h5>
                                        <div>
                                            <i 
                                            // Call delete function
                                            onClick={() => deleteYarn(item.id)}
                                            role="button" 
                                            className="fa-regular fa-trash-can"></i>
                                        </div>
                                    </div>
                                        <table className="table table-dark table-borderless table-sm">
                                            <tbody>
                                                <tr>
                                                    <td className="card-text category">Brand</td>
                                                    <td className="card-text">{item.brand}</td>
                                                </tr>
                                                <tr>
                                                    <td className="card-text category">Weight</td>
                                                    <td className="card-text">{item.weight}</td>
                                                </tr>
                                                <tr>
                                                    <td className="card-text category">Yardage</td>
                                                    <td className="card-text">{item.yardage}</td>
                                                </tr>
                                                <tr>
                                                    <td className="card-text category">Color</td>
                                                    <td className="card-text">{item.color}</td>
                                                </tr>
                                                <tr>
                                                    <td className="card-text category">Fiber</td>
                                                    <td className="card-text">{item.fiber_type}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <Outlet />
            </div>
        </div>

        </>
        )
}

export default Yarn