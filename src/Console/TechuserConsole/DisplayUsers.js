import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';

function DisplayUsers({projectId, project_refresh_count}){
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        const DispleyProjectUsers = async () => {
            try {
                console.log(projectId)
                const response = await API.get('myProjectManagerApi', '/GetUsersList/'+projectId);
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
        <ul>
            {usersList.map((user, index) => {
                return(
                    <li key={index}>
                        {user.userId}: {user.email}
                    </li>
                )
            })}
        </ul>
     </>  
    )
}

export default DisplayUsers;