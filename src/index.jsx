import React, { Component, useState } from 'react';
import ReactDOM, { render } from 'react-dom';

const ThemeContext = React.createContext('light');

class Header extends Component{
  render(){
    console.log('header...', this.context)
    return (
        <ThemeContext.Consumer>
          {
            value => {
              return (
                  <div>
                    consumer: {value}
                  </div>
              )
            }
          }
        </ThemeContext.Consumer>
    )
  }
}

Header.contextType = ThemeContext


export default class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
        <ThemeContext.Provider value="dark">
          <Header />
        </ThemeContext.Provider>
    );
  }
}



const root = document.getElementById('root');
render(<App />, root)

