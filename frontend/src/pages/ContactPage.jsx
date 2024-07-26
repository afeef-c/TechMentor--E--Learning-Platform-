import React from 'react'
import Footer from '../components/Footer'

function ContactPage() {
  return (

    <>
        <div className="container-fluid page-header" style={{marginBottom: 90}}>
            <div className="container">
                <div className="d-flex flex-column justify-content-center" style={{minHeight: 300}}>
                <h3 className="display-4 text-white text-uppercase">Contact</h3>
                <div className="d-inline-flex text-white">
                    <p className="m-0 text-uppercase"><a className="text-white" href>Home</a></p>
                    <i className="fa fa-angle-double-right pt-1 px-3" />
                    <p className="m-0 text-uppercase">Contact</p>
                </div>
                </div>
            </div>
        </div>

        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="text-center mb-5">
                <h5 className="text-primary text-uppercase mb-3" style={{letterSpacing: 5}}>Contact</h5>
                <h1>Contact For Any Query</h1>
                </div>
                <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="contact-form bg-secondary rounded p-5">
                    <div id="success" />
                    <form name="sentMessage" id="contactForm" noValidate="novalidate">
                        <div className="control-group">
                        <input type="text" className="form-control border-0 p-4" id="name" placeholder="Your Name" required="required" data-validation-required-message="Please enter your name" />
                        <p className="help-block text-danger" />
                        </div>
                        <div className="control-group">
                        <input type="email" className="form-control border-0 p-4" id="email" placeholder="Your Email" required="required" data-validation-required-message="Please enter your email" />
                        <p className="help-block text-danger" />
                        </div>
                        <div className="control-group">
                        <input type="text" className="form-control border-0 p-4" id="subject" placeholder="Subject" required="required" data-validation-required-message="Please enter a subject" />
                        <p className="help-block text-danger" />
                        </div>
                        <div className="control-group">
                        <textarea className="form-control border-0 py-3 px-4" rows={5} id="message" placeholder="Message" required="required" data-validation-required-message="Please enter your message" defaultValue={""} />
                        <p className="help-block text-danger" />
                        </div>
                        <div className="text-center">
                        <button className="btn btn-primary py-3 px-5" type="submit" id="sendMessageButton">Send Message</button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>

    </>
    
  )
}

export default ContactPage
