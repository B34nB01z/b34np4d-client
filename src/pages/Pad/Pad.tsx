import React from 'react';
import {Progress } from '../../components/Progress/Progress';
import { Challenge } from '../../models/challenge';
import { CTF } from '../../models/ctf';

interface PadProps {
  ctf: CTF;
}

interface PadState {
  ctf: CTF;
  chals: {error: string, isLoaded: boolean, items: Challenge[]};
}

class Pad extends React.Component<{}, PadState> {

  constructor(props: any) {
    super(props);
    this.state = {
      ctf: props.location.state.ctf,
      chals: {
          error: null,
          isLoaded: false,
          items: [],
      },
    }
  }

  componentDidMount() {
    fetch(`http://localhost:9999/chals?ctf=${this.state.ctf.id}`, {method: "GET"})
      .then(res => res.json())
      .then((res: Challenge[]) => {
        this.setState({
          chals: {
            error: null,
            isLoaded: true,
            items: [...res],
          },
        });
      },
      (error) => {
        this.setState({
          chals: {
            isLoaded: true,
            error,
            items: [],
          },
        });
      });
  }

  renderChals() {
    const {error, isLoaded, items} = this.state.chals;
    console.log(this.state.chals)
    if(error)
      return <div>Error: {JSON.stringify(error)}</div>
    else if(!isLoaded)
      return <div>Loading...</div>
    else
      return items.map((i: Challenge) => <p key={i.id}>{i.name}</p>);
  }

  render() {
    return(
      <div>
        <h1>Pad</h1>
        <Progress ctfName={this.state.ctf.name} ctfUrl={this.state.ctf.url} chals={this.state.chals.items} />
        {this.renderChals()}
      </div>
    );
  }

}

export default Pad;