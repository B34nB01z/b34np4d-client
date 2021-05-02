import React from 'react';
import ChalList from '../../components/ChalList/ChalList';
import {Progress } from '../../components/Progress/Progress';
import { Category } from '../../models/category';
import { Challenge } from '../../models/challenge';
import { CTF } from '../../models/ctf';
import './Pad.scss';

interface PadProps {
  ctf: CTF;
}

interface PadState {
  ctf: CTF;
  chals: {error: string, isLoaded: boolean, items: Challenge[]};
  cats: {error: string, isLoaded: boolean, items: Category[]};
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
      cats: {
        error: null,
        isLoaded: false,
        items: [],
      }
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

    fetch(`http://localhost:9999/cats?ctf=${this.state.ctf.id}`, {method: "GET"})
      .then(res => res.json())
      .then((res: Category[]) => {
        this.setState({
          cats: {
            error: null,
            isLoaded: true,
            items: [...res],
          },
        });
      },
      (error) => {
        this.setState({
          cats: {
            isLoaded: true,
            error,
            items: [],
          },
        });
      });
  }

  /*renderChals() {
    const {error, isLoaded, items} = this.state.chals;
    if(error)
      return <div>Error: {JSON.stringify(error)}</div>
    else if(!isLoaded)
      return <div>Loading...</div>
    else
      return items.map((i: Challenge) => <p key={i.id}>{i.name}</p>);
  }*/

  render() {
    return(
      <div>
        <div className="left-bar">
          <Progress ctfName={this.state.ctf.name} ctfUrl={this.state.ctf.url} chals={this.state.chals.items} />
          <hr />
          <ChalList chals={this.state.chals.items} cats={this.state.cats.items} />
        </div>
      </div>
    );
  }

}

export default Pad;