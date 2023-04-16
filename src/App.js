import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { components, formFields } from './my_code/auth-setup.js';

import Console from './my_code/Console.js';

export default function App() {
  
  return (
    <Authenticator
      formFields={formFields}
      components={components}
      hideSignUp={true}
    >
      {({ signOut, user }) => (
        <main>
          <h1>You are logged in as: {user.attributes.email}</h1>
          <button onClick={() => console.log(user)}>Log User</button> 
          <button onClick={signOut}>Sign out</button>
          <Console />
        </main>
      )}
    </Authenticator>
  );
}
