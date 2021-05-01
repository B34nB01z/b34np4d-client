import './Header.scss';
import React from "react";
import {Link} from 'react-router-dom';
import { User } from '../../models/user';

interface IProps{
    users: User[]
}
interface IState{
}

class Header extends React.Component<IProps, IState> {

    render() {
        return(
            <div id="nav">
                <div className="inner">
                    <Link to='/'><h2>B34nP4d</h2></Link>
                    <div className="user-list">
                        <p>Users: {this.props.users.length}</p>
                        <div className="user-list-hover">
                            {this.props.users.map(u => {
                                return(
                                    <p key={u.id}>
                                        {u.username}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Header;