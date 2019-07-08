import React, { Component } from 'react';
import axios from 'axios';

class callrecords extends Component {



    constructor(props) {
        super(props);
    
        this.state = {
            callrecords : []
        };
    
        // this.onLoadSIPDevices = this.onLoadSIPDevices.bind(this);
      
      }


     


  render() {

    return (
        <h2>Welcome to Call Records Page</h2>

    );
  }
}

export default callrecords;
