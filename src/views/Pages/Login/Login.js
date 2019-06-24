import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {

  constructor(props) {
    super(props);
    debugger;
    let loginId = localStorage.getItem("loginId");
    if(loginId != null){
      window.location.href = "#/dashboard";
    }
    
    this.state = {
      email: "",
      password: ""
    };

    
    }

    validateForm() {
      debugger;
      return this.state.email.length > 0 && this.state.password.length > 0;
    }
  
    handleChange = event => {
      this.setState({
        
        [event.target.id]: event.target.value
      });
    }
  
    handleSubmit = event => {
      event.preventDefault();
      try {
        let formData  = {};
        formData.email = this.state.email;
        formData.password = this.state.password;
        var loginData = 'username='+formData.email+'&password='+formData.password;

      axios.post('http://mor-api-implement.herokuapp.com/users/login', {
          headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
          },
          body: loginData
      })
      .then(function (myJson) {
             console.log(myJson);
          if(myJson.status){
            localStorage.removeItem("loginId");
            localStorage.setItem('loginId',myJson.loginId);
            window.location.href = "#/dashboard";
            
          }
          else{
            alert('Invalid username or password.');
          }
      })
      .catch(function (error) {
        console.log(error);
      });
      } catch (e) {
        alert(e.message);
      }
    }




  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Welcome to SignPage new one.</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="email" placeholder="Username" autoComplete="username" name="username"
                            value={this.state.email}
                            onChange={this.handleChange}
                        
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="password" placeholder="Password" autoComplete="current-password" 
                        name="password"     value={this.state.password}
                        onChange={this.handleChange}
                        
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" disabled={!this.validateForm()} type="submit">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
