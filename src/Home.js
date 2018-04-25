import React, { Component } from 'react';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ''
    }

    this.signup = this.signup.bind(this);
  }

  signup(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    fetch('http://localhost:3001/signup',
      {
        method: 'POST',
        body: JSON.stringify({ username, password, name }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(result => {
        alert(result.message);
      });
  }

  render() {
    return (
      <div>
        {
          this.state.user ? 'Welcome user!' :
          (
            <div>
              <div id="sign-up">
                <form>
                  <input id="username" type="text" placeholder="username" /><br />
                  <input id="password" type="password" placeholder="password" /><br />
                  <input id="name" type="text" placeholder="Name" /><br />
                  <button onClick={this.signup}>Sign Up</button>
                </form>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}
