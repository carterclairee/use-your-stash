import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MatchPatterns() {
const [matchingPatterns, setMatchingPatterns] = useState({
    yarn_id: "",
    yarn_name: "",
    yarn_brand: "",
    weight: "",
    yardage: "",
    color: "",
    fiber_type: "",
    matching_patterns: [
        {
            pattern_id: "",
            pattern_name: "",
            pattern_brand: "",
            project_type: "",
            yardage_needed: "",
            notes: "",
            difficulty: ""
        }
    ] 
});

const [noMatch, setNoMatch] = useState("")

const {id} = useParams();

const matchPatterns = async () => {
    try {
        const results = await fetch (`/api/yarn/${id}`);
        const patterns = await results.json();

        if (patterns.matching_patterns) {
            setMatchingPatterns(patterns);
            // Clear the noMatch message
            setNoMatch("");
        } else {
            // Clear previous patterns so old data isn't shown
            setMatchingPatterns({ ...matchingPatterns, matching_patterns: [] });
            setNoMatch(patterns);
        }

    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    matchPatterns();
}, [id]);

return (
    <>
    {/* Display yarn name only if pattern(s) match */}
    {!noMatch && (
    <h4 className="container-fluid text-center pt-3 pb-2">Patterns for {matchingPatterns.yarn_name}</h4>
    )}

    <div className="row container">
        {/* Display message if no patterns match */}
        {noMatch ? (
            <div>
                <h4 className="container-fluid text-center pt-3 pb-2">Patterns for {noMatch.name}</h4>
                <p className="text-center">{noMatch.message}</p>
            </div>
            
        // Display patterns if they exist
        ) : (
        matchingPatterns.matching_patterns.map((pattern) => (
            <div key={pattern.pattern_id} className="col-sm-4">
                    <div className="card bg-light mb-2">
                        <div className="card-body pb-0">
                            <div className="d-flex justify-content-between">
                                <h5 className="card-title pattern-card-title">{pattern.pattern_name}</h5>
                            </div>
                                <table className="table table-light table-borderless table-sm">
                                    <tbody>
                                        <tr>
                                            <td className="card-text category">Brand</td>
                                            <td className="card-text">{pattern.pattern_brand}</td>
                                        </tr>

                                        <tr>
                                            <td className="card-text category">Project</td>
                                            <td className="card-text">{pattern.project_type}</td>
                                        </tr>

                                        <tr>
                                            <td className="card-text category">Yardage</td>
                                            <td className="card-text">{pattern.yardage_needed}</td>
                                        </tr>

                                        <tr>
                                            <td className="card-text category">Difficulty</td>
                                            <td className="card-text">{pattern.difficulty}</td>
                                        </tr>
                                        <tr>
                                            <td className="card-text category">Notes</td>
                                            <td className="card-text">{pattern.notes}</td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </div>
        ))
        )}
    </div>
    </>
);
}

export default MatchPatterns