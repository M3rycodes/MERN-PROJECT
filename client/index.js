import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './App.cs';


const client = new ApolloClient({
  uri: 'https://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

client.query({
  query: gql`
  query GetLocations
    locations {
      id
      name
      description
      photo
    }
  }
`,
})
.then((result) => {console.log(result)});


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
      <App />
      </ApolloProvider>
    </React.StrictMode>
  );