import React, { useEffect, useState } from 'react';
import DisplayProjects from './DisplayProjects.js';
import StartNewProject from './StartNewProject.js';

function SuperuserConsole() {
    const [displayProjects_refresh_count, set_DisplayProjects_refresh_count] = useState(1);

    const refreshDisplayProjects = () => {
        set_DisplayProjects_refresh_count(displayProjects_refresh_count + 1);
    };

    return(
        <div id="Superadmin_console">
                <h2>Superadmin console:</h2>
                <DisplayProjects 
                displayProjects_refresh_count = {displayProjects_refresh_count} 
                refreshDisplayProjects = {refreshDisplayProjects} />
                
                <StartNewProject 
                refreshDisplayProjects = {refreshDisplayProjects} />
            </div>
    )
}

export default SuperuserConsole;