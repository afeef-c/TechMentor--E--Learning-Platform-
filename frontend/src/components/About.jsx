import React from 'react'

function About() {
  return (

    <div className="container-fluid py-5">
        <div className="container py-5">
            <div className="row align-items-center">
            <div className="col-lg-5">
                <img className="img-fluid rounded mb-4 mb-lg-0" src="src/assets/img/about.jpg" alt />
            </div>
            <div className="col-lg-7">
                <div className="text-left mb-4">
                <h5 className="text-primary text-uppercase mb-3" style={{letterSpacing: 5}}>About Us</h5>
                <h1>Innovative Way To Learn</h1>
                </div>
                <p>At TechMentor, we believe in the transformative power of education and technology. Our mission is to provide high-quality, accessible learning opportunities to everyone, regardless of their background or location. Whether you are looking to develop new skills, advance your career, or explore new interests, TechMentor is here to guide you on your educational journey.</p>
                <a href className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">Learn More</a>
            </div>
            </div>
        </div>
        </div>


  )
}

export default About
