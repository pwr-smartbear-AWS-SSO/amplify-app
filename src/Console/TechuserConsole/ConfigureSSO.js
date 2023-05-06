import React, {useState} from 'react';
import { API } from 'aws-amplify';


function ConfigureSSO({projectId, domainUrl, project_name}){
    const [secret, setSecret] = useState('');
    const [displayFileOption, setDisplayFileOption] = useState(false);
    const [emailAttrMap, setEmailAttrMap] = useState('email');
    const [metadataFile, setMetadataFile] = useState();
    const [metadataURL, setMetadataURL] = useState('');

    const projectUri = "urn:amazon:cognito:sp:"+projectId;

    const submitResoult = document.getElementById('subbmit_resoult');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try { 
            const formData = new FormData();
            formData.append('file', metadataFile, 'metadata_xml_file');

            const SSOconfigPath = '/AddIdentityProvider/'+projectId+'/'+project_name;
            await API.post('OurApiAmplifyProject', SSOconfigPath, {body: formData});
            console.log('Lambda function executed successfully.');
            submitResoult.textContent = 'SSO configured succefully';
          
        } catch (error) {
            console.error('SSO configuration failed!');
            console.error(error);
            submitResoult.textContent = 'Something went wrong!';
        }
    };

    const toggleFileOption = () => {
        setDisplayFileOption(!displayFileOption);
      };
      
    return(
        <>
            <table>
                <tr>
                    <th>Single sign on URL</th>
                    <td>{domainUrl}</td>
                </tr>
                <tr>
                    <th>Audience URI</th>
                    <td>{projectUri}</td>
                </tr>
            </table>

            <label className='sso_checkbox'>
                <input
                type="checkbox"
                checked={displayFileOption}
                onChange={toggleFileOption}
                />
                cnofigure with URL
            </label>

            <label className='sso_checkbox'>
                <input
                type="checkbox"
                checked={!displayFileOption}
                onChange={toggleFileOption}
                />
                cnofigure with XML file
            </label>

            <br />
            <br />

            <form onSubmit={handleSubmit}>
                <div className='inputbox'>
                    <label htmlFor="secret">SSO secret key:</label>
                    <input
                    id="secret"
                    type="password"
                    value={secret}
                    onChange={(event) => setSecret(event.target.value)}
                    />
                </div>

                <div className='inputbox'>
                    <div className={displayFileOption ? "visible" : "hidden"}>
                        <label htmlFor="metadataURL">URL:</label>
                        <input 
                        id = "metadataURL"
                        value={metadataURL}
                        onChange={(event) => setMetadataURL(event.target.value)}
                        />
                    </div>
                </div>

                <div className='inputbox' id ="upload_file_button">
                    <div className={!displayFileOption ? "visible" : "hidden"}>
                        <label>XML file:</label>
                        <input
                        type="file"
                        accept=".xml"
                        id="upload-file"
                        onChange={(event) => setMetadataFile(event.target.files[0])}
                        />
                    </div>
                </div>

                <div className='inputbox'>
                    <label>Email attribute mapping:</label>
                    <input
                    type="text"
                    value = {emailAttrMap}
                    onChange={(event) => setEmailAttrMap(event.target.value)}
                    />
                </div>

                <button type="submit">Submit SSO</button>
            </form>
            <div id = "subbmit_resoult"></div>
        </>
    )
}

export default ConfigureSSO;
