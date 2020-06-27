import React, { Component } from 'react';
import Layout from  './components/Layout/Layout'
import Products from './containers/Products/Products'
import Cart from './containers/Cart/Cart'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import ContactData from './containers/Checkout/ContactData'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux'
import * as actions from './store/actions/index'

class App extends Component {

  componentDidMount() {
    this.props.onAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
          <Route path="/auth" exact component={Auth}/>
          {/* <Route path="/cart" exact component={Cart}/> */}
          <Route path="/" exact component={Products}/>
          <Redirect to='/' />
      </Switch>
    )

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout/contact-data" exact component={ContactData}/>
          <Route path="/orders" exact component={Orders}/>
          <Route path="/logout" exact component={Logout}/>
          <Route path="/cart" exact component={Cart}/>
          <Route path="/" exact component={Products}/>
          <Redirect to='/' />
        </Switch>
      )
    }


    return (
      <div>
        <Layout >
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
