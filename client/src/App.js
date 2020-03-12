import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

//component imports
import Users from './components/users'
import CreateOrganisation from './components/createOrganisation'

const client = new ApolloClient({
  uri:'http://localhost:4000/api',
})

class App extends Component {

  render() {
    console.log('coucou')

    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Router>
            <Switch>
            <Route exact={true} path="/" component={Users} />
            <Route exact={true} path="/createOrganisation" component={CreateOrganisation} />
            </Switch>
          </Router>
        </div>
      </ApolloProvider> 
    );
  }
}

export default App;
