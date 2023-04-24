import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { components, formFields } from './Console/auth-setup.js';
import Console from './Console/Console.js';

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
          <button onClick={signOut}>Sign out</button>
          <br />
          <Console />
        </main>
      )}
    </Authenticator>
  );
}