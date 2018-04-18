import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class ShowMessage extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
  }
  render(){
    let message = this.props.message
    return(
      <div>{message}</div>
    )
  }
}

const mapStateToProps = ({ currentUser,messages },match) => {
  let message = messages.filter(message => message._id=match)
  return{
    signedIn: (!!currentUser && !!currentUser._id),
    userId: (!!currentUser?currentUser._id:null),
    message:message,
    
  }
  }

export default connect(mapStateToProps,{push})(ShowMessage)
