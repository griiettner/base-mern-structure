// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { UsersUsersActions } from '../actions';

type Props = {
  dispatch: Function,
  loggingIn: boolean
};

type State = {
  username: string,
  password: string,
  submitted: boolean
};

const action = (): Function => new UsersUsersActions();

class LoginUsersComponent extends React.Component<Props, State> {
  state = {
    username: '',
    password: '',
    submitted: false
  };

  componentWillMount(): void {
    // reset login status
    // this.props.dispatch(action().logout());
  }

  handleChange = (e: ElementEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e: Event): void => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(action().login(username, password));
    }
  };

  render(): React$Node {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <Container>
        <h3 className="text-center pt-5">Login</h3>
        <Row className="justify-content-center align-items-center">
          <Col md={6}>
            <Form name="form" onSubmit={this.handleSubmit}>
              <FormGroup className={submitted && !username ? ' has-error' : null}>
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                />
                {submitted && !username && (
                  <FormText color="danger" className="help-block">
                    Username is required
                  </FormText>
                )}
              </FormGroup>
              <FormGroup className={submitted && !password ? ' has-error' : null}>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                {submitted && !password && (
                  <FormText color="danger" className="help-block">
                    Password is required
                  </FormText>
                )}
              </FormGroup>
              <FormGroup>
                <Button type="submit" color="primary">
                  Login
                </Button>
                {loggingIn && (
                  <img
                    src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                    alt=""
                  />
                )}
                <Link to="/register" className="btn btn-link">
                  Register
                </Link>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ loggingIn: state.users.authentication.loggingIn });
const connectedUsersViewLogin = connect(mapStateToProps)(LoginUsersComponent);
export default connectedUsersViewLogin;
