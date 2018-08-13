import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchEvents } from "../../state/api/fetchEventsState";
import EventsList from '../../components/EventsList';

class EventsDashboard extends React.Component {
  constructor(props) {
    super(props);
    props.dispatch(fetchEvents(props.authToken));
  }

  render() {
    let innerContent = <Text> Events should load here. </Text>;

    if (this.props.eventsFetching) {
      innerContent = <Text> Events are fetching... </Text>
    } else if (this.props.events) {
      innerContent = <EventsList events={this.props.events} />
    }

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        { innerContent }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    eventsFetching: state.fetchEventsState.fetching,
    eventsError: state.fetchEventsState.error,
    eventsErrorMessage: state.fetchEventsState.errorMessage,
    events: state.fetchEventsState.events,
    authToken: state.sessionState.token
  }
}

export default connect(mapStateToProps)(EventsDashboard);