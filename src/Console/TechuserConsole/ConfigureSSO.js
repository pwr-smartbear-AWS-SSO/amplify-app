import React, {useState} from 'react';
import { API } from 'aws-amplify';


function ConfigureSSO({projectId, domainUrl, domainPrefix, project_name, clients}){
    const [displayFileOption, setDisplayFileOption] = useState(false);
    const [metadataFile, setMetadataFile] = useState();
    const [metadataURL, setMetadataURL] = useState('');


    const [attributes, setAttributes] = useState([]);
    const [newAttribute, setNewAttribute] = useState("");
    const [newMapping, setNewMapping] = useState("");

    const addAttribute = () => {
        if (newAttribute.trim() === "" || newMapping.trim() === "") return;
        
        setAttributes((prev) => [    ...prev,     { id: prev.length, name: newAttribute, mapping: newMapping }  ]);
        setNewAttribute("");
        setNewMapping("");
    };

    const deleteAttribute = (id) => {
        setAttributes((prev) => prev.filter((attr) => attr.id !== id));
    };
        
    const handleMappingChange = (e) => {
        setNewMapping(e.target.value);
    };
        
    const handleAttributeSelect = (e) => {
        setNewAttribute(e.target.value);
    };
        


    const [inputValue, setInputValue] = useState('');
    const [tableData, setTableData] = useState([]);

    const handleAddClick = () => {
        setTableData([...tableData, inputValue]);
        setInputValue('');
    };

    const handleDeleteClick = (index) => {
        setTableData((prevData) => prevData.filter((_, i) => i !== index));
    };
    

    const projectUri = "urn:amazon:cognito:sp:"+projectId;

    const submitResoult = document.getElementById("subbmit_resoult_"+project_name);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const attributeMap = {};
        attributes.forEach((attr) => {
        attributeMap[attr.name] = attr.mapping;
        });
        console.log(attributeMap);

        try { 
            const SSOconfigPath = '/AddIdentityProvider/'+projectId+'/'+project_name;
            if (displayFileOption) {
                const formData = new FormData();
                formData.append('file', metadataFile, 'metadata_xml_file');

                const response = await API.post('OurApiAmplifyProject', SSOconfigPath, {
                    body: {
                        metadataMethod: 'xml_file',
                        metadata: formData,
                        attributesMap: attributeMap,
                        idpIdentifiers: tableData,
                        clientIds: clients
                    }
                });

                console.log(response);

            } else {
                const response = await API.post('OurApiAmplifyProject', SSOconfigPath, {
                    body: {
                        metadataMethod: 'url',
                        metadata: metadataURL,
                        attributesMap: attributeMap,
                        idpIdentifiers: tableData,
                        clientIds: clients
                    }
                });

                console.log(response);

            }
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
                    <td>{domainUrl+'/saml2/idpresponse'}</td>
                </tr>
                <tr>
                    <th>Audience URI</th>
                    <td>{projectUri}</td>
                </tr>
            </table>

            <br />

            <label className='sso_checkbox'>
                <input
                type="checkbox"
                checked={!displayFileOption}
                onChange={toggleFileOption}
                />
                configure with URL
            </label>

            <label className='sso_checkbox'>
                <input
                type="checkbox"
                checked={displayFileOption}
                onChange={toggleFileOption}
                />
                configure with XML file
            </label>

            <br />
            <br />

            <form onSubmit={handleSubmit}>

                <div>
                    <table className="domainsBox">
                        <thead>
                            <tr>
                            <th>Identifiers</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((value, index) => (
                            <tr key={index}>
                                <td>{value}</td>
                                <td className="td_with_delete_button"><button type="button" onClick={() => handleDeleteClick(index)}>Delete</button></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='inputbox'>
                        <label htmlFor="identifier">Domain / Company Identifier:</label>
                        <input
                        id="identifier"
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button type="button" onClick={handleAddClick}>Add</button>
                        <p>Leave empty to allow any @example.com</p>
                    </div>
                </div>

                <div className='inputbox'>
                    <div className={!displayFileOption ? "visible" : "hidden"}>
                        <label htmlFor="metadataURL">URL:</label>
                        <input 
                        id = "metadataURL"
                        value={metadataURL}
                        onChange={(event) => setMetadataURL(event.target.value)}
                        />
                    </div>
                </div>

                <div className='inputbox' id ="upload_file_button">
                    <div className={displayFileOption ? "visible" : "hidden"}>
                        <label>XML file:</label>
                        <input
                        type="file"
                        accept=".xml"
                        id="upload-file"
                        onChange={(event) => setMetadataFile(event.target.files[0])}
                        />
                    </div>
                </div>

                
                <table className="attributesBox">
                    <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Mapping</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {attributes.map((attr, index) => (
                        <tr key={index}>
                            <td>{attr.name}</td>
                            <td>{attr.mapping}</td>
                            <td className="td_with_delete_button"><button type="button" onClick={() => deleteAttribute(attr.id)}>Delete</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>


                <div>
                    <select value={newAttribute} onChange={handleAttributeSelect}>
                    <option value="">Select an attribute</option>
                    <option value="email">Email</option>
                    <option value="email_verified">Email Verified</option>
                    <option value="phone_number">Phone Number</option>
                    <option value="phone_number_verified">Phone Number Verified</option>
                    <option value="given_name">Given Name</option>
                    <option value="middle_name">Middle Name</option>
                    <option value="family_name">Family Name</option>
                    <option value="name">Name</option>
                    <option value="nickname">Nickname</option>
                    <option value="username">Username</option>
                    <option value="prefered_username">Prefered Username</option>
                    <option value="address">Addrress</option>
                    <option value="birthdate">Birthdate</option>

                    </select>
                    <input
                    type="text"
                    value={newMapping}
                    onChange={handleMappingChange}
                    placeholder="Enter mapping"
                    />
                    <button type="button" onClick={addAttribute}>Add Attribute</button>
                </div>
                <br />
                <button type="submit">Submit SSO</button>
            </form>
            <div id = {"subbmit_resoult_"+project_name}></div>
            <br />
            <div className='client_buttons'>
                <div className="console_element_header"><h3>Client links:</h3></div>
            
                <a href={"https://"+domainPrefix+".auth.eu-central-1.amazoncognito.com/oauth2/authorize?client_id="+clients[0]+"&response_type=code&scope=email+openid+profile&redirect_uri=https%3A%2F%2Fjwt.io%2F"} target="_blank">
                    <button type="button">Client1 - code</button>
                </a>
                <a href={"https://"+domainPrefix+".auth.eu-central-1.amazoncognito.com/oauth2/authorize?client_id="+clients[1]+"&response_type=token&scope=email+openid+profile&redirect_uri=https%3A%2F%2Fjwt.io%2F"} target="_blank">
                    <button type="button">Client2 - implicit</button>
                </a>
            </div>
        </>
    )
}

export default ConfigureSSO;





