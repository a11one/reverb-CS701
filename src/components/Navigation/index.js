import React from 'react';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navigation />
    )
  }
}

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = ({ authUser }) => (
  <Navbar color="dark" dark expand="md">
    <NavbarBrand href={ROUTES.LANDING}>reverb</NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink href={ROUTES.HOME}>home</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href={ROUTES.ACCOUNT}>account</NavLink>
      </NavItem>
      {!!authUser.roles[ROLES.ADMIN] && (
      <NavItem>
        <NavLink href={ROUTES.ADMIN}>Admin</NavLink>
      </NavItem>
    )}
      <NavItem>
        <SignOutButton />
      </NavItem>
    </Nav>
  </Navbar>
);

const NavigationNonAuth = () => (
  <Navbar color="dark" dark expand="md">
    <NavbarBrand href={ROUTES.LANDING}>reverb</NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink href={ROUTES.HOME}>home</NavLink>
      </NavItem>
    </Nav>
  </Navbar>
);

export default NavigationBar;
