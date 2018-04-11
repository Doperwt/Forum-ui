import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import newArticle from '../../actions/articles/newArticle'
import Title from '../../components/UI/Title'

class NewArticle extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    newArticle: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      title:'',
      category:'',
    }
  }
  submitForm(event) {
    const {newArticle} = this.props
    event.preventDefault()
    const article = {
      content: this.state.content,
      title: this.state.title,
      category: this.state.category,
      author: this.props.userId,
    }
    newArticle(article)
  }
  handleTitle(event){
    this.setState({title: event.target.value})
    const title  = this.state.title
    if(!!title){
      if (title.length > 1) {
        this.setState({
          titleError: null
        })
        return true
      }
    }
    this.setState({
      titleError: 'Please provide your first name'
    })
    return false
  }

  handleContent(event){
    this.setState({content: event.target.value})
    const content  = this.state.content
    if(!!content){
      if (content.length > 1) {
        this.setState({
          contentError: null
        })
        return true
      }
    }
    this.setState({
      contentError: 'Please provide your first name'
    })
    return false
  }

  handleCategory(event){
    this.setState({category: event.target.value})
    const category  = this.state.category
    if(!!category){
      if (category.length > 1) {
        this.setState({
          categoryError: null
        })
        return true
      }
    }
    this.setState({
      categoryError: 'Please provide your first name'
    })
    return false
  }

  render(){
    return(
      <div className='new_article article'>
        <Title content='New Article' level={4} />
        <form onSubmit={this.submitForm.bind(this)}>
          <div className='input'>
          <input type='text'  name='title' placeholder='Title'
            onChange={this.handleTitle.bind(this)} />
            <p>{ this.state.titleError}</p>
          </div>
          <div className='input'>
          <textarea type='textarea'  name='content' placeholder='Content' rows='6' cols='50'
            onChange={this.handleContent.bind(this)} />
            <p>{ this.state.contentError}</p>
          </div>
          <div className='input'>
          <input type='text'  name='category' placeholder='Category'
            onChange={this.handleCategory.bind(this)} />
            <p>{ this.state.categoryError}</p>
          </div>
        </form>
        <button
          className='sign_up'
          onClick={ this.submitForm.bind(this) }
          >Submit</button>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: (!!currentUser && !!currentUser._id),
  userId: (!!currentUser?currentUser._id:null)
})

export default connect(mapStateToProps,{ push,newArticle })(NewArticle)
