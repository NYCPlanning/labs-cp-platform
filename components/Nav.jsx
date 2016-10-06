import React from 'react'
import {Link} from 'react-router'

var Nav = React.createClass({
  render() {
    return(
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="navbar-header"><button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button><a className="navbar-brand" href="#">{this.props.title}</a></div>
        <div id="navbar" className="navbar-collapse collapse">
           <ul className="nav navbar-nav navbar-right ">
              <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Home</Link></li>
              {this.props.children}
              <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSdQgNxsIJ4H9YkK2Dcj7Hc_vAnJkW1QK4BDwOPILyLaei70BQ/viewform"><i className="fa fa-comment" aria-hidden="true"></i> Feedback</a></li>
              <li><a href="https://github.com/nycplanning/facdb-explore"><i className="fa fa-github" aria-hidden="true"></i> Fork Me on GitHub</a></li>
           </ul>
        </div>
         
      </nav>
    )
  }
})

module.exports=Nav

