import React from "react";
import greyyarn from '../assets/tara-evans-IcvR0jFbsz0-unsplash (1).jpg';

function Home() {
return (
    <>
    <div className="d-flex card">
        <img src={greyyarn} alt="Grey yarn" />
        <div className="card-img-overlay">
            <h2 className="position-absolute top-50 translate-middle-y end-0 m-5 text-end">Match your yarn stash to your patterns.<br></br>Create without waste.</h2>
        </div>
    </div>
    </>
    )
}

export default Home