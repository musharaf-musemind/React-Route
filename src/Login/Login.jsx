import React, { useState } from 'react';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from '../firebase/firebase.init';
import { signOut } from 'firebase/auth/cordova';

const Login = () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    
    const [user, setUser] = useState(null);

    const signupHandle = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                setUser(loggedInUser);
                // console.log(loggedInUser.displayName);


            })
            .catch(error => {
                console.log('error', error.message);

            })
    }

    const signOutHandle = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null);
            })
            .catch(error => console.log(error))
    }

    const githubSignIn = () => {
        signInWithPopup(auth, githubProvider)
        .then(result => {
            console.log(result.user.displayName);
            
            setUser(result.user);
            
        })        
        .catch(error => console.log('error', error)
        )
    }
    return (
        <div>
            {!user ?
                <div>
                    <button onClick={signupHandle} className='btn button-success'> Sign in Google</button>
                    <button onClick={githubSignIn} className='btn button-success'> Sign in Github</button>
                </div>
                :
                <button onClick={signOutHandle} className='btn button-success'> Sign Out</button>}
                
            {user && <div>User Name: {user.displayName} </div>}
            {user && <div>User Email: {user.email} </div>}
        </div>
    );
};

export default Login;