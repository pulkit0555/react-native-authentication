import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button, Card, CardSection, Input,Spinner} from './common';
import firebase from 'firebase';
class LoginForm extends Component{
  state = { email: '' , password: '',error:'',loading:false} ;
  onButtonPress(){
    const {email,password,error}=this.state;
    this.setState({error:'',loading:true})
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(this.onLoginSuccess.bind(this))
    .catch( () => {
      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
    });
  }
  renderButton(){
    if(this.state.loading){
      return <Spinner size='small'/>;
    }
    return(
      <Button onPress={this.onButtonPress.bind(this)}>
        Log In
      </Button>
    );
  }
  onLoginSuccess(){
    this.setState({
      email:'',
      password:'',
      loading:false,
      error:''
    });
  }
  onLoginFail(){
    this.setState({
      error:'Something Went Wrong!',
      loading:false
    });
  }
  render(){
    return(
      <Card>
      <CardSection>
        <Input
        label='Email'
        placeholder='user@gmail.com'
         value={this.state.email}
         onChangeText={email => this.setState({email: email})}
        />
        </CardSection>
      <CardSection>
      <Input
      secureTextEntry
      label='Password'
      placeholder='password'
      value={this.state.password}
      onChangeText={password => this.setState({password: password})}
      />
      </CardSection>
      <Text style={styles.errorTextStyle}>
      {this.state.error}
      </Text>
      <CardSection>
        {this.renderButton()}
      </CardSection>
      </Card>
    );
  }
}
const styles = {
  errorTextStyle:{
  fontSize:20,
  color:'red',
  alignSelf:'center'
  }
};
export default LoginForm ;
