import React, {useState} from 'react';
import DisplayUsers from './DisplayUsers.js';

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
        <div className='TechUserProjectConsole console_element'>
            <h3>{project.name}</h3>
            <button onClick={ChangeVisibility}>{isVisible ? 'Hide Users' : 'Show Users'}</button>
            <div style={{ display: isVisible ? 'block' : 'none' }}>
                <button onClick={refreshProject}>Refresh</button>
                <DisplayUsers 
                projectId = {project.user_pool_id} 
                project_refresh_count = {project_refresh_count} />
            </div>
        </div>
    )
}

export default ProjectConsole;