import './App.scss';
import React from "react";
import Header from './components/Header/Header';
import { User } from './models/user';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';

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

  connect = (username: string) => {
    this.setState({username: username})
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
          stateToChange.currentUsers = [...data.data];
        }
  
        this.setState({
          ...stateToChange
        });
      }
      
      this.setState({client})
    }

  }

  render() {

    if(!this.state.username) {
      return <Login connect={this.connect} />
    }

    return (
      <div id="app">
        <Header users={this.state.currentUsers}/>

        <Main />

      </div>
    );
  }
  
}

export default App;
