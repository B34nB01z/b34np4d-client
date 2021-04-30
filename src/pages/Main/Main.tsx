import React from 'react';
import CTFTable from '../../components/CTFTable/CTFTable';
import { CTF } from '../../models/ctf';

interface IState{
  ctfs: {error: string, isLoaded: boolean, items: CTF[]};
}

class Main extends React.Component<{},IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      ctfs: {
          error: null,
          isLoaded: false,
          items: [],
      },
    }
  }

  componentDidMount() {
    //fetch CTFs
    fetch(`http://localhost:9999/ctfs`, {method: "GET"})
      .then(res => res.json())
      .then((res) => {
        this.setState({
          ctfs: {
            error: null,
            isLoaded: true,
            items: [...res],
          },
        });
      },
      (error) => {
        this.setState({
          ctfs: {
            isLoaded: true,
            error,
            items: [],
          },
        });
      });
  }

  renderTable() {
    const {error, isLoaded, items} = this.state.ctfs;
    if(error)
      return <div>Error: {JSON.stringify(error)}</div>
    else if(!isLoaded)
      return <div>Loading ...</div>
    else
      return <CTFTable ctfs={items} />
  }

  render() {

    return(
        <div>
          {this.renderTable()}
        </div>
    );

  }

}

export default Main;