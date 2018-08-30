import React from 'react';
import { FlatList } from 'react-native';
import EventTile from './EventTile';
import EmptyEventsList from './EmptyEventsList';

export default class EventsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    }
  }

  componentDidUpdate() {
    if (this.state.refreshing) {
        this.setState({refreshing: false});
    }
  }

  renderEventItem = ({item}) => {
    return (
        <EventTile event={item} key={item.id} onEventPress={this.props.onEventPress}/>
    );
  };

  onRefresh = () => {
    this.setState({refreshing: true});
    this.props.refreshEvents();
  };

  render() {
    return (
        <FlatList data={this.props.events}
                  keyExtractor={item => item.id}
                  renderItem={this.renderEventItem}
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                  ListEmptyComponent={<EmptyEventsList />}/>
    )
  }
}