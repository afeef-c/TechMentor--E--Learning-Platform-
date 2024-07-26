import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CourseCategories from '../components/CourseCategories'
import CourseList from '../components/CourseList'
import About from '../components/About'

function HomePage() {
  return (
    <>
      
      <div className="container-fluid p-0 pb-5 mb-5">
        <div id="header-carousel" className="carousel slide carousel-fade" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#header-carousel" data-slide-to={0} className="active" />
            <li data-target="#header-carousel" data-slide-to={1} />
            <li data-target="#header-carousel" data-slide-to={2} />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active" style={{minHeight: 300}}>
              <img className="position-relative w-100" src="src/assets/img/carousel-1.jpg" style={{minHeight: 300, objectFit: 'cover'}} />
              <div className="carousel-caption d-flex align-items-center justify-content-center">
                <div className="p-5" style={{width: '100%', maxWidth: 900}}>
                  <h5 className="text-white text-uppercase mb-md-3">Best Online Courses</h5>
                  <h1 className="display-3 text-white mb-md-4">Best Education From Your Home</h1>
                  <a href className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">Learn More</a>
                </div>
              </div>
            </div>
            <div className="carousel-item" style={{minHeight: 300}}>
              <img className="position-relative w-100" src="src/assets/img/carousel-2.jpg" style={{minHeight: 300, objectFit: 'cover'}} />
              <div className="carousel-caption d-flex align-items-center justify-content-center">
                <div className="p-5" style={{width: '100%', maxWidth: 900}}>
                  <h5 className="text-white text-uppercase mb-md-3">Best Online Courses</h5>
                  <h1 className="display-3 text-white mb-md-4">Best Online Learning Platform</h1>
                  <a href className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">Learn More</a>
                </div>
              </div>
            </div>
            <div className="carousel-item" style={{minHeight: 300}}>
              <img className="position-relative w-100" src="src/assets/img/carousel-3.jpg" style={{minHeight: 300, objectFit: 'cover'}} />
              <div className="carousel-caption d-flex align-items-center justify-content-center">
                <div className="p-5" style={{width: '100%', maxWidth: 900}}>
                  <h5 className="text-white text-uppercase mb-md-3">Best Online Courses</h5>
                  <h1 className="display-3 text-white mb-md-4">New Way To Learn From Home</h1>
                  <a href className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <About/>
      <div className="text-center mb-5">
          <h5 className="text-primary text-uppercase mb-3" style={{letterSpacing: 5}}>Categories</h5>
          <h1>Explore Top Categories</h1>
      </div>
    
    
      <CourseCategories/>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h5 className="text-primary text-uppercase mb-3" style={{letterSpacing: 5}}>Courses</h5>
          <h1>Our Popular Courses</h1>
        </div>
      </div>  
      <CourseList/>

      
      
      

    </>
  )
}

export default HomePage
