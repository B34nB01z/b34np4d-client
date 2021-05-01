import './App.scss';
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from './components/Header/Header';
import { User } from './models/user';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Pad from './pages/Pad/Pad';

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

        <Router>
          <Header users={this.state.currentUsers}/>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/pad" component={Pad} />
          </Switch>
        </Router>

      </div>
    );
  }
  
}

export default App;
