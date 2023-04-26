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
            <form>
                <lable>lable1</lable>
                <input />
                <br />
                <lable>lable2</lable>
                <input />
                <br />
                <lable>lable3</lable>
                <input />
                <br />
                <button type="submit">Submit SSO</button>
            </form>
        </div>
        </>
    )
}

export default ProjectConsole;