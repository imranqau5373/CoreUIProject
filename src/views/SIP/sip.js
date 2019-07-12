import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import axios from 'axios';

class sip extends Component {



    constructor(props) {
        super(props);
    
        this.state = {
            deviceData : []
        };
    
        this.onLoadSIPDevices = this.onLoadSIPDevices.bind(this);
      
      }

      componentDidMount() {
        window.addEventListener('load', this.onLoadSIPDevices);
        //this.onloadUserDetails();
     }
     
     onLoadSIPDevices(){
         debugger;
        let userData  = {};
        userData.user_id = localStorage.getItem("loginId");
       
            axios.post('https://mor-api-implement.herokuapp.com/sip/sipdevice', {
              headers: {
                  'content-type': 'application/x-www-form-urlencoded',
                  'Accept': 'application/json'
              },
              body: userData
          })
          .then((myJson) => {
              console.log(myJson);
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

export default sip;
