import './App.css';
import PageLogin from './PageLogin';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PageRegister from './PageRegister';
import PageHome from './PageHome';
import { isLoaded } from 'react-redux-firebase';
import { GridLoader } from 'react-spinners';
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const App = props => {
  if (!isLoaded(props.auth, props.profile)) {
    return (
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <GridLoader
          css={override}
          size={15}
          color={"#008066"}
          loading={true}
        />
      </div>
    )}

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
      <Route>
        <PageHome />
      </Route>
    </Switch>
  );
}

const mapStateToProps = state => {
  return { auth: state.firebase.auth, profile: state.firebase.profile };
};

export default connect(mapStateToProps)(App);
