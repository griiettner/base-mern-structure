// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { UsersUsersActions } from '../../users/actions';

type Props = {
  getBy: Function,
  logout: Function,
  users: {
    user: {
      firstName: string
    },
    authentication: {
      loggedIn?: boolean,
      session: {
        message: string,
        success: boolean,
        token: string
      }
    }
  }
};

type State = {
  users: Object
};

const action = new UsersUsersActions();

class DefaultAppView extends React.Component<Props, State> {
  componentDidMount(): void {
    const { getBy, users } = this.props;
    getBy('token', users.authentication.session.token);
  }

  render(): React$Node {
    const {
      logout,
      users: { user }
    } = this.props;
    return (
      <Container>
        <h1>Hi! {user.firstName}</h1>
        <p>You&apos;re logged in with React!!</p>
        <p>
          <Link to="/login" onClick={logout}>
            Logout
          </Link>
        </p>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ users: state.users });

const mapDispatchToProps = dispatch => ({
  getBy: (type, params) => dispatch(action.getBy(type, params)),
  logout: () => dispatch(action.logout())
});

const connectDefaultViewDefault = connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultAppView);

export default connectDefaultViewDefault;
