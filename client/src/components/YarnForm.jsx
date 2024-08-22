import React from "react";
import { useState } from 'react';

function YarnForm({addYarn}) {
    // State for user input
    const [yarn, setYarn] = useState({
    name: "",
    brand: "",
    weight: "",
    yardage: "",
    color: "",
    fiber_type: ""
    });

    // Grab input from the form
    const handleInput = e => {
    const value = e.target.value;
    const name = e.target.name;

    // Set the input
    setYarn(state => ({...state, [name]: value}));
    };

    // Submit the form and get the input
    const handleSubmit = e => {
        e.preventDefault();

        // Pass the data back to the parent
        addYarn(yarn); 
    }

    return (
        <>
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
                {/* Weight...This will be a drop down in future for data control */}
                <input type="text" className="form-control mb-2" id="floatingInput3" placeholder="text"
                // Value and name for 2-way binding
                value={yarn.weight}
                name="weight"
                // Event listener
                onChange={e => handleInput(e)}/>
                <label htmlFor="floatingInput3">Weight</label>
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
        </>
    )
} 

export default YarnForm