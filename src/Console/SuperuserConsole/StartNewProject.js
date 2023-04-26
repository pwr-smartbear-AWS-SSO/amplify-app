import { useState } from 'react';
import { API } from 'aws-amplify';

function StartNewProject({ refreshDisplayProjects }) {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  const submitResoult = document.getElementById('subbmit_resoult');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try { 
      const startProjectPath = '/StartNewProject/'+value1+"/"+value2;
      await API.post('OurApiAmplifyProject', startProjectPath, {});
      console.log('Lambda function starting new project executed successfully.');
      submitResoult.textContent = 'New Project Created!';
      setTimeout(() => {
        refreshDisplayProjects();
      }, 1000);
      
    } catch (error) {
      console.error('Creting new project failed!');
      console.error(error);
      submitResoult.textContent = 'Something went wrong!';
    }
    
  };

  return (
    <div id = "NewProjectConsole" className = 'console_element'>
      <h3>Start New Project</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="value1">New Project Name:</label>
        <input
          id="value1"
          type="text"
          value={value1}
          onChange={(event) => setValue1(event.target.value)}
        />
        <br />
        <label htmlFor="value2">TechUser Email:</label>
        <input
          id="value2"
          type="text"
          value={value2}
          onChange={(event) => setValue2(event.target.value)}
        />
        <br />
        <button type="submit">Start Project</button>
      </form>
      <div id = "subbmit_resoult"></div>
    </div>
  );
}

export default StartNewProject;