/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import './App.css';
import { ThemeProvider } from '@emotion/react'
import HeadBar from './component/HeadBar';
import { routeComponent } from './navigation/routes';
import { Routes } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import theme from './styles/Colors';

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache()
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <div css={css`
        padding-top:15%;
        margin-left: 2.5%;
        margin-right: 2.5%;
        @media (min-width: 60em) {
          padding-top:10%;
        }`}>
          <ThemeProvider theme={theme}>
            <HeadBar />
            <Routes >
              {routeComponent}
            </Routes >
          </ThemeProvider>
        </div>
      </ApolloProvider>
    </div>
  );
}

export default App;
