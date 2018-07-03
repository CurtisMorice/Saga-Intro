import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

class App extends Component {
  state = {
    newElement: '',
  }


componentDidMount =() => {
  this.props.dispatch({type:'FETCH_ELEMENTS',})
     
    
    }
  
  
 
  handleChange = (event) => {
    this.setState({
      newElement: event.target.value,
    });
  }

  handleClick = () => {
      
      if(this.state.newElement !== ''){
        this.props.dispatch( { type: 'ADD_ELEMENTS', payload: this.state } );
        
      } else{alert('You need to fill in some data');};
    // axios.post('/api/element', this.state)
    // .then(response =>{
    //   console.log('Good response from server', response);
    //   //need to re-get our stuff from the server
    //   this.props.dispatch({type:'FETCH_ELEMENTS',})

    // }).catch(error =>{
    //   alert('Error in the handle post in your App. Contact Curtis', error);
    //   //start adding an error page. 
    // });

    //TODO - still dong the old behavior to add to the client array. 
    //This is not needed, no client side array

    // BUT I do want to update the newElement so it clears the fields.
    this.setState({
      newElement: '',
    });
  }

  render() {
    return (
      <div>
        <input value={this.state.newElement} onChange={this.handleChange}
        placeholder='element name' />
        <button onClick={this.handleClick}>Add Element</button>
        <pre>{JSON.stringify(this.props.reduxState)}</pre>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(App);
