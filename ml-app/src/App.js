import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', file: []};

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({value: event.target.value});
  }

  handleFileChange(event) {
    this.setState({file: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append('name', this.state.name)
    bodyFormData.append('file', this.state.file)
    axios({
    method: 'post',
    url: 'localhost:5000/upload',
    data: bodyFormData,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        console.log(response);
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });
  }

  render(){
    return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Patient Name</Form.Label>
            <Form.Control type="text" placeholder="Vlad K." value={this.state.value} onChange={this.handleNameChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" value={this.state.value} onChange={this.handleFileChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
      </Form>
    );
  }

}

export default App;
