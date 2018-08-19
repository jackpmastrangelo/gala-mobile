import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchEvents } from "../../state/api/fetchEventsState";
import EventsList from '../../components/EventsList';

class EventsDashboard extends React.Component {
  static navigationOptions = {
    title: "My Events"
  };

  constructor(props) {
    super(props);
    props.dispatch(fetchEvents(props.authToken));
  }

  //TODO thought that I'd have to pass a callback from a component that has navigation. Check this
  //TODO Pretty sure you can also pass the navigation down the chain, not sure which is preferable.
  pushTicketScanner = event => {
        this.props.navigation.push("TicketScanner", {event: event});
  };

  refreshEvents = () => {
    this.props.dispatch(fetchEvents(this.props.authToken));
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <EventsList events={this.props.events}
                    refreshEvents={this.refreshEvents}
                    onEventPress={this.pushTicketScanner}/>
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