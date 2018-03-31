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

  showElement(element,push){
    const clickRedirect = (id,push) => event => {
      event.preventDefault()
      push(element._id)
    }
    return(
      <div key={element._id}><a onClick={clickRedirect(element._id,push)}>{element.title}</a><hr /></div>
    )
  }

  render(){
    const array = [{title:'articles',_id:'/articles'},{title:'things',_id:'2'},{title:'other things',_id:'3'},{title:'etc',_id:'4'}]
    return(
      <div className='sidebar'><hr />{array.map(element => this.showElement(element,this.props.push))}</div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: (!!currentUser && !!currentUser._id)
})

export default connect(mapStateToProps, { push, subscribeToWebsocket })(Sidebar)
