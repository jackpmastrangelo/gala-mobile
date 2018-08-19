import { createStackNavigator } from 'react-navigation';
import EventsDashboard from './EventsDashboard';
import TicketScanner from './TicketScanner';

export default createStackNavigator(
  {
    Events: EventsDashboard,
    TicketScanner: TicketScanner
  },
  {
    mode: 'modal',
    initialRouteName: "Events"
  })