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
    Categories(route)
    subscribeToWebsocket()
  }

  showElement(element,route,push){
    const clickRedirect = (id,route,push) => event => {
      event.preventDefault()
      push(`/${route}/${element._id}`)
    }
    if(route==='articles'){
      return(
        <div className='single_article' key={element._id}><a onClick={clickRedirect(element._id,route,push)}>{element.title}</a><hr /></div>
      )
    } else if (route==='rooms'){
      return(
        <div className='single_article' key={element._id}><a onClick={clickRedirect(element._id,route,push)}>{element.name}</a><hr /></div>
      )
    }
  }

  render(){
    const { route } = this.props
    let categories = this.props.categories
    if(route==='articles'){
      categories = categories.map(category =>  {
        let item = {title:category , _id:category}
        return item
      })
      categories = [{title:'all articles',_id:'all'}].concat(...categories)
    }
    let noCategories = false
    if(categories.length===0){
      noCategories = true
    }
    return(
      <div className='sidebar' hidden={noCategories} ><hr />{categories.map(element => this.showElement(element,route,this.props.push))}</div>
    )
  }
}

const mapStateToProps = ({ currentUser,categories,router }) => {
  const route = router.location.pathname.split('/')[1]
  let selectedCategories = categories
  const userId = (!!currentUser?currentUser._id:null)
  if(route==='rooms'){
    selectedCategories = categories.filter((category) => {
      return (category.participants.indexOf(userId) > -1)
    })
  }
  return{
  signedIn: (!!currentUser && !!currentUser._id),
  categories: selectedCategories,
  route: route
  }
}

export default connect(mapStateToProps, { push, subscribeToWebsocket, Categories })(Sidebar)
