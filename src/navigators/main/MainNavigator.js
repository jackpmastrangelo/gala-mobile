import { createStackNavigator } from 'react-navigation';
import EventsDashboard from './EventsDashboard';

export default createStackNavigator(
  {
    Events: EventsDashboard
  },
  {
    initialRouteName: "Events"
  })