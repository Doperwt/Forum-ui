import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './UI.css'
import { connect as subscribeToWebsocket } from '../../actions/websocket'
import Categories from '../../actions/articles/categories'


class Sidebar extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired
  }
  componentWillMount() {
    const { Categories,subscribeToWebsocket } = this.props
    Categories()
    subscribeToWebsocket()
  }

  showElement(element,push){
    const clickRedirect = (id,push) => event => {
      event.preventDefault()
      push(`/articles/${element._id}`)
    }
    return(
      <div key={element._id}><a onClick={clickRedirect(element._id,push)}>{element.title}</a><hr /></div>
    )
  }

  render(){
    const categories = this.props.categories.map(category =>  {
      let item = {title:category , _id:category}
      return item
    })
    const array = [{title:'all articles',_id:'all'}].concat(...categories)
    return(
      <div className='sidebar'><hr />{array.map(element => this.showElement(element,this.props.push))}</div>
    )
  }
}

const mapStateToProps = ({ currentUser,categories }) => ({
  signedIn: (!!currentUser && !!currentUser._id),
  categories: categories,
})

export default connect(mapStateToProps, { push, subscribeToWebsocket, Categories })(Sidebar)
