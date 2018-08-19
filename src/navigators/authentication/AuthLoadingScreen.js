import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
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
      this.props.navigation.navigate("AuthStack");
    }
  }

  render() {
    return (
      <View style={styles.center}>
        <ActivityIndicator size={'small'} color={'tomato'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center'
  }
});

function mapStateToProps(state) {
  return {
    sessionSuccess: state.sessionState.success,
    sessionNotFound: state.sessionState.noneFound
  }
}

export default connect(mapStateToProps)(AuthLoadingScreen);