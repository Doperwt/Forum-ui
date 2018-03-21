import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Article extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired
  }

  render(){
    return(
      <div><p>side</p></div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: (!!currentUser && !!currentUser._id)
})

export default connect(mapStateToProps, { push })(Article)
