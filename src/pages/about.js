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
        <p>The forum site uses a React-Redux front end and a Express.js back end with MongoDB.</p>

        <p>You can currently make a User account/profile without e-mail verification, password is encrypted and handled by passport and JWT package</p>

        <p>Current features are, sidebar with all article categories, Article CRUD, Reply CRUD, profile creation/updating, message creation, dynamic sizing</p>
      </div>
    )
  }
}

export default connect(null,{push})(About)
