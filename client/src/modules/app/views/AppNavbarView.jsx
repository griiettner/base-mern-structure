// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { UsersUsersActions } from '../../users/actions';

type State = {
  isOpen: boolean
};

const action = new UsersUsersActions();

class AppNavbarView extends Component<{}, State> {
  state = {
    isOpen: false
  };

  toggle = (): void => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render(): React$Node {
    const {
      logout,
      users: { user }
    } = this.props;
    return (
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">CMS</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/griiettner">Github</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Hi {user.firstName}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem tag={Link} to="/logout" onClick={logout}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({ users: state.users });

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(action.logout())
});

const connectAppNavbarView = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNavbarView);

export default connectAppNavbarView;
