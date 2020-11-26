import './App.css';
import PageLogin from './PageLogin';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PageRegister from './PageRegister';
import PageHome from './PageHome';
import { isLoaded } from 'react-redux-firebase';

const App = props => {
  if (!isLoaded(props.auth, props.profile)) {
    return <div>Authentication Loading...</div>;
  }

  return (
    <Switch>
      <Route exact path="/">
        <PageHome /> 
      </Route>
      <Route exact path="/login">
        <PageLogin />
      </Route>
      <Route exact path="/register">
        <PageRegister />
      </Route>
      <Route>Page Not Found!</Route>
    </Switch>
  );
}

const mapStateToProps = state => {
  return { auth: state.firebase.auth, profile: state.firebase.profile };
};

export default connect(mapStateToProps)(App);
