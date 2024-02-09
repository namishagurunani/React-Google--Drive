import React, { useState } from 'react';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Data from "./components/Data";
import { auth, provider } from './components/firebase';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

   // Function to sign in with Google authentication provider
  const signIn = () => {
    auth.signInWithPopup(provider)
            .then(({ user }) => setUser(user))
            .catch(err => alert(err));
  };

  // JSX rendering
  return (
    <> 
     {/* Conditional rendering based on user authentication status */}
    {user ? (
      <>
        <Header photoURL={user.photoURL} setSearchTerm={setSearchTerm} />
        <div className="App">
          <Sidebar />
          <Data searchTerm={searchTerm} />
        </div>
      </>
    ) : (
          <div className="Loginpage">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/2295px-Google_Drive_icon_%282020%29.svg.png" alt="gdrive" />
            <br/>
            <h1 style={{color:"white", fontSize:"2.6rem", fontWeight:"400"}}>Google Drive</h1>
            <br/>  <br/>
            <button onClick={signIn}>Login to Google Drive</button>
          </div>
    )
    }
    </>
  );
}

export default App;
