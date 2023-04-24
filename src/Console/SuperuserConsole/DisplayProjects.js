import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';


function DisplayProjects({ displayProjects_refresh_count,  refreshDisplayProjects}){
    const [isVisible, setIsVisible] = useState(true);
    const [projectsData, setProjectsData] = useState({});

    const ChangeVisibility = () => {
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        const DispleyProjectsList = async () => {
            try {
                const response = await API.get('myProjectManagerApi', '/GetProjectsListFromDB');
                
                const response_data = Object.values(response).map(str => JSON.parse(str));
                setProjectsData(response_data);

                console.log(response);
                console.log(response_data);
                

            }catch(error) {
                console.error(error);
                console.log('Cannot display projects');
            }
        };
        
        DispleyProjectsList();
    }, [displayProjects_refresh_count]);



    return(
        <div id='DispleyProjectsConsole' className = 'console_element'>
            <h3>Projects Display</h3>
            <div>
                <button onClick={ChangeVisibility}>{isVisible ? 'Hide Projects' : 'Show Projects'}</button>
                <div id = "display_projects_resoult" style={{ display: isVisible ? 'block' : 'none' }}>
                    <button onClick={refreshDisplayProjects}>Refresh</button>
                    <ul>
                        {Object.keys(projectsData).map((key) => (
                            <li key={key}>
                                {projectsData[key].project_name}: {projectsData[key].tech_user_email}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default DisplayProjects;