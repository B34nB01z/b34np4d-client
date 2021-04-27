import './App.scss';
import React from "react";
import Header from './components/Header/Header';
import { User } from './models/user';

enum Type {
  USER_EVENT = "userevent",
}

interface IProps{

}
interface IState{
  currentUsers: User[];
  username: string;
  client: WebSocket;
}

class App extends React.Component<IProps,IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      currentUsers: [],
      username: null,
      client: null,
    };
  }

  connect = () => {
    if(!this.state.client) {
      const client = new WebSocket('ws://localhost:8345');
      client.onopen = () => {
        console.log('WebSocket connected!');
        client.send(JSON.stringify({
          username: this.state.username,
          type: Type.USER_EVENT,
        }));
      };

      client.onmessage = (message) => {
        const data = JSON.parse(message.data);
        const stateToChange: any = {};
  
        if(data.type = Type.USER_EVENT) {
          stateToChange.currentUsers = Object.values(data.data.users);
        }
  
        this.setState({
          ...stateToChange
        });
      }
      
      this.setState({client})
    }

  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({username:e.target.value})
  }

  render() {
    return (
      <div id="app">
        <Header users={this.state.currentUsers}/>

        <br />
        <br />
        <br />
        <input type="text" id="username" onChange={this.handleChange}></input>
        <button onClick={this.connect}>connect</button>

        {this.state.currentUsers.map(u => {
            return (
              <p>{u.username}</p>
            )
        })}

      </div>
    );
  }
  
}

export default App;
