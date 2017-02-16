import React from 'react';

import Footer from '../common/Footer';

const NotFound = () => (
  <div className="notfound fluid-content">
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
);

module.exports = NotFound;
