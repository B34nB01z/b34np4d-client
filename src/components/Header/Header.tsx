import './Header.scss';
import React from "react";
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
                    <h2>B34nP4d</h2>
                    <div className="user-list">
                        <p>Users: {this.props.users.length}</p>
                        <div className="user-list-hover">
                            {this.props.users.map(u => {
                                return(
                                    <p key={u.username}>
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