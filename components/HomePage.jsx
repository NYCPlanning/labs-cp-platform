import React from 'react'
import Nav from './Nav.jsx'
import {Link} from 'react-router'

var HomePage = React.createClass({
  componentDidMount: function() {
    document.title = "NYC Capital Planning Platform";
  },

  render() {
    return(
      <div>
         <Nav title='NYC Capital Planning Platform'/>

        <div className="row">
            <div className="col-md-4 portfolio-item">
                <a href="#">
                    <img className="img-responsive" src="http://placehold.it/700x400" alt=""/>
                </a>
                <h3>
                    <a href="#">Capital Projects</a>
                </h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
            </div>
            <div className="col-md-4 portfolio-item">
                <Link to='/facilities'>
                    <img className="img-responsive" src="http://placehold.it/700x400" alt=""/>
                </Link>
                <h3>
                    <Link to='/facilities'>Facilities</Link>
                </h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
            </div>
            <div className="col-md-4 portfolio-item">
                <Link to='/pipeline'>
                    <img className="img-responsive" src="http://placehold.it/700x400" alt=""/>
                </Link>
                <h3>
                    <Link to='/pipeline'>Housing Pipeline</Link>
                </h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
            </div>
        </div>


        
        
      </div>
    );
  }

});

module.exports=HomePage;