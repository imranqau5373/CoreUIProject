import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';
var config = require('../config');

class user extends Component {



    constructor(props) {
        super(props);
    
        this.state = {
            deviceData : []
        };
    
        this.onLoadUserDetails = this.onLoadUserDetails.bind(this);
      
      }

      componentDidMount() {
        window.addEventListener('load', this.onLoadUserDetails);
        //this.onloadUserDetails();
     }
     
     onLoadUserDetails(){
         debugger;
        let userData  = {};
        userData.userId = localStorage.getItem("loginId");
        userData.userName = localStorage.getItem("userName");
            axios.post(config.serverurl+'/users/details', {
              headers: {
                  'content-type': 'application/x-www-form-urlencoded',
                  'Accept': 'application/json'
              },
              body: userData
          })
          .then((myJson) => {
              debugger;
              this.setState({
                deviceData: myJson.data,
              });
          });
      }
     


  render() {

    return (

        <div className="animated fadeIn">
        <Row>
          <Col>
          <CardHeader>
              <h3>SIP Page</h3>
              </CardHeader>
            <Card>
              <CardBody>
              <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Device Id</th>
                    <th>Device Type</th>
                    <th>User Name</th>
                    <th>Password</th>
                    <th>IP Address</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.deviceData.map(( device, index ) => {
                    return (
                        <tr>
                        <td>{device.deviceId}</td>
                        <td>{device.devicetype}</td>
                        <td>{device.username}</td>
                        <td>{device.password}</td>
                        <td>{device.ipAddress}</td>
                        </tr>
                    );
                    })}
                  </tbody>
                </Table>
  
              </CardBody>
            </Card>
          </Col>
        </Row>


      </div>

    );
  }
}

export default user;
