import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import EventTile from './EventTile';

export default class EventsList extends React.Component {
  render() {
    let eventTiles = [];

    this.props.events.forEach((event, ind) => {
      eventTiles.push(<EventTile event={event}
                                 key={ind}
                                 onEventPress={this.props.onEventPress}/>)
    });

    return (
      <View style={styles.tiles}>
        {eventTiles}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tiles: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});