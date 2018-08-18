import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {BarCodeScanner, Permissions, Camera} from 'expo';
import { validateTicket, validateTicketReset } from "../../state/api/validateTicketState";

class TicketScanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: null,
      active: true,
      alerted: true
    };
  }

  async componentWillMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted', active: true});
  }

  render() {
    const {hasCameraPermission} = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera!</Text>;
    } else {
      const event = this.props.navigation.getParam('event');

      return (
        <View style={{flex: 1}}>
          <BarCodeScanner
            onBarCodeRead={this.handleQrCodeRead(event)}
            style={StyleSheet.absoluteFill}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          />
        </View>
      );
    }
  }

  componentDidUpdate() {
    if (!this.state.alerted && (this.props.success || this.props.validationError)) {
      this.setState({alerted: true});
      if (this.props.success) {
        Alert.alert("Success",
          "Ticket successfully validated!",
          [
            {
              text: 'Ok', onPress: () => {
                this.props.dispatch(validateTicketReset());
                this.setState({ active: true, alerted: false });
              }
            }
          ],
          {cancelable: false});
      } else if (this.props.validationError) {
        Alert.alert("Error",
          "There was an error validating your ticket",
          [
            {
              text: 'Ok', onPress: () => {
                this.props.dispatch(validateTicketReset());
                this.setState({ active: true, alerted: false });
              }
            }
          ],
          {cancelable: false})
      }
    }
  }

  handleQrCodeRead = (event) => {
    return ({data}) => {
      if (this.state.active) {
        this.setState({ active: false, alerted: false });
        this.props.dispatch(validateTicket(event.id, data, this.props.authToken));
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    validating: state.validateTicketState.fetching,
    success: state.validateTicketState.success,
    validationError: state.validateTicketState.error,
    validationErrorMessage: state.validateTicketState.errorMessage,
    authToken: state.sessionState.token
  };
}

export default connect(mapStateToProps)(TicketScanner);