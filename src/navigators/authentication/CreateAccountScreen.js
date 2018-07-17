import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { createAccount } from "../../state/createAccountState";

class CreateAccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameField: "",
      lastNameField: "",
      emailField: "",
      passwordField: ""
    }
  }

  handleFieldChange(newValue, field) {
    let change = {};
    change[field] = newValue;
    this.setState(change);
  }

  handleCreateAccount() {
    this.props.dispatch(createAccount(
      this.state.firstNameField,
      this.state.lastNameField,
      this.state.emailField,
      this.state.passwordField
    ));
  }

  render() {
    let extraInformation = undefined;

    if (this.props.fetching) {
      extraInformation = <Text>Hold on, creating account...</Text>;
    } else if (this.props.error) {
      extraInformation = <Text>{this.props.errorMessage}</Text>;
    } else if (this.props.success) {
      extraInformation = <Text>Success!</Text>
    }

    return(
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: .1}}/>
        <View style={{flex: .8, flexDirection: "column", justifyContent: "center", alignItems: "flex-start"}}>
          <Text>Welcome to Gala! {"\n"}Enter your info to create an account.</Text>
          <Text>First Name: </Text>
          <TextInput value={this.state.firstNameField}
                     style={{height: 30, width: 100}}
                     placeholder={"First Name"}
                     onChangeText={newText => { this.handleFieldChange.bind(this)(newText, "firstNameField") }} />
          <Text>Last Name: </Text>
          <TextInput value={this.state.lastNameField}
                     style={{height: 30, width: 100}}
                     placeholder={"Last Name"}
                     onChangeText={newText => { this.handleFieldChange.bind(this)(newText, "lastNameField") }} />
          <Text>Email: </Text>
          <TextInput value={this.state.emailField}
                     style={{height: 30, width: 100}}
                     placeholder={"Email"}
                     onChangeText={newText => { this.handleFieldChange.bind(this)(newText, "emailField") }} />
          <Text>Password: </Text>
          <TextInput value={this.state.passwordField}
                     style={{height: 30, width: 100}}
                     placeholder={"Password"}
                     onChangeText={newText => { this.handleFieldChange.bind(this)(newText, "passwordField") }} />
          <Button title={"Create account!"}
                  onPress={() => { this.handleCreateAccount.bind(this)() }}/>
          {extraInformation}
        </View>
        <View style={{flex: .1}}/>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetching: state.createAccountState.fetching,
    error: state.createAccountState.error,
    errorMessage: state.createAccountState.errorMessage,
    success: state.createAccountState.success
  }
}

export default connect(mapStateToProps)(CreateAccountScreen);