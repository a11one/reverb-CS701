import React from 'react';

import { withFirebase } from '../Firebase';

import { NavLink } from 'reactstrap';


const SignOutButton = ({ firebase }) => (
  <NavLink href="/" onClick={firebase.doSignOut}>
    sign out
  </NavLink>
);

export default withFirebase(SignOutButton);
