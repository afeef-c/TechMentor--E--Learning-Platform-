import React from 'react'

function EditProfile() {
  return (
    <div>
      <div className="card">
        <form method="post" className="needs-validation" noValidate>
            <div className="card-header">
            <h4>Edit Profile</h4>
            </div>
            <div className="card-body">
            <div className="row">                               
                <div className="form-group col-md-6 col-12">
                <label>First Name</label>
                <input type="text" className="form-control" defaultValue="Ujang" required />
                <div className="invalid-feedback">
                    Please fill in the first name
                </div>
                </div>
                <div className="form-group col-md-6 col-12">
                <label>Last Name</label>
                <input type="text" className="form-control" defaultValue="Maman" required />
                <div className="invalid-feedback">
                    Please fill in the last name
                </div>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-md-7 col-12">
                <label>Email</label>
                <input type="email" className="form-control" defaultValue="ujang@maman.com" required />
                <div className="invalid-feedback">
                    Please fill in the email
                </div>
                </div>
                <div className="form-group col-md-5 col-12">
                <label>Phone</label>
                <input type="tel" className="form-control" defaultValue />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-12">
                <label>Bio</label>
                <textarea className="form-control summernote-simple" defaultValue={"Ujang maman is a superhero name in <b>Indonesia</b>, especially in my family. He is not a fictional character but an original hero in my family, a hero for his children and for his wife. So, I use the name as a user in this template. Not a tribute, I'm just bored with <b>'John Doe'</b>."} />
                </div>
            </div>
            <div className="row">
                <div className="form-group mb-0 col-12">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" name="remember" className="custom-control-input" id="newsletter" />
                    <label className="custom-control-label" htmlFor="newsletter">Subscribe to newsletter</label>
                    <div className="text-muted form-text">
                    You will get new information about products, offers and promotions
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="card-footer text-right">
            <button className="btn btn-primary">Save Changes</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default EditProfile
