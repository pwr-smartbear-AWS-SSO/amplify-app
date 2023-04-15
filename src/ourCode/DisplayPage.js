import React, { useState } from 'react';
import StartNewProject from './StartNewProject.js';
function Page1() {
    return(
      <div>
        <h1>Page 1</h1>
      </div>
    )
  }
  
  function Page2() {
    return(
      <div>
        <StartNewProject />
      </div>
    )
  }
  
  function Page3() {
    return(
      <div>
        <h1>Create new integration poiny</h1>
          <input type="text" placeholder="company name/project name"/><br/>
          <input type="text" placeholder="primary email domain"/><br/>
          <input type="text" placeholder="seccendary email domain, coma sreparated"/><br/>
          <br/>
          <input type="text" placeholder="client engineer email"/><br/>
          <button type="button">Do not Click Me!</button><br/>
          <br/>
          <button type="button">Do not Click Me!</button>
      </div>
    )
  }
  
  function Page4() {
    return(
      <div>
        <h1>LIST integrations</h1>
      </div>
    )
  }
  
  function Page5() {
    return(
      <div>
        <h1>Configure integration for project X</h1>
          <input type="text" placeholder="John"/><br/>
          <input type="text" placeholder="John"/>
          <button type="button">Do not Click Me!</button><br/>
          <p>OR</p>
          <input type="text" placeholder="John"/><br/>
          <br/>
          <p>Configure attribue mapping</p>
          <label for="input_email_at">Email attribute - required</label>
          <input type="text" id="input_email_at" placeholder="email attribute"/><br/>
          <label>First name</label>
          <input type="text" placeholder="first name"/><br/>
          <label>last name</label>
          <input type="text" placeholder="last name"/><br/>
          <label>phone</label>
          <input type="text" placeholder="phone"/><br/>
          <br/>
          <button type="button">Do not Click Me!</button><br/>
          <button type="button">Do not Click Me!</button><br/>
          <button type="button">Do not Click Me!</button><br/>
      </div>
    )
  }
  
  class DisplayPage extends React.Component {
    state = {
      page_id: 1
    }
    render() {
      return(
        <div className='App'>
          <button type="button" onClick={() => this.setState({ page_id: 1 })}>Click Me!</button>
          <button type="button" onClick={() => this.setState({ page_id: 2 })}>Click Me!</button>
          <button type="button" onClick={() => this.setState({ page_id: 3 })}>Click Me!</button>
          <button type="button" onClick={() => this.setState({ page_id: 4 })}>Click Me!</button>
          <button type="button" onClick={() => this.setState({ page_id: 5 })}>Click Me!</button>
          
          {this.state.page_id == 1 ? <Page1 /> : null}
          {this.state.page_id == 2 ? <Page2 /> : null}
          {this.state.page_id == 3 ? <Page3 /> : null}
          {this.state.page_id == 4 ? <Page4 /> : null}
          {this.state.page_id == 5 ? <Page5 /> : null}
        </div>
      )
    }
  }
  
  export default DisplayPage;