import React, { Component } from 'react'
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

export class Threshold extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       threshold: '',
       thresholdValue: 18
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitData = e => {
    e.preventDefault();
    //const db = firebase.firestore();
    // const userRef = db.collection("Threshold").add({
    //   fullname: this.state.fullname,
    //   email: this.state.email
    // });  
    this.setState({
      thresholdValue: this.state.threshold,
      threshold: '',
    });
  }
  
  render() {
    return (
      <div>
        <div class="input-group mb-3">
          <input
            name="threshold"
            className="form-control"
            onChange={this.handleChange}
            placeholder="Threshold"
            value={this.state.threshold}
            type="number"
          />
          <div class="input-group-prepend">
            <button 
              class="btn btn-outline-primary" 
              type="button"
              onSubmit={this.submitData}>Submit</button>
          </div>
        </div>
        The current threshold is: {this.state.thresholdValue}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const userID = state.firebase.auth.uid;
  return {
    profile: state.firebase.profile,
    threshold: state.firestore.data.threshold
  };
};

export default compose(
  firestoreConnect(() => [
    { collection: 'Threshold', storeAs: 'threshold' }
  ]),
  firebaseConnect(),
  connect(mapStateToProps),
)(Threshold)
