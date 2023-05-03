import React, {useState} from 'react';


function ConfigureSSO(){
    const [secret, setSecret] = useState('');
    const [displayFileOption, setDisplayFileOption] = useState(false);
    const [emailAttrMap, setEmailAttrMap] = useState('email');
    const [metadataFile, setMetadataFile] = useState();
    const [metadataURL, setMetadataURL] = useState('');

    const toggleFileOption = () => {
        setDisplayFileOption(!displayFileOption);
      };
      
    return(
        <>

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

            <form>
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

        </>
    )
}

export default ConfigureSSO;
