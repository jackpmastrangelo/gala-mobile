import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { login } from "../../state/loginState";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameField: "",
      passwordField: ""
    }
  }

  handleFieldChange(newValue, field) {
    let change = {};
    change[field] = newValue;
    this.setState(change);
  }

  handleLogin() {
    this.props.dispatch(login(this.state.usernameField, this.state.passwordField));
  }

  navigateToCreateAccount() {
    this.props.navigation.navigate("CreateAccount");
  }

  componentDidUpdate() {
    if (this.props.loginSuccessful) {
      this.props.navigation.navigate("MainStack");
    }
  }

  render() {
    let extraInformation = undefined;

    if (this.props.loginFetching) {
      extraInformation = <Text>Login Fetching</Text>;
    } else if (this.props.loginError) {
      extraInformation = <Text>{this.props.loginErrorMessage}</Text>;
    } else if (this.props.loginSuccessful) {
      extraInformation = <Text>Success!</Text>
    }

    return(
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <View style={{flex: 8, flexDirection: "column", justifyContent: "center", alignItems: "flex-start"}}>
          <Text>Welcome to Gala! Please login:</Text>
          <TextInput value={this.state.usernameField}
                     style={{height: 30, width: 100}}
                     placeholder={"Username"}
                     onChangeText={newText => { this.handleFieldChange.bind(this)(newText, "usernameField") }} />
          <TextInput value={this.state.passwordField}
                     style={{height: 30, width: 100}}
                     placeholder={"Password"}
                     onChangeText={newText => { this.handleFieldChange.bind(this)(newText, "passwordField") }} />
          <Button title={"Login"}
                  onPress={() => { this.handleLogin.bind(this)() }}/>
        {extraInformation}
        </View>
        <View style={{flex: 2, alignItems: "center"}}>
          <Button title={"Don't have an account? Create one!"}
                  onPress={() => { this.navigateToCreateAccount.bind(this)() }}/>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginFetching: state.loginState.fetching,
    loginSuccessful: state.loginState.success,
    loginError: state.loginState.error,
    loginErrorMessage: state.loginState.errorMessage
  }
}

export default connect(mapStateToProps)(LoginScreen);