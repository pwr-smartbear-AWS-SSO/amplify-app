import React, {useState} from 'react';
import DisplayUsers from './DisplayUsers.js';
import ConfigureSSO from './ConfigureSSO.js';

function ProjectConsole({project}){
    const [isVisible, setIsVisible] = useState(true);
    const [project_refresh_count, set_projects_refresh_count] = useState(1);

    const ChangeVisibility = () => {
        setIsVisible(!isVisible);
    };

    const refreshProject = () => {
        set_projects_refresh_count(project_refresh_count + 1);
    };

    return(
        <>
        <div className='TechUserProjectConsole console_element'>
            <div className='console_element_header'>
                <h3>{project.name} logged users</h3>
                <div className='console_element_header_buttons'>
                    <button onClick={refreshProject}>Refresh</button>
                    <button onClick={ChangeVisibility}>{isVisible ? 'Hide Users' : 'Show Users'}</button>
                </div>
            </div>
            <div style={{ display: isVisible ? 'block' : 'none' }}>
                <DisplayUsers 
                projectId = {project.user_pool_id} 
                project_refresh_count = {project_refresh_count} />
            </div>
        </div>
        <div className='TechUserProjectConsoleSSOManager console_element'>
            <div className='console_element_header'>
                <h3>Manage SSO for {project.name}</h3>
            </div>
            <ConfigureSSO 
            projectId = {project.user_pool_id} 
            domainUrl = {project.domain_url}
            project_name = {project.name}
            clients={[project.client1_id, project.client2_id]}/>
        </div>
        </>
    )
}

export default ProjectConsole;