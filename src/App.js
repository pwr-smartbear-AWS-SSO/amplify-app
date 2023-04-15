import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import DisplayPage from './DisplayPage';
import awsExports from './aws-exports';
import { useState, useEffect } from 'react';

Amplify.configure(awsconfig);
Amplify.configure(awsExports);

function App({ signOut, user }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function fetchGroups() {
      const userData = await Auth.currentAuthenticatedUser();
      setGroups(userData.signInUserSession.accessToken.payload["cognito:groups"] || []);
    }
    fetchGroups();
  }, []);

  const isAdmin = groups.includes("Customer_Admin_Group");

  return (
    <>
      <button onClick={signOut}>Sign out</button>
      {isAdmin ? (
        <DisplayPage />
      ) : (
        <h1>Hello {user.username}</h1>
      )}
    </>
  );
}

export default withAuthenticator(App);