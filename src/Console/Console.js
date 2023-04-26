import { Auth } from '@aws-amplify/auth';
import { useState, useEffect } from 'react';
import SuperuserConsole from './SuperuserConsole/SuperuserConsole.js';
import TechuserConsole from './TechuserConsole/TechuserConsole.js';

function Console() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
      async function fetchGroups() {
            const userData = await Auth.currentAuthenticatedUser();
            const userGroups = userData.signInUserSession.accessToken.payload['cognito:groups'];
            setGroups(userGroups || []); 
        }
      fetchGroups();
    }, []);
  
    const isAdmin = groups.includes("Customer_Admin_Group");
    const isTechuser = groups.includes("TechUser");

    return (
        <div id="Console">
          {isAdmin ? (
            <SuperuserConsole />
          ) : (<></>)}
          {isTechuser ? (
            <>
            <TechuserConsole />
            </>
          ) : (<></>)}
          
        </div>
      );

}

export default Console;