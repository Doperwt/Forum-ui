import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import Title from '../components/UI/Title'
import './pages.css'
class Contact extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired
  }


  render(){
    return(
      <div className='article'>
        <Title content='Contact' level={2} />
        <p>Overview</p>
      </div>
    )
  }
}

export default Contact