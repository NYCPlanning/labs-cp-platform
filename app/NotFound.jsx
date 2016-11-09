//NotFound.jsx - The Not Found page, shown when there is no route match in react-router
//Props:
//  auth - auth object passed down from App.jsx

import React from 'react'

import Nav from './common/Nav.jsx'
import Footer from './common/Footer.jsx'

var NotFound = React.createClass({
  render() {
    return(
      <div>
        <Nav title='Capital Planning Platform' auth={this.props.auth}/>
        <div className="col-md-12 main-content" >
          <section className='bg-primary text-center'>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-lg-offset-2 text-center">
                  <i className="fa fa-frown-o fa-5" style={{fontSize: '80px'}}></i>
                  <h1>Not Found</h1>
                  <p>Sorry, you've requested a page that doesn't exist.  <a href="/">Take me home!</a></p>
                </div>
              </div>
            </div>
          </section>
          <Footer/>
        </div>
        
      </div>
    )
  }
})

module.exports=NotFound