import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import {Link} from 'react-router'

const DetailPage = React.createClass({
  render() {
    return(
      <div className='full-screen display-content'>
        <div className='col-md-12'>
          <Link to={this.props.location.state? this.props.location.state.returnTo : this.props.defaultLink} className='pull-right'>
            <RaisedButton
              label={this.props.location.state ? "Back to Map" : this.props.defaultText}
              icon={this.props.location.state ? 
                <FontIcon className="fa fa-chevron-left" /> :
                <FontIcon className="fa fa-map" />
              }
            />
          </Link>
        </div>
        {this.props.children}
      </div>
    )
  }
})

module.exports=DetailPage