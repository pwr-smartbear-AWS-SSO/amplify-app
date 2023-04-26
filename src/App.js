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
        <>
          <div id="login_data">
            <div id="login_data_content">
            <p>You are logged in as: <b>{user.attributes.email}</b></p>
            <button onClick={signOut}>Sign out</button>
            </div>
          </div>
          <main>
          <Console />
        </main>
        </>
      )}
    </Authenticator>
  );
}