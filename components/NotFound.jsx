import React from 'react'
import Nav from './Nav.jsx'

var NotFound = React.createClass({
  render() {
    return(
      <div>
        <Nav title='NYC Capital Planning Platform' auth={this.props.auth}/>
        <section>
          <div className="col-md-12 main-content text-center" >
            <i className="fa fa-frown-o fa-5 dcp-orange" style={{fontSize: '80px'}}></i>
            <h1>Not Found</h1>
            <p>Sorry, you've requested a page that doesn't exist.  <a href="/">Take me home!</a></p>
          </div>
        </section>
      </div>
    )
  }
})

module.exports=NotFound