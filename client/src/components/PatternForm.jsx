import React from "react";
import { useState } from 'react';
import titleknit from '../assets/giulia-bertelli-hdX0nbZ3HSI-unsplash.jpg';
import { useNavigate } from 'react-router-dom';

function PatternForm({handleAddPattern}) {
    // State for user input
    const [pattern, setPattern] = useState({
    name: "",
    brand: "",
    project_type: "",
    yardage_needed: "",
    yarn_weight: "",
    notes: "",
    difficulty: ""
    });

    // Hook for navigation
    const navigate = useNavigate();

    // Grab input from the form
    const handleInput = e => {
    const value = e.target.value;
    const name = e.target.name;

    // Set the input
    setPattern(state => ({...state, [name]: value}));
    };

    // Submit the form and get the input
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call handleAddPattern from Pattern.jsx
        handleAddPattern(pattern);
        // Go back to patterns view after form submission
        navigate('/patterns')
    };

    return (
        <>
        {/* Title section */}
        <div className="title-image-container">
            <img src={titleknit} className="title-image" alt="knit in background" />
        </div>

        <div className="container">
            <h3 className="container-fluid text-center pt-3 pb-2">Add Patterns to Your Library</h3>

            <form onSubmit={handleSubmit}>
                <div className="form-floating ms-3">
                    {/* Name */}
                    <input type="text" className="form-control mb-2" id="floatingInput1" placeholder="text"
                    // Value and name for 2-way binding
                    value={pattern.name}
                    name="name"
                    // Event listener
                    onChange={e => handleInput(e)}/>
                    <label htmlFor="floatingInput1">Name</label>
                </div>

                <div className="form-floating ms-3">
                    {/* Brand */}
                    <input type="text" className="form-control mb-2" id="floatingInput2" placeholder="text"
                    // Value and name for 2-way binding
                    value={pattern.brand}
                    name="brand"
                    // Event listener
                    onChange={e => handleInput(e)}/>
                    <label htmlFor="floatingInput2">Brand</label>
                </div>

                <div className="form-floating ms-3">
                    {/* Project Type */}
                    <input type="text" className="form-control mb-2" id="floatingInput3" placeholder="text"
                    // Value and name for 2-way binding
                    value={pattern.project_type}
                    name="project_type"
                    // Event listener
                    onChange={e => handleInput(e)}/>
                    <label htmlFor="floatingInput3">Project Type</label>
                </div>

                <div className="form-floating ms-3">
                    {/* Yardage Needed */}
                    <input type="text" className="form-control mb-2" id="floatingInput4" placeholder="text"
                    // Value and name for 2-way binding
                    value={pattern.yardage_needed}
                    name="yardage_needed"
                    // Event listener
                    onChange={e => handleInput(e)}/>
                    <label htmlFor="floatingInput4">Yardage Needed</label>
                </div>

                <div className="form-floating ms-3">
                    <select 
                        className="form-select mb-2" 
                        id="floatingSelect5"
                        // Value and name for 2-way binding
                    value={pattern.yarn_weight}
                    name="yarn_weight"
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
                <label htmlFor="floatingSelect5">Weight</label>
            </div>

            <div className="form-floating ms-3">
                {/* Difficulty */}
                <input type="text" className="form-control mb-2" id="floatingInput6" placeholder="text"
                // Value and name for 2-way binding
                value={pattern.difficulty}
                name="difficulty"
                // Event listener
                onChange={e => handleInput(e)}/>
                <label htmlFor="floatingInput6">Difficulty</label>
            </div>

            <div className="form-floating ms-3">
                {/* Notes */}
                <input type="text" className="form-control mb-2" id="floatingInput7" placeholder="text"
                // Value and name for 2-way binding
                value={pattern.notes}
                name="notes"
                // Event listener
                onChange={e => handleInput(e)}/>
                <label htmlFor="floatingInput7">Notes</label>
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

export default PatternForm