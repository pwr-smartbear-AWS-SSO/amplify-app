import { Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, Button, Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import DisplayPage from './ourCode/DisplayPage.js';
import {components, formFields } from './myCode/auth-setup.js';


import awsExports from './aws-exports';
Amplify.configure(awsconfig);
Amplify.configure(awsExports);


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
        <DisplayPage />
      </main>
    )}
  </Authenticator>
  );
}




