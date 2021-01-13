import React from 'react';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Graphs from './components/Graphs';
import Articles from './components/Articles';
import AbsorbanceGraph from './components/AbsorbanceGraph';
import AbsGraph from './components/AbsGraph';
import Threshold from './components/Threshold';

class PageHome extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props.cards[0].front);
    this.state = {
      message_send: '',
    };
  }

  async componentDidMount() {
    console.log("Calling functions");
    // const getHomepage = this.props.firebase
    //   .functions()
    //   .httpsCallable('getHomepage');
    // const homepage = await getHomepage();
    // console.log(homepage);
  }

  render() {

    if (!this.props.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <Navbar />
        <div className='content'>
          {/* <Articles /> */}
          <Threshold />
          <AbsGraph />
        </div>
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
  firestoreConnect(() => [
    { collection: 'hello' }
  ]),
  firebaseConnect(),
  connect(mapStateToProps),
)(PageHome);
