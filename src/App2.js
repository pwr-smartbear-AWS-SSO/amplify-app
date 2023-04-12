import logo from './logo.svg';
import './App.css';
import Amplify, { API } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { Authenticator, useTheme, Heading, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


const formFields = {
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


const apiURL = "YOUR API HERE"

const App = () => {
  const [inputProjectName, setProjectName] = useState("")
  const [inputAdminEmail, setAdminEmail] = useState("")

 
  function RunLambda(e, f) {
    let ProjectName = e.inputProjectName
    let AdminEmail = f.inputAdminEmail

    fetch(apiURL, {
      "method": "POST",
      "queryStringParameters": {
        "project_name": ProjectName,
        "tech_user_email": AdminEmail
      }
    })
  }

  return (
    
    <div className="App2">
      <Authenticator
      formFields={formFields}
      components={components}
      hideSignUp={true}
      >
        {({ signOut, user }) => (
          <main>
            <p>Hello {user.attributes.name}<button onClick={signOut}>Sign out</button></p>
            <h1>Start New Project</h1>
            <div>
                <input placeholder="project name" type="text" value={inputProjectName} onChange={(e) => setProjectName(e.target.value)}/>  
                <input placeholder="admin email" type="text" value={inputAdminEmail} onChange={(e) => setAdminEmail(e.target.value)}/>      
            </div>
            <br/>
            <button onClick={() => RunLambda({inputProjectName, inputAdminEmail})}>Submit</button>
          </main>
        )}
      </Authenticator>
    </div>
  )
}

export default App2;
