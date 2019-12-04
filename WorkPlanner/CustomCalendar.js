import React from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const date = new Date();
const formatedDate = date.toISOString().slice(0,10);

export default class CustomCalendar extends React.Component {
  initialState = {[formatedDate]: {selected: true}}

  constructor(props) {
    super(props);

    this.state = {_markedDates: this.initialState}
    console.log(this.state._markedDates)
  }

  /**
   * Format date of selected day and set it to state as selected.
   */
  _onDayPress = (day) => {
    var toDate = new Date(day);
    toDate = toDate.toISOString().slice(0,10)

    selection = {[toDate]: {selected: true}}

    console.log(selection)
    if (JSON.stringify(this.state._markedDates) === (JSON.stringify(selection))) {
      this.props.navigation.navigate('AddProjectScreen', {date: day})
    }
    this.setState({ _markedDates: selection });
  }

  render() {
    return (
      <Calendar
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