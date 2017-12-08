import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MailchimpForm = ({ currentUser }) => {
  const isCityUser = currentUser.profile && currentUser.profile.permissions.includes('sitewide_access');

  if (isCityUser) {
    return (
      <div>
        <link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css" />
        <div
          id="mc_embed_signup"
          style={{
            background: '#fff',
            clear: 'left',
            font: '14px Helvetica,Arial,sans-serif',
          }}
        >
          <form action="https://nyc.us16.list-manage.com/subscribe/post?u=4591fdf9dafb7e43b02686ae2&amp;id=0217a7201c" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
            <div id="mc_embed_signup_scroll">
              <label htmlFor="mce-EMAIL">Subscribe to our mailing list</label>
              <input type="email" value="" name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required />
              <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true"><input type="text" name="b_4591fdf9dafb7e43b02686ae2_0217a7201c" tabIndex="-1" value="" /></div>
              <div className="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" /></div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

MailchimpForm.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

const mapStateToProps = ({ currentUser }) => ({ currentUser });
export default connect(mapStateToProps)(MailchimpForm);
