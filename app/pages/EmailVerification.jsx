import React from 'react';

import Footer from '../common/Footer';

const NotFound = () => (
  <div className="notfound fluid-content">
    <section className="bg-primary text-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 text-center">
            <i className="fa fa-smile-o fa-5" style={{ fontSize: '80px' }} />
            <h1>Welcome to the Capital Planning Explorer</h1>
            <p>Thanks for signing up!</p>
            <p>
              {`We need one more thing from you! A confirmation email has been sent to the address you signed up with.
                Check your email and follow the verification link inside. You can still use most of the site without
                confirming your email address, but some features and data may not be visible.`}
            </p>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default NotFound;
