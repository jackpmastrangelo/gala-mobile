import { createBottomTabNavigator } from 'react-navigation';
import EventsDashboard from './EventsDashboard';

export default createBottomTabNavigator(
  {
    EventsDashboard: EventsDashboard
  },
  {
    initialRouteName: "EventsDashboard"
  })