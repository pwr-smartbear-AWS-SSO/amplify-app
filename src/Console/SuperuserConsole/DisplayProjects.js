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
        
        DispleyProjectsList();
    }, [displayProjects_refresh_count]);


    const handleDeleteClick = async (event, user_pool_id) => {
        try {
            const deleteProjectPath = '/DeleteProject/'+user_pool_id;
            await API.del('OurApiAmplifyProject', deleteProjectPath, {});
            console.log('Project deleted succesfully.');

            setTimeout(() => {
                refreshDisplayProjects();
            }, 1000);

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
                                <td className="td_with_delete_button"><button type="button" onClick={() => handleDeleteClick(projectsData[key].user_pool_id)}>Delete</button></td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DisplayProjects;
