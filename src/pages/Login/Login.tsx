import React, { useState } from 'react';

interface LoginProps {
    connect: (username: string) => void;
}

export default function Login({ connect }: LoginProps) {

    const [username, setUsername] = useState("");

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        connect(username);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                Username: <input type="text" id="username" onChange={e => setUsername(e.target.value)} />
                <button type="submit">Login</button>
            </form> 
        </div>
    );


}