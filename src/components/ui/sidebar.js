import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './UI.css'

const clickRedirect = (id) => event => push(`/category/${id}`)
class Sidebar extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired
  }

  showElement(element){
    return(
      <div key={element.id}><span onClick={clickRedirect(element.id)}>{element.title}</span></div>
    )
  }

  render(){
    const array = [{title:'stuff',id:'1'},{title:'things',id:'2'},{title:'other things',id:'3'},{title:'etc',id:'4'}]
    return(
      <div className='sidebar'>{array.map(this.showElement)}</div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: (!!currentUser && !!currentUser._id)
})

export default connect(mapStateToProps, { push })(Sidebar)
