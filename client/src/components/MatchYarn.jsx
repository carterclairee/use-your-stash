import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MatchYarn() {
const [matchingYarn, setMatchingYarn] = useState({
    pattern_id: "",
    pattern_name: "",
    pattern_brand: "",
    yarn_weight: "",
    project_type: "",
    yardage_needed: "",
    notes: "",
    matching_yarn: [
        {
            yarn_id: "",
            yarn_name: "",
            yarn_brand: "",
            yardage: "",
            color: "",
            fiber_type: ""
        }
    ] 
});

const [noMatch, setNoMatch] = useState("")

const {id} = useParams();

const matchYarn = async () => {
    try {
        const results = await fetch (`/api/patterns/${id}`);
        const yarn = await results.json();

        if (yarn.matching_yarn) {
            setMatchingYarn(yarn);
            // Clear the noMatch message
            setNoMatch("");
        } else {
            // Clear previous patterns so old data isn't shown
            setMatchingYarn({ ...matchingYarn, matching_yarn: [] });
            setNoMatch(yarn);
        }
    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    matchYarn();
}, [id]);

return (
    <>
    {/* Display pattern name only if yarn matches */}
    {!noMatch && (
    <h3 className="container-fluid text-center pt-3 pb-2">Yarn for {matchingYarn.pattern_name}</h3>
    )}
        {/* Display message if no yarn matches */}
        {noMatch ? (
            <div>
                <h4 className="container-fluid text-center pt-3 pb-2">Yarn for {noMatch.name}</h4>
                <p className="text-center">{noMatch.message}</p>
            </div>

        // Display matching yarns if they exist
        ) : (
        matchingYarn.matching_yarn.map((yarn) => (
            <div key={yarn.yarn_id}>
                    <div className="card bg-dark text-white mb-2">
                        <div className="card-body pb-0">
                            <div className="d-flex justify-content-between">
                                <h5 className="card-title yarn-card-title">{yarn.yarn_name}</h5>
                            </div>
                                <table className="table table-dark text-white table-borderless table-sm">
                                    <tbody>
                                        <tr>
                                            <td className="card-text category">Brand</td>
                                            <td className="card-text">{yarn.yarn_brand}</td>
                                        </tr>

                                        <tr>
                                            <td className="card-text category">Yardage</td>
                                            <td className="card-text">{yarn.yardage}</td>
                                        </tr>

                                        <tr>
                                            <td className="card-text category">Color</td>
                                            <td className="card-text">{yarn.color}</td>
                                        </tr>

                                        <tr>
                                            <td className="card-text category">Fiber</td>
                                            <td className="card-text">{yarn.fiber_type}</td>
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

export default MatchYarn