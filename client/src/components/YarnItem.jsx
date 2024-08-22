import React from "react";
import skein from "../assets/icons8-yarn-80.png";

function YarnItem({item}) {

return (
    <>
    <div className="col-sm-4">
        <div className="card text-white bg-dark">
            <div className="card-body">
                <div className="d-flex">
                    <img src={skein} alt="yarn icon" className="skein-icon"/>
                    <h4 className="card-title">{item.name}</h4>
                </div>
                    <div className="row">
                        <div className="col-sm-5">
                            <p className="card-text">
                            Brand:<br></br>
                            Weight:<br></br>
                            Yardage:<br></br>
                            Color:<br></br>
                            Fiber type:<br></br>
                            </p>
                        </div>
                        <div className="col-sm-7">
                            <p className="card-text">
                            {item.brand}<br></br>
                            {item.weight}<br></br>
                            {item.yardage}<br></br>
                            {item.color}<br></br>
                            {item.fiber_type}<br></br>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default YarnItem