import React, { Component } from 'react';
import { Card, CardHeader,Row,Col,CardBody,Table } from 'reactstrap';
import axios from 'axios';
var config = require('../config');

class callrecords extends Component {



    constructor(props) {
        super(props);
    
        this.state = {
          callRecords : []
        };
    
        this.onLoadCallRecords = this.onLoadCallRecords.bind(this);
      
      }

      componentDidMount() {
        //window.addEventListener('load', this.onLoadCallRecords);
        this.onLoadCallRecords();


     }

      onLoadCallRecords(){
        let callrecords  = {};
        callrecords.userId = localStorage.getItem("loginId");
        callrecords.userName = localStorage.getItem("userName");
        callrecords.startDate = new Date();
        callrecords.endDate = new Date();
        callrecords.endDate.setDate(callrecords.endDate.getDate() - 30);
            axios.post(config.serverurl+'/callrecords', {
              headers: {
                  'content-type': 'application/x-www-form-urlencoded',
                  'Accept': 'application/json'
              },
              body: callrecords
          })
          .then((myJson) => {
            debugger;
            if(myJson.data.page.calls_stat[0].calls)
            {
              this.setState({
                callRecords: myJson.page.calls_stat[0].calls[0].call,
              });
            }
            else{
                alert('no call record found.');
            }
          });
      }  


     


  render() {

    return (

      <div className="animated fadeIn">
      <Row>
        <Col>
        <CardHeader>
            <h3>Call Records of Last 30 Days</h3>
            </CardHeader>
          <Card>
            <CardBody>
            <Table hover bordered striped responsive size="sm">
                <thead>
                <tr>
                  <th>Destination</th>
                  <th>Response</th>
                  <th>Date/Tiime</th>
                  <th>Charged Time</th>
                  <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {this.state.callRecords.map(( call, index ) => {
                  return (
                      <tr>
                      <td>{call.destination[0]}</td>
                      <td>{call.dispod[0]}</td>
                      <td>{call.calldate2[0]}</td>
                      <td>{call.nice_billsec[0]}</td>
                      <td>{call.user_price[0]}</td>
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

export default callrecords;
