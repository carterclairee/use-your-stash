import React from "react";
import { useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import titleyarn from '../assets/anastasia-sogomonian-f1vPjvlE9Xs-unsplash.jpg';

function Yarn({ allYarn, setAllYarn }) {

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
        {/* Title section*/}
        <div className="title-image-container">
            <img src={titleyarn} className="title-image" alt="yarn in background" />
        </div>

        {/* Switch to YarnForm view */}
        <div className="ms-3 mt-3">
            <Link to="/add_yarn" className="form-link">Add Yarn</Link>
        </div>

        {/* Grid for overall layout */}
        <div className="row">
            {/* Main Content */}
            <div className="col-md-8 ms-2">
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
            </div>
            <div className="col-md-3">
                <Outlet /> 
            </div>
        </div>
        </>
    );
}

export default Yarn