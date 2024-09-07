import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MatchPatterns({ allYarn, selectedYarnId }) {
// Check if there is a yarn seleted, and, if not, show message
if (!selectedYarnId) {
    return <p className="text-center">Yarn has been deleted. Please select another yarn to see matching patterns.</p>
}

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
    // Check if the yarn still exists (in case of deletion). If the yarn doesn't exist, clear the state
    if (!selectedYarnId || selectedYarnId !== parseInt(id)) {
        setMatchingPatterns({...matchingPatterns, matching_patterns: [] });
        setNoMatch("Yarn has been deleted. Please select another yarn to see matching patterns.");
        return;
    }

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
    // Future feature: figure out how to remove console error when yarn is deleted after being selected
    } catch (error) {
        console.log(error);
    }
}

useEffect(() => {
    matchPatterns();
}, [id, allYarn]); 
// need to rerun when allYarn changes (as in when a yarn is deleted)

return (
    <>
    {/* Display yarn name only if pattern(s) match */}
    {!noMatch && (
    <h3 className="container-fluid text-center pt-3 pb-2">Patterns for {matchingPatterns.yarn_name}</h3>
    )}
        {/* Display message if no patterns match */}
        {noMatch ? (
            <div>
                <h3 className="container-fluid text-center pt-3 pb-2">Patterns for {noMatch.name}</h3>
                <p className="text-center">{noMatch.message}</p>
            </div>
            
        // Display patterns if they exist
        ) : (
        matchingPatterns.matching_patterns.map((pattern) => (
            <div key={pattern.pattern_id}>
                    <div className="card bg-light mb-3">
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
    </>
);
}

export default MatchPatterns