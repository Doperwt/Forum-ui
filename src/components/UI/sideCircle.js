import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './UI.css'
import { connect as subscribeToWebsocket } from '../../actions/websocket'
import Categories from '../../actions/articles/categories'


class Sidecircle extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired
  }
  componentWillMount() {
    const { Categories,subscribeToWebsocket } = this.props
    Categories()
    subscribeToWebsocket()
  }
  clickRedirect(id) {
    push(`/articles/${id}`)
  }

  showElement(element){
    const {push,clickRedirect} = this.props
    return(
      <div key={element._id} className='side'><a onClick={clickRedirect(element._id)}>{element.title}</a></div>
    )
  }

  render(){
    const categories = this.props.categories.map(category =>  {
      let item = {title:category , _id:category}
      return item
    })
    const array = [{title:'all articles',_id:'all'}].concat(...categories)
    return(
      <div className='sidecircle'>{array.map(element => this.showElement.bind(this))}</div>
    )
  }
}

const mapStateToProps = ({ currentUser,categories }) => ({
  signedIn: (!!currentUser && !!currentUser._id),
  categories: categories,
})

export default connect(mapStateToProps, { push, subscribeToWebsocket, Categories })(Sidecircle)
