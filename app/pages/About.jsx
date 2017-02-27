import React from 'react';
import Paper from 'material-ui/Paper';

import Footer from '../common/Footer';

import './About.scss';

const paperStyle = {
  width: '100%',
  padding: '15px',
};

const About = () => (
  <div className="fluid-content">
    <div className="about-page container">
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>The Platform</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et ante nisi. Vivamus fermentum sem non rutrum auctor. Donec facilisis scelerisque augue at vestibulum. Donec efficitur faucibus ante, tristique tempus velit. Nam sollicitudin leo sit amet mauris consectetur, tincidunt porta eros scelerisque. Duis sit amet mauris dui. In nec lobortis arcu. Mauris sed mi hendrerit, viverra nulla vestibulum, commodo mi. Integer quis luctus sapien. Donec eget leo tristique, sagittis metus vel, consectetur neque.</p>

            <p>Pellentesque id lorem ut sapien condimentum finibus vitae vel dui. Integer gravida mi ante. Nullam lobortis luctus euismod. Aliquam et ultrices mi, quis finibus nulla. Nam sit amet pulvinar quam, vel rutrum mauris. Sed sit amet massa lorem. Nam quis mollis ligula. Ut sit amet mauris in lectus vehicula euismod. Nunc cursus est placerat nisl congue lacinia a sed tortor. Sed blandit nibh tortor, at rhoncus dui suscipit congue. Cras ipsum metus, rhoncus eu leo eu, tincidunt congue lacus.</p>
          </Paper>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>The Team</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et ante nisi. Vivamus fermentum sem non rutrum auctor. Donec facilisis scelerisque augue at vestibulum. Donec efficitur faucibus ante, tristique tempus velit. Nam sollicitudin leo sit amet mauris consectetur, tincidunt porta eros scelerisque. Duis sit amet mauris dui. In nec lobortis arcu. Mauris sed mi hendrerit, viverra nulla vestibulum, commodo mi. Integer quis luctus sapien. Donec eget leo tristique, sagittis metus vel, consectetur neque.</p>

            <p>Pellentesque id lorem ut sapien condimentum finibus vitae vel dui. Integer gravida mi ante. Nullam lobortis luctus euismod. Aliquam et ultrices mi, quis finibus nulla. Nam sit amet pulvinar quam, vel rutrum mauris. Sed sit amet massa lorem. Nam quis mollis ligula. Ut sit amet mauris in lectus vehicula euismod. Nunc cursus est placerat nisl congue lacinia a sed tortor. Sed blandit nibh tortor, at rhoncus dui suscipit congue. Cras ipsum metus, rhoncus eu leo eu, tincidunt congue lacus.</p>
          </Paper>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>Technology</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et ante nisi. Vivamus fermentum sem non rutrum auctor. Donec facilisis scelerisque augue at vestibulum. Donec efficitur faucibus ante, tristique tempus velit. Nam sollicitudin leo sit amet mauris consectetur, tincidunt porta eros scelerisque. Duis sit amet mauris dui. In nec lobortis arcu. Mauris sed mi hendrerit, viverra nulla vestibulum, commodo mi. Integer quis luctus sapien. Donec eget leo tristique, sagittis metus vel, consectetur neque.</p>

            <p>Pellentesque id lorem ut sapien condimentum finibus vitae vel dui. Integer gravida mi ante. Nullam lobortis luctus euismod. Aliquam et ultrices mi, quis finibus nulla. Nam sit amet pulvinar quam, vel rutrum mauris. Sed sit amet massa lorem. Nam quis mollis ligula. Ut sit amet mauris in lectus vehicula euismod. Nunc cursus est placerat nisl congue lacinia a sed tortor. Sed blandit nibh tortor, at rhoncus dui suscipit congue. Cras ipsum metus, rhoncus eu leo eu, tincidunt congue lacus.</p>
          </Paper>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Paper
            style={paperStyle}
            zDepth={1}
          >
            <h3>Thanks</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et ante nisi. Vivamus fermentum sem non rutrum auctor. Donec facilisis scelerisque augue at vestibulum. Donec efficitur faucibus ante, tristique tempus velit. Nam sollicitudin leo sit amet mauris consectetur, tincidunt porta eros scelerisque. Duis sit amet mauris dui. In nec lobortis arcu. Mauris sed mi hendrerit, viverra nulla vestibulum, commodo mi. Integer quis luctus sapien. Donec eget leo tristique, sagittis metus vel, consectetur neque.</p>

            <p>Pellentesque id lorem ut sapien condimentum finibus vitae vel dui. Integer gravida mi ante. Nullam lobortis luctus euismod. Aliquam et ultrices mi, quis finibus nulla. Nam sit amet pulvinar quam, vel rutrum mauris. Sed sit amet massa lorem. Nam quis mollis ligula. Ut sit amet mauris in lectus vehicula euismod. Nunc cursus est placerat nisl congue lacinia a sed tortor. Sed blandit nibh tortor, at rhoncus dui suscipit congue. Cras ipsum metus, rhoncus eu leo eu, tincidunt congue lacus.</p>
          </Paper>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

module.exports = About;
