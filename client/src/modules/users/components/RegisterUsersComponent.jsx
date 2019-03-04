// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { UsersUsersActions } from '../actions';

type Props = {
  dispatch: Function,
  registering: Function
};

type State = {
  submitted: boolean,
  user: User
};

class RegisterUsersComponent extends React.Component<Props, State> {
  state = {
    user: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    submitted: false
  };

  handleChange = (event: { target: { name: string, value: string } }): void => {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  };

  handleSubmit = (event: Event): void => {
    event.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    const { firstName, lastName, email, password } = user;
    const { dispatch } = this.props;
    if (firstName && lastName && email && password) {
      const action = new UsersUsersActions();
      dispatch(action.register(user));
    }
  };

  render(): React$Node {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    return (
      <Container>
        <h3 className="text-center pt-5">Register</h3>
        <Row className="justify-content-center align-items-center">
          <Col md={6}>
            <Form name="form" onSubmit={this.handleSubmit}>
              <FormGroup className={submitted && !user.firstName ? ' has-error' : null}>
                <Label for="firstName">First Name</Label>
                <Input type="text" name="firstName" value={user.firstName} onChange={this.handleChange} />
                {submitted && !user.firstName && (
                  <FormText color="danger" className="help-block">
                    First Name is required
                  </FormText>
                )}
              </FormGroup>
              <FormGroup className={submitted && !user.lastName ? ' has-error' : ''}>
                <Label for="lastName">Last Name</Label>
                <Input type="text" name="lastName" value={user.lastName} onChange={this.handleChange} />
                {submitted && !user.lastName && (
                  <FormText color="danger" className="help-block">
                    Last Name is required
                  </FormText>
                )}
              </FormGroup>
              <FormGroup className={submitted && !user.email ? ' has-error' : ''}>
                <Label for="email">E-mail</Label>
                <Input type="text" name="email" value={user.email} onChange={this.handleChange} />
                {submitted && !user.email && (
                  <FormText color="danger" className="help-block">
                    E-mail is required
                  </FormText>
                )}
              </FormGroup>
              <FormGroup className={submitted && !user.password ? ' has-error' : ''}>
                <Label for="password">Password</Label>
                <Input type="password" name="password" value={user.password} onChange={this.handleChange} />
                {submitted && !user.password && (
                  <FormText color="danger" className="help-block">
                    Password is required
                  </FormText>
                )}
              </FormGroup>
              <FormGroup>
                <Button color="primary">Register</Button>
                {registering && (
                  <img
                    src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                    alt=""
                  />
                )}
                <Link to="/login" className="btn btn-link">
                  Cancel
                </Link>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ registering: state.users.registration.registering });
const connectedRegisterPage = connect(mapStateToProps)(RegisterUsersComponent);
export default connectedRegisterPage;
