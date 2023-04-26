import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';

function DisplayUsers({projectId, project_refresh_count}){
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        const DispleyProjectUsers = async () => {
            try {
                console.log(projectId)
                const response = await API.get('OurApiAmplifyProject', '/GetUsersList/'+projectId);
                console.log(response);
                const response_data = Object.values(response).map(str => JSON.parse(str));
                console.log(response_data);
                setUsersList(response_data);


            }catch(error) {
                console.error(error);
                console.log('Cannot display projects');
            }
        };
        
        DispleyProjectUsers();
    }, [project_refresh_count]);


    


    return(
        <>
           <table>
               <tr>
                   <th>User ID</th>
                   <th>User Email</th>
                   <th></th>
               </tr>
               {usersList.map((user, index) => {
                   return(
                       <tr>
                           <td>{user.userId}</td>
                           <td>{user.email}</td>
                           <td className="td_with_delete_button"><button>Delete</button></td>
                       </tr>
                   )
               })}
           </table>
        </>  
       )
   }

export default DisplayUsers;