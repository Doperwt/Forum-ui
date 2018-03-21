import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './UI.css'


class Sidebar extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired
  }


  showElement(element){
    const clickRedirect = (id) => event => push(`/category/${id}`)
    
    return(
      <div key={element.id}><a onClick={clickRedirect(element.id)}>{element.title}</a><hr /></div>
    )
  }

  render(){
    const array = [{title:'stuff',id:'1'},{title:'things',id:'2'},{title:'other things',id:'3'},{title:'etc',id:'4'}]
    return(
      <div className='sidebar'><hr />{array.map(this.showElement)}</div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: (!!currentUser && !!currentUser._id)
})

export default connect(mapStateToProps, { push })(Sidebar)
