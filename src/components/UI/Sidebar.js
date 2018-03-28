import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './UI.css'
import { connect as subscribeToWebsocket } from '../../actions/websocket'


class Sidebar extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired
  }
  componentWillMount() {
    const { subscribeToWebsocket } = this.props
    subscribeToWebsocket()
  }

  showElement(element){
    const clickRedirect = (id) => event => {
      push(`/category/${id}`)
      console.log(element)}

    return(
      <div key={element._id}><a onClick={clickRedirect(element._id)}>{element.title}</a><hr /></div>
    )
  }

  render(){
    console.log(this.props.signedIn)
    const array = [{title:'stuff',_id:'1'},{title:'things',_id:'2'},{title:'other things',_id:'3'},{title:'etc',_id:'4'}]
    return(
      <div className='sidebar'><hr />{array.map(this.showElement)}</div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: (!!currentUser && !!currentUser._id)
})

export default connect(mapStateToProps, { push, subscribeToWebsocket })(Sidebar)
