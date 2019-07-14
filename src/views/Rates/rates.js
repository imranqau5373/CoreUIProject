import React, { Component } from 'react';
import { Card, CardHeader, Col, Row } from 'reactstrap';
// var config = require('../config');

class rates extends Component {



    constructor(props) {
        super(props);
    
        this.state = {
            deviceData : []
        };
      
      }
     


  render() {

    return (

        <div className="animated fadeIn">
        <Row>
          <Col>
          <CardHeader>
              <h3>Rates Page</h3>
              </CardHeader>
            <Card>
            </Card>
          </Col>
        </Row>


      </div>

    );
  }
}

export default rates;
