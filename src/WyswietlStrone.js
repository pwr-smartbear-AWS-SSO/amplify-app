import React from 'react';

function Strona1() {
    return(
      <div>
        <h1>Siema Świecie!</h1>
      </div>
    )
  }
  
  function Strona2() {
    return(
      <div>
      <h1>Customer care view</h1>
          <button type="button">Do not Click Me!</button><br/>
          <input type="text" placeholder="John"/><br/>
          <input type="text" placeholder="John"/>
      </div>
    )
  }
  
  function Strona3() {
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
  
  function Strona4() {
    return(
      <div>
        <h1>LISt integrations</h1>
      </div>
    )
  }
  
  function Strona5() {
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
  
  class WyswietlStrone extends React.Component {
    state = {
      id_strony: 1
    }
    render() {
      return(
        <div className='App'>
          <button type="button" onClick={() => this.setState({ id_strony: 1 })}>Click Me!</button>
          <button type="button" onClick={() => this.setState({ id_strony: 2 })}>Click Me!</button>
          <button type="button" onClick={() => this.setState({ id_strony: 3 })}>Click Me!</button>
          <button type="button" onClick={() => this.setState({ id_strony: 4 })}>Click Me!</button>
          <button type="button" onClick={() => this.setState({ id_strony: 5 })}>Click Me!</button>
          
          {this.state.id_strony == 1 ? <Strona1 /> : null}
          {this.state.id_strony == 2 ? <Strona2 /> : null}
          {this.state.id_strony == 3 ? <Strona3 /> : null}
          {this.state.id_strony == 4 ? <Strona4 /> : null}
          {this.state.id_strony == 5 ? <Strona5 /> : null}
        </div>
      )
    }
  }
  
  export default WyswietlStrone;