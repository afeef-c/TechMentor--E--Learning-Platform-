import React from 'react'
import About from '../components/About'
import Footer from '../components/Footer'

function AboutPage() {
  return (
    <>
      <div className="container-fluid page-header" style={{marginBottom: 90}}>
        <div className="container">
          <div className="d-flex flex-column justify-content-center" style={{minHeight: 300}}>
            <h3 className="display-4 text-white text-uppercase">About</h3>
            <div className="d-inline-flex text-white">
              <p className="m-0 text-uppercase"><a className="text-white" href>Home</a></p>
              <i className="fa fa-angle-double-right pt-1 px-3" />
              <p className="m-0 text-uppercase">About</p>
            </div>
          </div>
        </div>
      </div>
      <About/>
      <Footer/>

    </>
  )
}

export default AboutPage
