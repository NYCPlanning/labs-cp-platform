// NotFound.jsx - The Not Found page, shown when there is no route match in react-router

import React from 'react';

import Nav from '../common/Nav';
import Footer from '../common/Footer';

const NotFound = props => (
  <div>
    <Nav title="Capital Planning Platform" auth={props.auth} />
    <div className="col-md-12 main-content" >
      <section className="bg-primary text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 text-center">
              <i className="fa fa-frown-o fa-5" style={{ fontSize: '80px' }} />
              <h1>Not Found</h1>
              <p>Sorry, you&apos;ve requested a page that doesn&apos;t exist. <a href="/">Take me home!</a></p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  </div>
);

NotFound.propTypes = {
  auth: React.PropTypes.object.isRequired,
};

module.exports = NotFound;
