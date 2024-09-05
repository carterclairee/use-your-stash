import React from "react";
import { useState } from 'react';
import titleyarn from '../assets/anastasia-sogomonian-f1vPjvlE9Xs-unsplash.jpg';
// Using useNavigate, a hook that can take you to a different path in the app, to navigate between Yarn.js and YarnForm.js.
import { useNavigate } from 'react-router-dom';

function YarnForm({handleAddYarn}) {
    // State for user input
    const [yarn, setYarn] = useState({
    name: "",
    brand: "",
    weight: "",
    yardage: "",
    color: "",
    fiber_type: ""
    });

    const navigate = useNavigate();

    // Grab input from the form
    const handleInput = e => {
    const value = e.target.value;
    const name = e.target.name;

    // Set the input
    setYarn(state => ({...state, [name]: value}));
    };

    // Submit the form and get the input
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call handleAddYarn from Yarn.js
        handleAddYarn(yarn); 
        // Go back to yarn view after form submission
        navigate('/yarn')
    };

    return (
        <>
        {/* Title section*/}
        <div className="title-image-container">
            <img src={titleyarn} className="title-image" alt="yarn in background" />
        </div>

        <div className="container">

        <h3 className="container-fluid text-center pt-3 pb-2">Add Yarn to Your Stash</h3>

        <form onSubmit={handleSubmit}>
            <div className="form-floating ms-3">
                {/* Name */}
                <input type="text" className="form-control mb-2" id="floatingInput1" placeholder="text"
                // Value and name for 2-way binding
                value={yarn.name}
                name="name"
                // Event listener
                onChange={e => handleInput(e)}/>
                <label htmlFor="floatingInput1">Name</label>
            </div>

            <div className="form-floating ms-3">
                {/* Brand */}
                <input type="text" className="form-control mb-2" id="floatingInput2" placeholder="text"
                // Value and name for 2-way binding
                value={yarn.brand}
                name="brand"
                // Event listener
                onChange={e => handleInput(e)}/>
                <label htmlFor="floatingInput2">Brand</label>
            </div>

            <div className="form-floating ms-3">
                <select 
                    className="form-select mb-2" 
                    id="floatingSelect3"
                    // Value and name for 2-way binding
                    value={yarn.weight}
                    name="weight"
                    // Event listener
                    onChange={e => handleInput(e)}
                >
                {/* Weight options */}
                <option value="">Select weight</option>
                <option value="lace">lace</option>
                <option value="fingering">fingering</option>
                <option value="sport">sport</option>
                <option value="dk">dk</option>
                <option value="worsted">worsted</option>
                <option value="bulky">bulky</option>
                <option value="super-bulky">super bulky</option>
                </select>
                <label htmlFor="floatingSelect3">Weight</label>
            </div>

            <div className="form-floating ms-3">
                {/* Yardage */}
                <input type="text" className="form-control mb-2" id="floatingInput4" placeholder="text"
                // Value and name for 2-way binding
                value={yarn.yardage}
                name="yardage"
                // Event listener
                onChange={e => handleInput(e)}/>
                <label htmlFor="floatingInput4">Yardage</label>
            </div>

            <div className="form-floating ms-3">
                {/* Color */}
                <input type="text" className="form-control mb-2" id="floatingInput5" placeholder="text"
                // Value and name for 2-way binding
                value={yarn.color}
                name="color"
                // Event listener
                onChange={e => handleInput(e)}/>
                <label htmlFor="floatingInput5">Color</label>
            </div>

            <div className="form-floating ms-3">
                {/* Fiber type */}
                <input type="text" className="form-control mb-2" id="floatingInput6" placeholder="text"
                // Value and name for 2-way binding
                value={yarn.fiber_type}
                name="fiber_type"
                // Event listener
                onChange={e => handleInput(e)}/>
                <label htmlFor="floatingInput6">Fiber type</label>
            </div>

            {/* Button */}
            <div className="text-center">
              <button className="btn btn-dark mt-2">Submit</button>
            </div>
        
        </form>

        </div>
        </>
    )
} 

export default YarnForm