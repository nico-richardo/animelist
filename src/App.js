/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import './App.css';
import { ThemeProvider } from '@emotion/react'
import HeadBar from './base_component/HeadBar';
import { routeComponent } from './navigation/routes';
import { Routes } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import theme from './styles/Colors';
import { CollectionProvider } from './contexts/CollectionContext';
import { SelectedShowProvider } from './contexts/SelectedShowContext';
import { ConfirmationDialogProvider } from './contexts/ConfirmationDialogContext';
import ConfirmationDialog from './base_component/ConfirmationDialog';
import { SelectedCollectionProvider } from './contexts/SelectedCollectionContext';

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache()
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <ConfirmationDialogProvider>
            <CollectionProvider>
              <SelectedCollectionProvider>
                <SelectedShowProvider>
                  <div css={css`
        padding-top:25%;
        @media (min-width: 60em) {
          padding-top:9%;
        }
        @media (min-width: 80em) {
          padding-top:7.5%;
        }`}>
                    <HeadBar />
                    <Routes >
                      {routeComponent}
                    </Routes >
                    <ConfirmationDialog />
                  </div>
                </SelectedShowProvider>
              </SelectedCollectionProvider>
            </CollectionProvider>
          </ConfirmationDialogProvider>
        </ApolloProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
