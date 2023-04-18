import { useState } from 'react';
import { API } from 'aws-amplify';

function StartNewProject() {
  const api_name = 'amplifyappbeb3e54a';
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(value1);
    console.log(value2);
    try { //trying to create userpool
      
      console.log(value1);
      console.log(value2);
      const createuserpool_path = '/createuserpool/${value1}';
      const createuserpool_response = await API.post(api_name, createuserpool_path, {});
      console.log(createuserpool_response); //debugging
      const new_user_pool_id = createuserpool_response.data;
      console.log(new_user_pool_id); //debugging
      console.log('Lambda function creating user pool executed successfully.');
      
      try { //trying to create user

        const amplify_pool_id = "eu-central-1_DZgQ3iAsA"
        const createuser_path = '/createuser/${amplify_pool_id}/${value2}';
        const createuser_response = await API.post(api_name, createuser_path, {});
        console.log(createuser_response); //debugging
        const new_user_id = createuser_response.data;
        console.log(new_user_id); //debugging
        console.log('Lambda function creating user executed successfully.');

        try { //trying to add user to tech user group

          const addusertotechusergroup_path = '/addusertotechusergroup/${new_user_id}';
          await API.post(api_name, addusertotechusergroup_path, {});
          console.log('Lambda function adding user to techusers executed successfully.');

          try { // trying to add new item to Dynamo DB

            const additemtodb_path = '/additemtodb/${new_user_id}/${new_user_pool_id}/${value1}';
            await API.post(api_name, additemtodb_path, {});
            console.log('Lambda function adding item to DynamoDB executed successfully.');
            
          } catch (error) { //add item error
            console.error('Adding item to DynamoDB failed!');
            console.error(error);
          }
    
        } catch (error) { //add user to group error
          console.error('Adding user to techusers failed!');
          console.error(error);
        }

      } catch (error) { //create user error
        console.error('Creating User failed!');
        console.error(error);
      }

    } catch (error) { //create userpool error
      console.error('Creating UserPool failed!');
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
    <button onClick={() => API.post('amplifyappbeb3e54a', '/createuserpool/NewTestProject', { body: { data: 'example' } })}>Test api</button>
    </div>
  );
}

export default StartNewProject;
