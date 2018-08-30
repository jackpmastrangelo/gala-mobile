import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { login } from "../../state/api/loginState";

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Welcome Back"
  };

  constructor(props) {
    super(props);
    this.state = {
      usernameField: "",
      passwordField: ""
    }
  }

  handleFieldChange = (newValue, field) => {
    let change = {};
    change[field] = newValue;
    this.setState(change);
  };

  handleLogin = () => {
    this.props.dispatch(login(this.state.usernameField, this.state.passwordField));
  };

  navigateToCreateAccount = () => {
    this.props.navigation.navigate("CreateAccount");
  };

  fetchLoginStatus() {
      if (this.props.loginFetching) {
          return <Text>Login Fetching</Text>;
      } else if (this.props.loginError) {
          return <Text>{this.props.loginErrorMessage}</Text>;
      } else if (this.props.loginSuccessful) {
          return <Text>Success!</Text>;
      }
  }


  componentDidUpdate() {
    if (this.props.loginSuccessful) {
      this.props.navigation.navigate("MainStack");
    }
  }

  render() {
    return(
      <KeyboardAvoidingView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <View style={{flex: 8, flexDirection: "column", justifyContent: "center", alignItems: "flex-start"}}>

          <Text>Welcome to Gala! Please login:</Text>
          <TextInput value={this.state.usernameField}
                     style={styles.formTextInput}
                     autoCapitalize={'none'}
                     placeholder={"Username"}
                     onChangeText={newUsername => { this.handleFieldChange(newUsername, "usernameField") }} />
          <TextInput value={this.state.passwordField}
                     style={styles.formTextInput}
                     autoCapitalize={'none'}
                     secureTextEntry={true}
                     placeholder={"Password"}
                     onChangeText={newPassword => { this.handleFieldChange(newPassword, "passwordField") }} />
          <Button title={"Login"}
                  onPress={this.handleLogin}/>
        {this.fetchLoginStatus()}

        </View>
        <View style={{flex: 2, alignItems: "center"}}>
          <Button title={"Don't have an account? Create one!"}
                  onPress={this.navigateToCreateAccount}/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    formTextInput: {
        height: 50,
        width: '80%'
    }
});

function mapStateToProps(state) {
  return {
    loginFetching: state.loginState.fetching,
    loginSuccessful: state.loginState.success,
    loginError: state.loginState.error,
    loginErrorMessage: state.loginState.errorMessage
  }
}

export default connect(mapStateToProps)(LoginScreen);