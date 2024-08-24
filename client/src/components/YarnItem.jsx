import React from "react";

function YarnItem({item, deleteYarn}) {

return (
    <>
    <div className="col-sm-4">
        <div className="card bg-dark text-white mb-2">
            <div className="card-body">
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
                        <tbody className="table table-dark">
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
        </div>
    </>
    )
}

export default YarnItem