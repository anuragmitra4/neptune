import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class PageHome extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props.cards[0].front);
    this.state = {
      message_send: '',
    };
  }

  render() {
    return (
      <div>
        Hi this is home!
        <a
          className="nav-link"
          href="/login"
          onClick={() => {
            this.props.firebase.logout();
          }}
        >
          Sign Out
        </a>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.firebase.auth.uid,
    email: state.firebase.profile.email,
    profile: state.firebase.profile,
  };
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(PageHome);
