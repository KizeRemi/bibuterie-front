import React from 'react';
import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';

import App from 'next/app';
import '../css/tailwind.css';

import Amplify, { Auth, Hub } from 'aws-amplify';
import authConfig from '../aws/awsConfig';

import NavBar from '../components/NavBar';


Amplify.configure(authConfig);

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: false,
    }
  }

  componentDidMount() {
    Hub.listen('auth', (data) => {
      const { payload } = data
       if (payload.event === 'signIn') {
        this.setState({ user: payload.data });
       }
       if (payload.event === 'signOut') {
         console.log('a user has signed out!')
       }
    })
    const loginIn = async () => {
      try {
        this.setState({ user: await Auth.currentAuthenticatedUser() });
      } catch (e) {
        console.log(e);
      }
      this.setState({ loading: false})
    };
    loginIn();
  }

  signIn = (provider) => () => {
    Auth.federatedSignIn({ provider })
  };

  signOut = (e) => {
    e.stopPropagation();
    Auth.signOut();
    this.setState({ user: null });
  }


  render() {
    const { Component, pageProps } = this.props;
    return (
      <ApolloProvider client={this.props.apollo}>
        <NavBar
          user={this.state.user}
          loading={this.state.loading}
          onClickFacebook={this.signIn('Facebook')}
          onClickGoogle={this.signIn('Google')}
          onSignOut={this.signOut}
        />
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

MyApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps }
}

export default withApollo(({ initialState }) => {
  return new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache().restore(initialState || {}),
    request: async (operation) => {
      const { accessToken } = await Auth.currentSession();
      operation.setContext({
        headers: {
          authorization: accessToken ? accessToken.jwtToken : '',
        }
      })
    }
  });
}, { getDataFromTree })(MyApp, { getDataFromTree });
