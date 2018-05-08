import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import editArticle from '../../actions/articles/editArticle'
import Title from '../../components/UI/Title'

class EditArticle extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    editArticle: PropTypes.func.isRequired
  }
  constructor(props) {
    console.log('constructor')
    super(props)
    this.state = {
      content: '',
      title:'',
    }
  }
  submitForm(event) {
    const {editArticle} = this.props
    event.preventDefault()
    const oldArticle = this.props.article
    const article = {
      content: this.state.content,
      title: this.state.title,
      category: oldArticle.category,
      author: oldArticle.author,
      _id: oldArticle._id
    }
    editArticle(article)
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
      titleError: 'Please provide an article title'
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
      contentError: 'Article needs content'
    })
    return false
  }


  render(){
    let {title,content} = this.props.article
    return(
      <div className='new_article article'>
        <Title content='Edit Article' level={5} />
        <form onSubmit={this.submitForm.bind(this)}>
          <div className='input'>
          <input type='text'  name='title' defaultValue={title}
            onChange={this.handleTitle.bind(this)} />
            <p>{ this.state.titleError}</p>
          </div>
          <div className='input'>
          <textarea type='textarea'  name='content' defaultValue={content} rows='6' cols='50'
            onChange={this.handleContent.bind(this)} />
            <p>{ this.state.contentError}</p>
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
  userId: currentUser._id
})

export default connect(mapStateToProps,{ push,editArticle })(EditArticle)
