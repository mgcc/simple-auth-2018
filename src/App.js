import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';

import Home from './Home';
import AuthorizedPage from './AuthorizedPage';
import './App.css';

/**
 * CLIENT TASKS
 *
 * 1. Store the auth token received from the server
 * 2. Send the auth token to the server when trying to access pages/resources that require authentication
 *
 */

export default class App extends Component {
  constructor() {
    super();

    this.user = localStorage.getItem('name');

    this.state = {
      user: localStorage.getItem('name')
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(e) {
    e.preventDefault();
    const data = {
      username: document.getElementById('login-username').value,
      password: document.getElementById('login-password').value
    }

    fetch('http://localhost:3001/login',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(result => {
        alert(result.message);
        if (result.success) {
          // Set username to state, then save token somewhere
          this.setState({ user: result.userData.name });
          localStorage.setItem('name', result.userData.name)

          const cookies = new Cookies();

          cookies.set(
            'auth-token',
            result.token,
            {
              path: 'localhost:3001/',
              maxAge: 60 * 120 // 2 hours
            });
        }
      });
  }

  logout(e) {
    e.preventDefault();
    const cookies = new Cookies();
    cookies.remove('auth-token');

    localStorage.removeItem('name');
    this.setState({ user: '' });
  }

  render() {
    return (
      <div>
        <div id="header">
          <span className="title-text">Simple Auth Demo</span>
          <span className="links">
            <a href="/">Home</a>
            <a href="/auth">Auth</a>
          </span>
          <span className="log-in-form">
            {
              this.state.user ?
              (<span>
                {this.state.user} <button onClick={this.logout}>Log Out</button>
              </span>) :
              (<span>
                <input id="login-username" type="text" placeholder="username" size="15"/> &nbsp;
                <input id="login-password" type="password" placeholder="password" size="15"/>&nbsp;
                <button onClick={this.login}>Log In</button>
              </span>)
            }
          </span>
        </div>

        <div id="content">
          <Router>
            <div>
              <Route path="/" exact component={Home} />
              <Route path="/auth" exact component={AuthorizedPage} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}
