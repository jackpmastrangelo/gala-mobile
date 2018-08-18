import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { createAccount } from "../../state/api/createAccountState";

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

  handleFieldChange = (newValue, field) => {
    let change = {};
    change[field] = newValue;
    this.setState(change);
  };

  handleCreateAccount = () => {
    this.props.dispatch(createAccount(
      this.state.firstNameField,
      this.state.lastNameField,
      this.state.emailField,
      this.state.passwordField
    ));
  };

  render() {
    let accountCreationStatus = undefined;

    if (this.props.fetching) {
        accountCreationStatus = <Text>Hold on, creating account...</Text>;
    } else if (this.props.error) {
        accountCreationStatus = <Text>{this.props.errorMessage}</Text>;
    } else if (this.props.success) {
        accountCreationStatus = <Text>Success!</Text>
    }

    return(
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: .1}}/>
        <View style={{flex: .8, flexDirection: "column", justifyContent: "center", alignItems: "flex-start"}}>
          <Text>Welcome to Gala! {"\n"}Enter your info to create an account.</Text>
          <TextInput value={this.state.firstNameField}
                     style={styles.formTextInput}
                     placeholder={"First Name"}
                     onChangeText={newFirstName => { this.handleFieldChange(newFirstName, "firstNameField") }} />
          <TextInput value={this.state.lastNameField}
                     style={styles.formTextInput}
                     placeholder={"Last Name"}
                     onChangeText={newLastName => { this.handleFieldChange(newLastName, "lastNameField") }} />
          <TextInput value={this.state.emailField}
                     style={styles.formTextInput}
                     placeholder={"Email"}
                     onChangeText={newEmail => { this.handleFieldChange(newEmail, "emailField") }} />
          <TextInput value={this.state.passwordField}
                     style={styles.formTextInput}
                     placeholder={"Password"}
                     onChangeText={newPassword => { this.handleFieldChange(newPassword, "passwordField") }} />
          <Button title={"Create account!"}
                  onPress={this.handleCreateAccount}/>
          {accountCreationStatus}
        </View>
        <View style={{flex: .1}}/>
      </View>
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
    fetching: state.createAccountState.fetching,
    error: state.createAccountState.error,
    errorMessage: state.createAccountState.errorMessage,
    success: state.createAccountState.success
  }
}

export default connect(mapStateToProps)(CreateAccountScreen);