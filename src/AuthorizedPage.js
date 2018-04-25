import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class AuthorizedPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      user: localStorage.getItem('name')
    }

    // Adding credentials 'include' will send our cookies along with the request

  }

  componentDidMount() {
    fetch(
      'http://localhost:3001/get-secret-data',
      {
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      .then(response => response.json())
      .then(result => {
        try {
          document.getElementById('data').innerText = result.data;
        } catch(e) { }
      });
  }

  render() {

    if (!this.state.user) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <p>If you are seeing this page that means you are logged in.</p>
        Secret Data: <p id='data'></p>
      </div>
    )
  }
}
