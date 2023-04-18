import React, { Component } from 'react';

class Test extends Component {
    state = {
        data: null
      };

      componentDidMount() {
        this.callBackendAPI()
          .then(res => this.setState({ data: res.express }))
          .catch(err => console.log(err));
      }
        // fetching the GET route from the Express server which matches the GET route from server.js
      callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();

        if (response.status !== 200) {
          console.error("a");
          throw Error(body.message) 
        }
        return body;
      };

      render() {
        return (

            <div>
              <h1>Welcome to React</h1>
            <p>{this.state.data}</p>
          </div>
        );
      }
    }

    export default Test;