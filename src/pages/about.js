import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import Title from '../components/UI/Title'
import { connect } from 'react-redux'
import './pages.css'

class About extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired
  }


  render(){
    return(
      <div className='article main'>
        <Title content='About' level={2} />
        <p>Overview</p>
      </div>
    )
  }
}

export default connect(null,{push})(About)