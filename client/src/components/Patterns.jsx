import React from "react";
import { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import titleknit from '../assets/giulia-bertelli-hdX0nbZ3HSI-unsplash.jpg';
import PatternForm from './PatternForm.jsx';

function Patterns() {

    const [allPatterns, setAllPatterns] = useState([]);

    useEffect(() => {
        getPatterns();
    }, []);

    // Get yarn from the database
    const getPatterns = async () => {
        try {
            const results = await fetch('api/patterns');
            const json = await results.json();
            setAllPatterns(json);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddPattern = async (pattern) => {
        try {
            const results = await fetch("/api/patterns", {
                method: "POST",
                headers: {
                  // specifying that we're communicating in JSON
                  "Content-Type": "application/json"
                },
                // Send the newYarn to the server as a string
                body: JSON.stringify(pattern)
            });
            // Get the response from the call
            const updatedPatterns = await results.json();
            // Set the allPatterns state to the new list
            setAllPatterns(updatedPatterns);
        } catch (error) {
            console.log(error);
        }
    };

    const deletePattern = async (id) => {
        try {
            const results = await fetch(`/api/patterns/${id}`, {
                method: "DELETE"
            });
            const updatedPatterns = await results.json();
            setAllPatterns(updatedPatterns);
        } catch (error) {
            console.log(error);
        }
    };

return (
    <>
        {/* Title image*/}
        <div className="title-image-container">
            <img src={titleknit} className="title-image" alt="knit in background" />
        </div>

        {/* Grid for overall layout */}
        <div className="row">
            {/* Form */}
            <div className="col-sm-3">
                <h3 className="text-center pt-3 pb-2">Add a Pattern</h3>
                <PatternForm addPattern={(pattern) => handleAddPattern(pattern)}/>
            </div>

            {/* Main Content */}
            <div className="col-sm-9">
                {/* Pattern Display */}
                <h3 className="container-fluid text-center pt-3 pb-2">Your Pattern Library</h3>
                {/* Display all patterns*/}
                <div className="row container">
                    {allPatterns.map(item => (
                        <Link to={`/patterns/${item.id}`} key={item.id} className="yarn-display col-sm-4">
                            <div className="card bg-light mb-3">
                                <div className="card-body pb-0">
                                    <div className="d-flex justify-content-between">
                                        <h5 className="card-title pattern-card-title">{item.name}</h5>
                                        <div>
                                            <i 
                                            // Call delete function
                                            onClick={() => deletePattern(item.id)}
                                            role="button" 
                                            className="fa-regular fa-trash-can"></i>
                                        </div>
                                    </div>
                                        <table className="table table-light table-borderless table-sm">
                                            <tbody>
                                                <tr>
                                                    <td className="card-text category">Brand</td>
                                                    <td className="card-text">{item.brand}</td>
                                                </tr>
                                                <tr>
                                                    <td className="card-text category">Project</td>
                                                    <td className="card-text">{item.project_type}</td>
                                                </tr>

                                                <tr>
                                                    <td className="card-text category">Weight</td>
                                                    <td className="card-text">{item.yarn_weight}</td>
                                                </tr>

                                                <tr>
                                                    <td className="card-text category">Yardage</td>
                                                    <td className="card-text">{item.yardage_needed}</td>
                                                </tr>
                                                <tr>
                                                    <td className="card-text category">Difficulty</td>
                                                    <td className="card-text">{item.difficulty}</td>
                                                </tr>
                                                <tr>
                                                    <td className="card-text category">Notes</td>
                                                    <td className="card-text">{item.notes}</td>
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

export default Patterns