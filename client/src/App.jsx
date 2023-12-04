import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import Navbar from './components/Navbar';
import {useQuery, gql} from '@apollo/client';
import {BrowserRouter, Router, Route, Routes} from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';



function App() {
  return (
    <ApolloProvider client={client}>
        <Navbar />
        <Outlet />
    </ApolloProvider>
  );
}

export default App;
