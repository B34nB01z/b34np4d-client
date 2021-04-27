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
                <div className="user-list">
                    <p>Users: {this.props.users.length}</p>
                    <div className="user-list-hover">
                        {this.props.users.map(u => {
                            return(
                                <p>
                                    {u.username}
                                </p>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }

}

export default Header;