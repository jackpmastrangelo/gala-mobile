import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class EventTile extends React.Component {

  render() {
    const event = this.props.event;

    return (
      <TouchableOpacity style={styles.tile}  onPress={() => this.props.onEventPress(event)}>
        <View style={styles.flexContainer}>
          <Text>{event.name}</Text>
          <Text>{event.eventTime}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tile: {
    height: 100,
    width: 350,
    backgroundColor: '#2d2d2d'
  },
  flexContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});