import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class EventTile extends React.Component {

  render() {
    const event = this.props.event;

    return (
      <TouchableOpacity style={styles.tile}  onPress={() => this.props.onEventPress(event)}>
        <View style={styles.flexContainer}>
          <Text style={styles.tileText}>{event.name}</Text>
          <Text style={styles.tileText}>{event.place}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tile: {
    height: 100,
    width: 350,
    backgroundColor: '#e91e63',
    padding: 16,
    borderBottomColor: '#ffffff',
    borderBottomWidth: 2
  },
  tileText: {
    color: '#ffffff'
  },
  flexContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});