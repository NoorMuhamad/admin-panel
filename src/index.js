import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// scroll bar
import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux';

// apex-chart
import 'assets/third-party/apex-chart.css';

// Apollo Client
import { ApolloProvider } from '@apollo/client/react';
import client from 'apollo';

// project import
import App from './App';
import { store } from 'store';
import reportWebVitals from './reportWebVitals';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <ApolloProvider client={client} >
      <ReduxProvider store={store}>
        <BrowserRouter basename="/">
          <App />
        </BrowserRouter>
      </ReduxProvider>
    </ApolloProvider>
  </StrictMode>
);

reportWebVitals();
