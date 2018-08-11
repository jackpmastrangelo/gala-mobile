import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { fetchSessionFromStorage } from "../../state/Session";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    props.dispatch(fetchSessionFromStorage());
  }

  componentDidUpdate() {
    if (this.props.sessionSuccess) {
      this.props.navigation.navigate("MainStack");
    } else if (this.props.sessionNotFound) {
      this.props.navigation.navigate("Login");
    }
  }

  render() {
    return (
      <View>
        <Text>Checking for Credentials...</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    sessionSuccess: state.sessionState.success,
    sessionNotFound: state.sessionState.noneFound
  }
}

export default connect(mapStateToProps)(AuthLoadingScreen);