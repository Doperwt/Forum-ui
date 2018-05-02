import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './UI.css'
import { connect as subscribeToWebsocket } from '../../actions/websocket'
import Categories from '../../actions/categories'


class Sidebar extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    Categories: PropTypes.func.isRequired
  }
  componentWillMount() {
    const { Categories,subscribeToWebsocket,route } = this.props
    console.log(route)
    Categories(route)
    subscribeToWebsocket()
  }

  showElement(element,push){
    const clickRedirect = (id,push) => event => {
      event.preventDefault()
      push(`/articles/${element._id}`)
    }
    return(
      <div className='single_article' key={element._id}><a onClick={clickRedirect(element._id,push)}>{element.title}</a><hr /></div>
    )
  }

  render(){
    const { route } = this.props
    let categories = this.props.categories.map(category =>  {
      let item = {title:category , _id:category}
      return item
    })
    if(route==='articles'){
      categories = [{title:'all articles',_id:'all'}].concat(...categories)
    }
    let noCategories = false
    if(categories.length===0){
      noCategories = true
    }
    return(
      <div className='sidebar' hidden={noCategories} ><hr />{categories.map(element => this.showElement(element,this.props.push))}</div>
    )
  }
}

const mapStateToProps = ({ currentUser,categories,router }) => {
  const route = router.location.pathname.split('/')[1]
  return{
  signedIn: (!!currentUser && !!currentUser._id),
  categories: categories,
  route: route
  }
}

export default connect(mapStateToProps, { push, subscribeToWebsocket, Categories })(Sidebar)
