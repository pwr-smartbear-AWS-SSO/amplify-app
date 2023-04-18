import { Auth } from '@aws-amplify/auth';
import { useState, useEffect } from 'react';
import StartNewProject from './StartNewProject.js';

function Console() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
      async function fetchGroups() {
            const userData = await Auth.currentAuthenticatedUser();
            console.log('User data:', userData); //debuging
            const userGroups = userData.signInUserSession.accessToken.payload['cognito:groups'];
            console.log('User groups:', userGroups);
            setGroups(userGroups || []); 
        }
      fetchGroups();
    }, []);
  
    console.log('Groups:', groups); //debuging


    const isAdmin = groups.includes("Customer_Admin_Group");
    const isTechuser = groups.includes("TechUser");

    return (
        <div id="Console">
          {isAdmin ? (
            <div id="Superadmin_console">
                <h2>Superadmin console:</h2>
                <StartNewProject />
            </div>
          ) : (<></>)}
          {isTechuser ? (
            <div id="Techuser_console">
                <h2>Techuser console:</h2>
            </div>
          ) : (<></>)}
          
        </div>
      );

}

export default Console;