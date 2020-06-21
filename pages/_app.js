import App from 'next/app';
import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';
import Amplify, { Auth } from 'aws-amplify';

import UserProvider from '../providers/UserProvider';
import authConfig from '../aws/awsConfig';
import NavBar from '../components/NavBar';

import "react-step-progress-bar/styles.css";
import '../css/tailwind.css';
import '../css/index.css'

Amplify.configure(authConfig);

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = { user: null, loading: false };
  }

  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <UserProvider>
          <NavBar />
          <Component {...pageProps} />
        </UserProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(({ initialState }) => {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'production' ? 'https://bibuterie-api.herokuapp.com/graphql' : 'http://localhost:4000/graphql',
    cache: new InMemoryCache().restore(initialState || {}),
    request: async (operation) => {
      try {
        const { accessToken } = await Auth.currentSession();
        operation.setContext({
          headers: {
            authorization: accessToken ? accessToken.jwtToken : '',
          }
        })
      } catch (e) {
        console.log(e);
      }
    }
  });
}, { getDataFromTree })(MyApp, { getDataFromTree });
