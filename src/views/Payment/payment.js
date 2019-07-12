import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, FormGroup, Label, Input, Row,Button } from 'reactstrap';
import axios from 'axios';

class payment extends Component {



    constructor(props) {
        super(props);
    
        this.state = {
            paymentInformation : [],
            amount : "50",
            currency : "USD",
            userid : ""
        };

        this.paypalcheckout = this.paypalcheckout.bind(this);
    
        // this.onLoadSIPDevices = this.onLoadSIPDevices.bind(this);
      
      }

      paypalcheckout(){
        let checkoutData  = {};
        checkoutData.userId = "179";
        checkoutData.currency = this.state.currency;
        checkoutData.amount = this.state.amount;
       debugger;
            axios.post('https://mor-api-implement.herokuapp.com/payment', {
              headers: {
                  'content-type': 'application/x-www-form-urlencoded',
                  'Accept': 'application/json'
              },
              body: checkoutData
          })
          .then((myJson) => {
            console.log(myJson);
            window.location.href = myJson.data;
                 
                 
          });
      }

      validateForm() {

      }
    
      handleChange = event => {
        debugger;
        this.setState({
          [event.target.id]: event.target.value
        });
      }




     


  render() {

    return (
<div className="animated fadeIn">
        
        <Card>
        <CardHeader>
              <h3>Welcome To Payment Page</h3>
              </CardHeader>

              <CardBody>
              <FormGroup>
          <Label for="exampleSelect">Select Amount</Label>
          <Input type="select" name="select" id="amount" onChange={this.handleChange}>
          <option value="50">50</option>
                              <option value="100">100</option>
                              <option value="150">150</option>
                              <option value="200">200</option>
                              <option value="250">250</option>
                              <option value="300">300</option>
                              <option value="350">350</option>
                              <option value="400">400</option>
                              <option value="450">450</option>
                              <option value="500">500</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Select Currency</Label>
          <Input type="select" name="select" id="currency"  onChange={this.handleChange}>
          <option value="USD">US-Dollar</option>
                              <option value="EUR">Euro</option>
          </Input>
        
        </FormGroup>
        <Row className="align-items-center">
              <Col col="12"  xl className="mb-3 mb-xl-0 col">
                <Button block color="primary btn-lg"  onClick={this.paypalcheckout} >Paypal Checkout</Button>
              </Col>

              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
               
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
         
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
          
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
          
          </Col>
            </Row>
              </CardBody>
          </Card>

     
     


      </div>

    );
  }
}

export default payment;
