import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';


function DisplayProjects({ displayProjects_refresh_count,  refreshDisplayProjects}){
    const [isVisible, setIsVisible] = useState(true);
    const [projectsData, setProjectsData] = useState({});

    const ChangeVisibility = () => {
        setIsVisible(!isVisible);
    };


    useEffect(() => {
        const DisplayProjectsList = async () => {
            try {
                const response = await API.get('OurApiAmplifyProject', '/GetProjectsListsFromDB');
                
                const response_data = Object.values(response).map(str => JSON.parse(str));
                setProjectsData(response_data);

                console.log(response);
                console.log(response_data);
                

            }catch(error) {
                console.error(error);
                console.log('Cannot display projects');
            }
        };
        
        DisplayProjectsList();
    }, [displayProjects_refresh_count]);


    const delResponse = document.getElementById('Del_response');

    const handleDeleteClick = async (user_pool_id, domain_prefix, project_name) => {
        console.log(user_pool_id)
        try {
            const deleteProjectPath = '/DeleteProject/'+user_pool_id;
            await API.del('myProjectManagerApi', deleteProjectPath, {body: {domainPrefix: domain_prefix}});
            console.log('Project deleted succesfully.');

            delResponse.textContent = 'Project '+project_name+' deleted succesfully.';

            setTimeout(() => {
                refreshDisplayProjects();
            }, 500);

        } catch (error) {
            console.error('Couldnt delete the project');
            console.error(error);
            console.log(error);

        }
    };



    return(
        <div id='DisplayProjectsConsole' className = 'console_element'>
            <div className='console_element_header'>
                <h3>Projects Display</h3>
                <div className='console_element_header_buttons'>
                    <button onClick={refreshDisplayProjects}>Refresh</button>
                    <button onClick={ChangeVisibility}>{isVisible ? 'Hide Projects' : 'Show Projects'}</button>
                </div>
            </div>
            <div>
                <div id = "display_projects_resoult" style={{ display: isVisible ? 'block' : 'none' }}>
                    
                    <table>
                        <tr>
                            <th>Project Name</th>
                            <th>Tech User Email</th>
                            <th></th>
                        </tr>
                        {Object.keys(projectsData).map((key) => (
                            <tr key={key}>
                                <td>{projectsData[key].project_name}</td> 
                                <td>{projectsData[key].tech_user_email}</td>
                                <td className="td_with_delete_button"><button type="button" onClick={() => handleDeleteClick(projectsData[key].user_pool_id, projectsData[key].domain_prefix, projectsData[key].project_name)}>Delete</button></td>
                            </tr>
                        ))}
                    </table>
                    <div id="Del_response"></div>
                </div>
            </div>
        </div>
    )
}


export default DisplayProjects;