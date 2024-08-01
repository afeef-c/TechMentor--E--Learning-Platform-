import React from 'react';

function Footer() {
  return (
    <>
      <div className="container-fluid bg-dark text-white py-5 px-sm-3 px-lg-5" style={{marginTop: 90}}>
        <div className="row pt-5">
          <div className="col-lg-7 col-md-12">
            <div className="row">
              <div className="col-md-6 mb-5">
                <h5 className="text-primary text-uppercase mb-4" style={{letterSpacing: 5}}>Get In Touch</h5>
                <p><i className="fa fa-map-marker-alt mr-2" />123 Street, Nilambur, Malappuram, Kerala, India</p>
                <p><i className="fa fa-phone-alt mr-2" />+012 345 67890</p>
                <p><i className="fa fa-envelope mr-2" />afeefc8281@gamil.com</p>
                <div className="d-flex justify-content-start mt-4">
                  <a className="btn btn-outline-light btn-square mr-2" href="#"><i className="fab fa-twitter" /></a>
                  <a className="btn btn-outline-light btn-square mr-2" href="#"><i className="fab fa-facebook-f" /></a>
                  <a className="btn btn-outline-light btn-square mr-2" href="#"><i className="fab fa-linkedin-in" /></a>
                  <a className="btn btn-outline-light btn-square" href="#"><i className="fab fa-instagram" /></a>
                </div>
              </div>
              <div className="col-md-6 mb-5">
                <h5 className="text-primary text-uppercase mb-4" style={{letterSpacing: 5}}>Our Courses</h5>
                <div className="d-flex flex-column justify-content-start">
                  <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2" />Web Design</a>
                  <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2" />Apps Design</a>
                  <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2" />Marketing</a>
                  <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2" />Research</a>
                  <a className="text-white" href="#"><i className="fa fa-angle-right mr-2" />SEO</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 mb-5">
            <h5 className="text-primary text-uppercase mb-4" style={{letterSpacing: 5}}>Newsletter</h5>
            <p>At TechMentor, we believe in the transformative power of education and technology. Our mission is to provide high-quality, accessible learning opportunities to everyone, regardless of their background or location. Whether you are looking to develop new skills, advance your career, or explore new interests, TechMentor is here to guide you on your educational journey.</p>
            <div className="w-100">
              <div className="input-group">
                <input type="text" className="form-control border-light" style={{padding: 30}} placeholder="Your Email Address" />
                <div className="input-group-append">
                  <button className="btn btn-primary px-4">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-dark text-white border-top py-4 px-sm-3 px-md-5" style={{borderColor: 'rgba(256, 256, 256, .1) !important'}}>
        <div className="row">
          <div className="col-lg-6 text-center text-md-left mb-3 mb-md-0">
            <p className="m-0 text-white">© <a href="#">TechMentor</a>. All Rights Reserved. Check the <a href="https://github.com/afeef-c/TechMentor--E--Learning-Platform-"> Codex</a>
            </p>
          </div>
          <div className="col-lg-6 text-center text-md-right">
            <ul className="nav d-inline-flex">
              <li className="nav-item">
                <a className="nav-link text-white py-0" href="#">Privacy</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white py-0" href="#">Terms</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white py-0" href="#">FAQs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white py-0" href="#">Help</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>

  );
}

export default Footer;
