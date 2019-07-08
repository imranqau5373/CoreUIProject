import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, Col, Row } from 'reactstrap';
import axios from 'axios';


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      userBalance : "0",
      userDisplayBalance : "0",
      userName : "",
      userCurrency : ""
    };

    this.onloadUserDetails = this.onloadUserDetails.bind(this);
    this.convertUSD = this.convertUSD.bind(this);
    this.convertEUR = this.convertEUR.bind(this);
  
  }

  componentDidMount() {
    window.addEventListener('load', this.onloadUserDetails);
    //this.onloadUserDetails();
 }



  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onloadUserDetails(){

    let userData  = {};
    userData.userId = localStorage.getItem("loginId");
    userData.userName = localStorage.getItem("userName");
   
        axios.post('http://localhost:3001/users/details', {
          headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
          },
          body: userData
      })
      .then((myJson) => {
             let balance_number = myJson.data.details[0].main_detail[0].balance_number[0];
             balance_number = parseFloat(balance_number).toFixed(2);
             this.setState({
              userBalance: balance_number,
              userDisplayBalance : balance_number,
            });
             
             
      });
  }

  //function convert currency to USD
  convertUSD(){
    try {
      axios.get('http://localhost:3001/users/getcurrency?amount='+this.state.userBalance, {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        body: ""
    })
    .then(myJson => {
      let balance_number = myJson.data;
      balance_number = parseFloat(balance_number).toFixed(2);
      this.setState({
        userDisplayBalance : balance_number,
     });

    });

    } catch (e) {
      alert(e.message);
    }
  }

    //function set default balance of the user.
    convertEUR(){
      this.setState({
        userDisplayBalance: this.state.userBalance,
      });
    }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <Breadcrumb>
                  <BreadcrumbItem active className="display-4"></BreadcrumbItem>  
                  <h1 className="display-3">Wholesale Voip Provider Portal</h1>
            
            
                  
                </Breadcrumb>
                <Breadcrumb tag="nav">
                <h3>Quick Stats </h3> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={this.convertUSD}>USD</a> |       <a href="#" onClick={this.convertEUR}>EUR</a>
                </Breadcrumb>
                <Breadcrumb tag="nav">
                <h4>Finances:</h4>
                </Breadcrumb>
                <Breadcrumb tag="nav">
                <h4>Account:</h4>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <h4>Prepaid:</h4> 
                </Breadcrumb>
                <Breadcrumb tag="nav">
                <h4>Balance:</h4>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <h4>{this.state.userDisplayBalance}</h4> 
                </Breadcrumb>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    //   <Row>
    //           <Col>
    //   <Card>
    //     <CardBody>
    //       <Jumbotron>
    //         <h1 className="display-3">Hello, world!</h1>
    //         <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra
    //           attention to featured content or information.</p>
    //         <hr className="my-2" />
    //         <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
    //         <p className="lead">
    //           <Button color="primary">Learn More</Button>
    //         </p>
    //       </Jumbotron>
    //     </CardBody>
    //   </Card>
    // </Col>
    // </Row>

    );
  }
}

export default Dashboard;
