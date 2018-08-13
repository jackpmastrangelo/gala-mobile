import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

class TicketScanner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasCameraPermission: null,
        };
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera!</Text>;
        } else {
            const { navigation } = this.props;
            const event = navigation.getParam('event');

            return (
                <View style={{ flex: 1 }}>
                    <BarCodeScanner
                        onBarCodeRead={this.handleQrCodeRead}
                        style={StyleSheet.absoluteFill}
                        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    />
                </View>
            );
        }
    }

    handleQrCodeRead = ({ type, data }) => {
        alert(`The ticket's id is: ${data}`);
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(TicketScanner);