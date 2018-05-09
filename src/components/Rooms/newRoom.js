import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import newRoom from '../../actions/rooms/newRoom'

class NewRoom extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    newRoom: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }
  submitForm(event) {
    const { newRoom } = this.props
    console.log(newRoom)
    event.preventDefault()
    const room = {
      name: this.state.name,
      game: this.state.game,
    }
    newRoom(room)
    this.setState({name:''})
  }

  handleName(event){
    this.setState({name: event.target.value})
    const name  = this.state.name
    if(!!name){
      if (name.length > 1) {
        this.setState({
          nameError: null
        })
        return true
      }
    }
    this.setState({
      nameError: 'Please provide a room name'
    })
    return false
  }

  handleGame(event){
    console.log(event.target.value)
    this.setState({game: event.target.value})
  }


  render(){
    return(
      <div className='new_article article'>
        <h3>New Room</h3>
        <form onSubmit={this.submitForm.bind(this)}>
          <div className='input'>
          <input type='text' value={this.state.name} name='name' placeholder='Title'
            onChange={this.handleName.bind(this)} />
            <p>{ this.state.nameError}</p>
          </div>
          <div className='input'>
          <p>Game type, can be changed later</p>
          <input type='radio'  name='game' id='none' value='none'
            onChange={this.handleGame.bind(this)} /><label>None</label>
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

export default connect(mapStateToProps,{ push,newRoom })(NewRoom)
