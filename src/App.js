import React from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './components/message-list'
import SendMessageForm from './components/send-message-form'
import Title from './components/title'

// import RoomList from './components/RoomList'
// import NewRoomForm from './components/NewRoomForm'

// import { tokenUrl, instanceLocator } from './config'

const instanceLocator = "v1:us1:6f0cc5e9-473a-411e-9bdf-c8ac0c3e083d"

const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/6f0cc5e9-473a-411e-9bdf-c8ac0c3e083d/token"

const userId = "damia"

const roomId =  "a00e65c3-2324-4697-be95-fd89cdf0f936"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
       messages: []
    }
    this.sendMessage = this.sendMessage.bind(this)
  }
  
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: userId,
      tokenProvider: new Chatkit.TokenProvider({
        url: testToken
      })
   }) 
   
   chatManager.connect().then(currentUser => {
    this.currentUser = currentUser
    currentUser.subscribeToRoom({
    roomId: roomId,
    hooks: {
      onNewMessage: message => {
        this.setState({
          messages: [...this.state.messages, message]
        })
      }
    }
  })
})
}

sendMessage(text) {
  this.currentUser.sendMessage({
      text,
      roomId: roomId
  })
}

  render() {
    return (
      <div className="app">
        <Title />
        <MessageList 
          roomId={this.state.roomId}
          messages={this.state.messages} />
        <SendMessageForm 
          sendMessage={this.sendMessage} />/>
     </div>
    )
  }
}
export default App;
