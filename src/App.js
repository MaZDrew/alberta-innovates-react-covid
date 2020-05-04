import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {Switch, Route} from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffac42',
      main: '#f47b00',
      dark: '#ba4c00',
      contrastText: '#000',
    },
    secondary: {
      light: '#a4a4a4',
      main: '#757575',
      dark: '#494949',
      contrastText: '#fff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path='/' render={props => <Dashboard {...props}/>}/>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
