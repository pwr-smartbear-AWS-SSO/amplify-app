import { useState } from 'react';
import { API } from 'aws-amplify';

function StartNewProject() {
  const api_name = 'OurApiAmplifyProject';
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const path = '/createuserpool/${value1}';
      await API.post(api_name, path, {});
      console.log('Lambda function executed successfully.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id = "NewProjectConsole">
      <h2>Start New Project</h2>
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
    </div>
  );
}

export default StartNewProject;
