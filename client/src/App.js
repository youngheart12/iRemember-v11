import React, { Component } from 'react';
import AppNavbar from './component/navbar';
import ShoppingList from './component/shoppinglist';
import ItemModal from './component/itemModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className='App' style={{backgroundColor:"#2A3439",height:"auto",color:"white"}}>
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
      
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
