import React from 'react'
import {Link} from 'react-router'




var Nav = React.createClass({
  render() {


    var auth = this.props.auth
    var profile = auth.getProfile()

    var userMenu = auth.loggedIn() ? (
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user" aria-hidden="true"></i> {profile.email}<span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><a onClick={auth.logout}>Log Out</a></li>
          </ul>
        </li>
      ) :
      (
        <li><Link to="/login"><i className="fa fa-user" aria-hidden="true"></i> Log In</Link></li>
      )


    return(
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="navbar-header"><button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button><a className="navbar-brand" href="#">{this.props.title}</a></div>
        <div id="navbar" className="navbar-collapse collapse">
           <ul className="nav navbar-nav navbar-right ">
              <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Home</Link></li>
              {this.props.children}
              <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSdQgNxsIJ4H9YkK2Dcj7Hc_vAnJkW1QK4BDwOPILyLaei70BQ/viewform"><i className="fa fa-comment" aria-hidden="true"></i> Feedback</a></li>
              
              {userMenu}



              
           </ul>
        </div>
         
      </nav>
    )
  }
})

module.exports=Nav

