import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input,InputGroup,Row,Label,FormGroup } from 'reactstrap';
var config = require('../../config');
var Email = require('./smpt');
class Register extends Component {

  constructor(props) {
    super(props);
    let loginId = localStorage.getItem("loginId");
    if(loginId != null){
      window.location.href = "#/dashboard";
    }
    
    this.state = {
      email: "",
      password: "",
      repeatpassword : "",
      firstname : "",
      lastname : "",
      company : "",
      address : "",
      phonenumber : "",
      username : "",
      currency_id: "",
      device_type : "",
      country_id : "0"

    };

    
    }

    validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0 && this.state.username.length > 0
      && this.state.firstname.length > 0;
    }

    sendEmail(email){
      debugger;
      try{

        axios({
          method: 'post',
          url: 'http://voicetermination.net/index.php',
          headers: { 'content-type': 'application/json' },
          data: {
          email: email }
        })
          .then(result => {
            console.log(result);
          })
          .catch(error => this.setState({ error: error.message }));
        } catch (e) {
          alert(e.message);
        }
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
        formData.password2 = this.state.repeatpassword;
        formData.company = this.state.company;
        formData.firstname = this.state.firstname;
        formData.lastname =this.state.lastname;
        formData.username =this.state.username;
        formData.phonenumber = this.state.phonenumber;
        formData.currency_id = this.state.currency_id;
        formData.device_type = this.state.device_type;
        formData.country_id = this.state.country_id;

        axios.post(config.serverurl+'/users/register', {
          headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
          },
          body: formData
      })
      .then(function (myJson) {
             console.log(myJson);
          if(myJson.data.status[0].error){

            alert(myJson.data.status[0].error[0]);
          }
          else{
            alert("Registration Successfully. Please login again.");
            try{

              axios({
                method: 'post',
                url: 'http://voicetermination.net/index.php',
                headers: { 'content-type': 'application/json' },
                data: {
                email: formData.email }
              })
                .then(result => {
                  console.log(result);
                })
                .catch(error =>  console.log(error));
              } catch (e) {
                alert(e.message);
              }
            window.location.href = "#/login";
          }
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
            <Col md="12" lg="9" xl="9">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
     
                      <Input type="text" placeholder="First Name" id="firstname" autoComplete="firstname" onChange={this.handleChange}/>
                      
                      <Input type="text" placeholder="Last Name" id="lastname" autoComplete="lastname" onChange={this.handleChange} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input type="text" placeholder="Company Name" id="company" autoComplete="companyname" onChange={this.handleChange} />
                      <Input type="number" placeholder="Phone Number" autoComplete="phonenumber" id="phonenumber" onChange={this.handleChange}/>
                     
                    </InputGroup>

                    <InputGroup className="mb-3">
  
                      <Input type="text" placeholder="Username" autoComplete="username" id="username"
                      onChange={this.handleChange} />
                      <Input type="password" id="password" placeholder="Password" autoComplete="password" onChange={this.handleChange} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                     
                      <Input type="password" placeholder="Repeat Password" autoComplete="repeatpassword" id="repeatpassword" onChange={this.handleChange} />
                      <Input type="text" placeholder="Email" id="email" autoComplete="email" onChange={this.handleChange} />
                    </InputGroup>
                   
                    <InputGroup className="mb-3">
                    <Input type="text" placeholder="Address" autoComplete="address" id="address" onChange={this.handleChange} />
                    </InputGroup>
                    <FormGroup className="mb-3" style={{ paddingLeft: '20px' }} >
                    <Label check>
                      <Input type="radio" name="currency_type" id="currency_id" value="1"  onChange={this.handleChange}  />{' '}
                      EUR (Ratelists billing and payment in EUR) <br></br>
                      <Input type="radio" name="currency_type" id="currency_id" value="2" onChange={this.handleChange}  />{' '}
                      USD (Ratelists billing and payment in USD)
                    </Label>
                    </FormGroup>

                    <InputGroup className="mb-3">
                  <Input type="select" name="country_id" autocomplete="off" id="country_id" onChange={this.handleChange} >
                  <option value="" selected="">Select Country</option>
                  <option value="1"> Afghanistan </option>
                  <option value="2"> Albania </option>
                  <option value="3"> Algeria </option>
                  <option value="4"> American Samoa </option>
                  <option value="5"> Andorra </option>
                  <option value="6"> Angola </option>
                  <option value="7"> Anguilla </option>
                  <option value="8"> Antarctica </option>
                  <option value="9"> Antigua And Barbuda </option>
                  <option value="10"> Argentina </option>
                  <option value="11"> Armenia </option>
                  <option value="12"> Aruba </option>
                  <option value="240"> Ascension Island </option>
                  <option value="13"> Australia </option>
                  <option value="14"> Austria </option>
                  <option value="15"> Azerbaijan </option>
                  <option value="16"> Bahamas </option>
                  <option value="17"> Bahrain </option>
                  <option value="18"> Bangladesh </option>
                  <option value="19"> Barbados </option>
                  <option value="20"> Belarus </option>
                  <option value="21"> Belgium </option>
                  <option value="22"> Belize </option>
                  <option value="23"> Benin </option>
                  <option value="24"> Bermuda </option>
                  <option value="25"> Bhutan </option>
                  <option value="26"> Bolivia </option>
                  <option value="27"> Bosnia And Herzegovina </option>
                  <option value="28"> Botswana </option>
                  <option value="30"> Brazil </option>
                  <option value="32"> Brunei Darussalam </option>
                  <option value="33"> Bulgaria </option>
                  <option value="34"> Burkina Faso </option>
                  <option value="35"> Burundi </option>
                  <option value="36"> Cambodia </option>
                  <option value="37"> Cameroon </option>
                  <option value="38"> Canada </option>
                  <option value="39"> Cape Verde </option>
                  <option value="40"> Cayman Islands </option>
                  <option value="41"> Central African Republ </option>
                  <option value="42"> Chad </option>
                  <option value="43"> Chile </option>
                  <option value="44"> China </option>
                  <option value="45"> Christmas Island </option>
                  <option value="46"> Cocos (Keeling) Island </option>
                  <option value="47"> Colombia </option>
                  <option value="48"> Comoros </option>
                  <option value="49"> Congo </option>
                  <option value="50"> Congo, The Democratic  </option>
                  <option value="51"> Cook Islands </option>
                  <option value="52"> Costa Rica </option>
                  <option value="54"> Croatia </option>
                  <option value="55"> Cuba </option>
                  <option value="56"> Cyprus </option>
                  <option value="57"> Czech Republic </option>
                  <option value="58"> Denmark </option>
                  <option value="241"> Diego Garcia </option>
                  <option value="59"> Djibouti </option>
                  <option value="60"> Dominica </option>
                  <option value="61"> Dominican Republic </option>
                  <option value="243"> East Timor </option>
                  <option value="62"> Ecuador </option>
                  <option value="63"> Egypt </option>
                  <option value="64"> El Salvador </option>
                  <option value="251"> Ellipso-3 </option>
                  <option value="250"> Emsat </option>
                  <option value="65"> Equatorial Guinea </option>
                  <option value="66"> Eritrea </option>
                  <option value="67"> Estonia </option>
                  <option value="68"> Ethiopia </option>
                  <option value="259"> Eurosat Satellite </option>
                  <option value="69"> Falkland Islands (Malv </option>
                  <option value="70"> Faroe Islands </option>
                  <option value="71"> Fiji </option>
                  <option value="72"> Finland </option>
                  <option value="73" selected=""> France </option>
                  <option value="74"> French Guiana </option>
                  <option value="75"> French Polynesia </option>
                  <option value="77"> Gabon </option>
                  <option value="78"> Gambia </option>
                  <option value="79"> Georgia </option>
                  <option value="80"> Germany </option>
                  <option value="81"> Ghana </option>
                  <option value="82"> Gibraltar </option>
                  <option value="252"> Globalstar </option>
                  <option value="83"> Greece </option>
                  <option value="84"> Greenland </option>
                  <option value="85"> Grenada </option>
                  <option value="86"> Guadeloupe </option>
                  <option value="87"> Guam </option>
                  <option value="88"> Guatemala </option>
                  <option value="89"> Guinea </option>
                  <option value="90"> Guinea-Bissau </option>
                  <option value="91"> Guyana </option>
                  <option value="92"> Haiti </option>
                  <option value="95"> Honduras </option>
                  <option value="96"> Hong Kong </option>
                  <option value="97"> Hungary </option>
                  <option value="98"> Iceland </option>
                  <option value="99"> India </option>
                  <option value="100"> Indonesia </option>
                  <option value="242"> Inmarsat </option>
                  <option value="257"> International Networks </option>
                  <option value="101"> Iran </option>
                  <option value="102"> Iraq </option>
                  <option value="103"> Ireland </option>
                  <option value="246"> Iridium </option>
                  <option value="104"> Israel </option>
                  <option value="105"> Italy </option>
                  <option value="258"> ITPCS </option>
                  <option value="53"> Ivory Cost </option>
                  <option value="106"> Jamaica </option>
                  <option value="107"> Japan </option>
                  <option value="108"> Jordan </option>
                  <option value="109"> Kazakhstan </option>
                  <option value="110"> Kenya </option>
                  <option value="111"> Kiribati </option>
                  <option value="254"> Kosovo </option>
                  <option value="114"> Kuwait </option>
                  <option value="115"> Kyrgyzstan </option>
                  <option value="116"> Laos </option>
                  <option value="117"> Latvia </option>
                  <option value="118"> Lebanon </option>
                  <option value="119"> Lesotho </option>
                  <option value="120"> Liberia </option>
                  <option value="121"> Libyan Arab Jamahiriya </option>
                  <option value="122"> Liechtenstein </option>
                  <option value="123"> Lithuania </option>
                  <option value="124"> Luxembourg </option>
                  <option value="125"> Macao </option>
                  <option value="126"> Macedonia </option>
                  <option value="127"> Madagascar </option>
                  <option value="128"> Malawi </option>
                  <option value="129"> Malaysia </option>
                  <option value="130"> Maldives </option>
                  <option value="131"> Mali </option>
                  <option value="132"> Malta </option>
                  <option value="133"> Marshall islands </option>
                  <option value="134"> Martinique </option>
                  <option value="135"> Mauritania </option>
                  <option value="136"> Mauritius </option>
                  <option value="137"> Mayotte </option>
                  <option value="138"> Mexico </option>
                  <option value="139"> Micronesia </option>
                  <option value="140"> Moldova </option>
                  <option value="141"> Monaco </option>
                  <option value="142"> Mongolia </option>
                  <option value="253"> Montenegro </option>
                  <option value="143"> Montserrat </option>
                  <option value="144"> Morocco </option>
                  <option value="145"> Mozambique </option>
                  <option value="146"> Myanmar </option>
                  <option value="147"> Namibia </option>
                  <option value="148"> Nauru </option>
                  <option value="149"> Nepal </option>
                  <option value="150"> Netherlands </option>
                  <option value="151"> Netherlands Antilles </option>
                  <option value="152"> New Caledonia </option>
                  <option value="153"> New Zealand </option>
                  <option value="154"> Nicaragua </option>
                  <option value="155"> Niger </option>
                  <option value="156"> Nigeria </option>
                  <option value="157"> Niue </option>
                  <option value="158"> Norfolk Island </option>
                  <option value="112"> North Korea </option>
                  <option value="159"> Northern Mariana Islan </option>
                  <option value="160"> Norway </option>
                  <option value="161"> Oman </option>
                  <option value="162"> Pakistan </option>
                  <option value="163"> Palau </option>
                  <option value="164"> Palestine </option>
                  <option value="165"> Panama </option>
                  <option value="166"> Papua New Guinea </option>
                  <option value="167"> Paraguay </option>
                  <option value="168"> Peru </option>
                  <option value="169"> Philippines </option>
                  <option value="171"> Poland </option>
                  <option value="172"> Portugal </option>
                  <option value="173"> Puerto Rico </option>
                  <option value="174"> Qatar </option>
                  <option value="175"> Reunion </option>
                  <option value="176"> Romania </option>
                  <option value="177"> Russian Federation </option>
                  <option value="178"> Rwanda </option>
                  <option value="179"> Saint Helena </option>
                  <option value="180"> Saint Kitts And Nevis </option>
                  <option value="181"> Saint Lucia </option>
                  <option value="182"> Saint Pierre And Mique </option>
                  <option value="183"> Saint Vincent And The  </option>
                  <option value="185"> San Marino </option>
                  <option value="186"> Sao Tome And Principe </option>
                  <option value="187"> Saudi Arabia </option>
                  <option value="188"> Senegal </option>
                  <option value="247"> Serbia and Montenegro </option>
                  <option value="189"> Seychelles </option>
                  <option value="190"> Sierra Leone </option>
                  <option value="191"> Singapore </option>
                  <option value="192"> Slovakia </option>
                  <option value="193"> Slovenia </option>
                  <option value="194"> Solomon Islands </option>
                  <option value="195"> Somalia </option>
                  <option value="196"> South Africa </option>
                  <option value="113"> South Korea </option>
                  <option value="255"> South Sudan </option>
                  <option value="198"> Spain </option>
                  <option value="199"> Sri Lanka </option>
                  <option value="200"> Sudan </option>
                  <option value="201"> Suriname </option>
                  <option value="203"> Swaziland </option>
                  <option value="204"> Sweden </option>
                  <option value="205"> Switzerland </option>
                  <option value="206"> Syrian Arab Republic </option>
                  <option value="207"> Taiwan </option>
                  <option value="208"> Tajikistan </option>
                  <option value="209"> Tanzania </option>
                  <option value="210"> Thailand </option>
                  <option value="256"> Thuraya </option>
                  <option value="212"> Togo </option>
                  <option value="213"> Tokelau </option>
                  <option value="214"> Tonga </option>
                  <option value="215"> Trinidad And Tobago </option>
                  <option value="216"> Tunisia </option>
                  <option value="217"> Turkey </option>
                  <option value="218"> Turkmenistan </option>
                  <option value="219"> Turks And Caicos Islan </option>
                  <option value="220"> Tuvalu </option>
                  <option value="221"> Uganda </option>
                  <option value="222"> Ukraine </option>
                  <option value="223"> United Arab Emirates </option>
                  <option value="224"> United Kingdom </option>
                  <option value="225"> United States </option>
                  <option value="227"> Uruguay </option>
                  <option value="228"> Uzbekistan </option>
                  <option value="229"> Vanuatu </option>
                  <option value="94"> Vatican City </option>
                  <option value="230"> Venezuela </option>
                  <option value="231"> Vietnam </option>
                  <option value="232"> Virgin Islands, Britis </option>
                  <option value="233"> Virgin Islands, U.S. </option>
                  <option value="234"> Wallis And Futuna </option>
                  <option value="184"> Western Samoa </option>
                  <option value="236"> Yemen </option>
                  <option value="238"> Zambia </option>
                  <option value="239"> Zimbabwe </option>
                  </Input>
                    </InputGroup>
                    <FormGroup className="mb-3" style={{ paddingLeft: '20px' }} >
                      <Label check>
                        <Input type="radio" name="device_type" id="device_type" value="SIP" onChange={this.handleChange}  />{' '}
                        SIP <br></br>
                        <Input type="radio" name="device_type" id="device_type" value="IAX2"  onChange={this.handleChange} />{' '}
                        IAX2
                      </Label>
                    </FormGroup>
                    <Button color="success" block disabled={!this.validateForm()} type="submit">Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
