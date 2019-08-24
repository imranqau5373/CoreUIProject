import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Button,Modal,ModalBody,ModalFooter,ModalHeader,Input,InputGroup } from 'reactstrap';
import axios from 'axios';
var config = require('../config');

class sip extends Component {



    constructor(props) {
        super(props);
    
        this.state = {
            deviceData : [],
            modal: false,
            selectedDeviceId : '',
            ipAddress : ''
        };
        this.toggle = this.toggle.bind(this);
        this.onLoadSIPDevices = this.onLoadSIPDevices.bind(this);
        this.addIPAddress = this.addIPAddress.bind(this);
        this.addDevice = this.addDevice.bind(this);
      
      }

      componentDidMount() {
        //window.addEventListener('load', this.onLoadSIPDevices);
        this.onLoadSIPDevices();
     }

     toggle() {
      this.setState({
        modal: !this.state.modal,
      });
    }

    handleChange = event => {
      this.setState({
        
        [event.target.id]: event.target.value
      });
    }

    validateForm() {
      return this.state.selectedDeviceId.length > 0 && this.state.ipAddress.length > 0 ;
        }

     addIPAddress(){
      let userData  = {};
      userData.user_id = localStorage.getItem("loginId");
      userData.deviceId = this.state.selectedDeviceId;
      userData.ipAddress = this.state.ipAddress;
      axios.post(config.serverurl+'/sip/addIPAddress', {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        body: userData
    })
    .then((myJson) => {
      this.toggle();
      this.onLoadSIPDevices();
      
    });
     
     }

     addDevice(){
       debugger;
      let userData  = {};
      userData.user_id = localStorage.getItem("loginId");
      axios.post(config.serverurl+'/sip/addDevice', {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        body: userData
    })
    .then((myJson) => {
      //console.log(myJson);
      this.onLoadSIPDevices();
    });
     }
     
     onLoadSIPDevices(){
        let userData  = {};
        userData.user_id = localStorage.getItem("loginId");
        if(userData.user_id != null){
       
          axios.post(config.serverurl+'/sip/sipdevice', {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: userData
        })
        .then((myJson) => {
            this.setState({
              deviceData: myJson.data,
            });
        });
        }
        else{
          window.location.href = "#/login";
        }

      }
     


  render() {

    return (

        <div className="animated fadeIn">
        <Row>
          <Col>
          <CardHeader>

              <h2>SIP Page</h2>
              <Button type="button" size="sm" color="primary" onClick={this.toggle}><i className="fa fa-dot-circle-o" ></i> Add IP Address</Button>&nbsp;&nbsp;
              <Button type="button" size="sm" color="primary" onClick={this.addDevice}><i className="fa fa-dot-circle-o" ></i> Add New Device</Button>&nbsp;&nbsp;
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader toggle={this.toggle}>Add IP Address</ModalHeader>
                  <ModalBody> 
                     <InputGroup className="mb-4">
                        <Input type="select" name="selectedDeviceId" autocomplete="off" id="selectedDeviceId"  onChange={this.handleChange} >
                        <option value=""> Select Device ID </option>

                        {this.state.deviceData.map(( device, index ) => {
                        return (
                          <option value={device.deviceId}> {device.deviceId} </option>
                        );
                        })}
                      </Input>
                    </InputGroup>
                    <InputGroup className="mb-3">
                    <Input type="text" placeholder="Enter IP Address" autoComplete="IP Address" id="ipAddress" onChange={this.handleChange} />
                    </InputGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" block disabled={!this.validateForm()} onClick={this.addIPAddress}>Save IP Address</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </Modal>
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
