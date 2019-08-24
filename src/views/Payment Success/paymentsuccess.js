import React, { Component } from 'react';
import {  Card, CardBody, CardHeader,  } from 'reactstrap';
import payment from '../Payment/payment';
import axios from 'axios';
var config = require('../config');

class paymentsuccess extends Component {



    constructor(props) {
        super(props);
    
        this.state = {

          paymentId : "",
          userId : "",
          payerId : ""


        };


        this.onLoadUserBalance = this.onLoadUserBalance.bind(this);
      }

      
  componentDidMount() {
    window.addEventListener('load', this.onLoadUserBalance);
 }


 onLoadUserBalance(){
   debugger;
   let paymentInfo = {};
   paymentInfo.userId = localStorage.getItem("loginId");
   let currentUrl = window.location.href;
   paymentInfo.paymentId = /paymentId=([^&]+)/.exec(currentUrl)[1];
   paymentInfo.payerId = /PayerID=([^&]+)/.exec(currentUrl)[1];
   if(paymentInfo.payerId != null && paymentInfo.payerId != undefined){
    axios.post(config.paymenturl+'/payment/successPayment', {
      headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
      },
      body: paymentInfo
    })
    .then((myJson) => {
      window.location.href = "#/paymentsuccess";
  });
   }




 }

 

  




     


  render() {

    return (
<div className="animated fadeIn">
        
        <Card>
        <CardHeader>
              <h3>Payment is successfully created.</h3>
              </CardHeader>

              <CardBody>
    
              </CardBody>
          </Card>

     
     


      </div>

    );
  }
}

export default paymentsuccess;
