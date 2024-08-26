import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MatchPatterns() {
const [matchingPatterns, setMatchingPatterns] = useState(null);
const {id} = useParams();

const matchPatterns = async () => {
    try {
        const results = await fetch (`/api/yarn/${id}`);
        const patterns = await results.json();
        console.log(patterns);

    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    matchPatterns();
}, [id]);

return (
    <>
    <h4 className="container-fluid text-center pt-3 pb-2">With YARN NAME, Create...</h4>
    <div className="row container">
    <div className="col-sm-4">
        <div className="card bg-secondary text-white mb-2">
            <div className="card-body pb-0">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title yarn-card-title">{item.name}</h5>
                </div>
                    <table className="table table-secondary table-borderless table-sm">
                        <tbody>
                            <tr>
                                <td className="card-text category">Brand</td>
                                <td className="card-text">{item.brand}</td>
                            </tr>

                            <tr>
                                <td className="card-text category">Project Type</td>
                                <td className="card-text">{item.project_type}</td>
                            </tr>

                            <tr>
                                <td className="card-text category">Yardage Needed</td>
                                <td className="card-text">{item.yardage_needed}</td>
                            </tr>

                            <tr>
                                <td className="card-text category">Weight</td>
                                <td className="card-text">{item.weight}</td>
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
        </div>
    </div>
    </>
);
}

export default MatchPatterns