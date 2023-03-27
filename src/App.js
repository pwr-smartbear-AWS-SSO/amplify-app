import React from 'react';
import './App.css';
import { Authenticator, useTheme, Heading, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import DisplayPage from './DisplayPage';
import {
  Logowanie 
 } from './ui-components';
/*const formFields = {
  confirmVerifyUser: {
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
};

const components = {
  VerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },

  ConfirmVerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
};
*/
export default function App() {
  return (
    <Logowanie
    onSubmit={fields => { /* Handle form submission */}}
     /* formFields={formFields}
      components={components}
      hideSignUp={true} */
    >
      {({ signOut, user }) => (
        <main>
          <p>Hello {user.attributes.name}<button onClick={signOut}>Sign out</button></p>
          <DisplayPage />
        </main>
      )}
    </Logowanie>
  );
}
