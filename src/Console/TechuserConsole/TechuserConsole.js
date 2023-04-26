import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { Auth } from '@aws-amplify/auth';
import ProjectConsole from './ProjectConsole.js';

function TechuserConsole() {
    const [projectsData, setProjectsData] = useState([]);
    

    useEffect(() => {
        const GetListOfMyProjects = async () => {
            try {
                const userData = await Auth.currentAuthenticatedUser();
                console.log(userData.username);
                const response = await API.get('OurApiAmplifyProject', '/ListMyProjects/'+userData.username);
                console.log(response);
                const response_data = Object.values(response).map(str => JSON.parse(str));
                console.log(response_data);
                setProjectsData(response_data);
                

            }catch(error) {
                console.error(error);
                console.log('Cannot list projects');
            }
        };

        GetListOfMyProjects();
    }, []);

 
    return(
        <div id="Techuser_console" >
            <h2>Techuser console:</h2>
            {projectsData.map((project, index) => {
                return <ProjectConsole key={index} project={project} />;
            })}
        </div>
    )
}

export default TechuserConsole;
