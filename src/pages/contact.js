import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import Title from '../components/UI/Title'
import { connect } from 'react-redux'
import './pages.css'

class Contact extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired
  }
  goRoute(route,event){
    const { push } = this.props
    push(route)
  }

  render(){
    const myProfile = `/profile/${process.env.REACT_APP_PROFILE}`
    return(
      <div className='article main'>
        <Title content='Contact' level={2} />
        <p>
        You can send me a message at r.f.denouden@gmail.com<br/>
        On <a href='https://www.linkedin.com/in/robert-den-ouden-3747a125/'>LinkedIn</a><br/>
        Look at my projects on <a href='https://github.com/Doperwt' >Github</a><br/>
        Or on this site with a simple message from the <a className='anchor' onClick={this.goRoute.bind(this,myProfile)}>Profile page</a>
        </p>
      </div>
    )
  }
}

export default connect(null,{push})(Contact)
