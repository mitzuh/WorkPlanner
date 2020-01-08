import React from 'react';
import { Calendar } from 'react-native-calendars';
import { ToastAndroid } from 'react-native';

const date = new Date();
const formatedDate = date.toISOString().slice(0, 10);

/**
 * Class for calendar, which is used for picking a deadline for projects.
 */
export default class CustomCalendar extends React.Component {
  initialState = { [formatedDate]: { selected: true } }

  constructor(props) {
    super(props);

    this.state = { _markedDates: this.initialState, today: formatedDate }
  }

  /**
   * Sets deadline to current project in creation.
   */
  setDeadline = (day) => {
    this.props.setDeadline(day)
  }

  /**
   * Format date of selected day and set it to state as selected. Prevents choosing
   * past dates.
   */
  _onDayPress = (day) => {
    var toDate = new Date(day);
    toDate = toDate.toISOString().slice(0, 10)

    selection = { [toDate]: { selected: true } }

    if (JSON.stringify(this.state._markedDates) === (JSON.stringify(selection))) {
      if (this.state.today <= toDate) {
        this.props.nextStep()

        this.setDeadline(day)

        this.props.navigation.navigate('TextScreen', { text: 'Summary' })
      }
      else {
        ToastAndroid.show('Date already passed!', ToastAndroid.SHORT);
      }
    }
    this.setState({ _markedDates: selection });
  }

  render() {
    return (
      <Calendar
        // Set colors for calendar
        theme={{
          calendarBackground: '#243E4F',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: 'red',
          dayTextColor: 'white',
          textDisabledColor: 'grey',
          monthTextColor: 'white',
          arrowColor: '#3684ff'
        }}
        // Enable horizontal scrolling
        horizontal={true}
        // Enable paging on horizontal
        pagingEnabled={true}
        // Set first day of the week to Monday
        firstDay={1}
        // Show week numbers on calendar
        showWeekNumbers={true}

        markedDates={this.state._markedDates}

        onDayPress={(day) => this._onDayPress(day.dateString)}
      />
    )
  }
}