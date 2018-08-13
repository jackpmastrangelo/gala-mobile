import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import EventTile from './EventTile';

export default class EventsList extends React.Component {
  render() {
    let eventTiles = [];

    this.props.events.forEach((event, ind) => {
      eventTiles.push(<EventTile event={event}
                                 key={ind}
                                 onEventPress={this.props.onEventPress}/>)
    });

    eventTiles.push(
      <TouchableOpacity onPress={() => { this.props.refreshFunction() }}
                        style={{flex: 1, justifyContent:'center', alignItems: 'center'}}
                        key={eventTiles.length}>
        <View style={{height: 100}}><Text>Refresh</Text></View>
      </TouchableOpacity>
    );

    return (
      <ScrollView>
        {eventTiles}
      </ScrollView>
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