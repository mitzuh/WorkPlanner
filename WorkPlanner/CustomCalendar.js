import React from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const date = new Date();
const formatedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

export default class CustomCalendar extends React.Component {
  initialState = {[formatedDate]: {selected: true}}

  constructor(props) {
    super(props);

    this.state = {_markedDates: this.initialState}
  }

  /**
   * Format date of selected day and set it to state as selected.
   */
  _onDayPress = (day) => {
    var toDate = new Date(day);
    toDate = toDate.toISOString().slice(0,10)

    selection = {[toDate]: {selected: true}}

    this.setState({ _markedDates: selection });
  }

  render() {
    return (
      <CalendarList
        // Enable horizontal scrolling.
        horizontal={true}
        // Enable paging on horizontal
        pagingEnabled={true}
        // Set first day of the week to Monday
        firstDay={1}

        markedDates={this.state._markedDates}

        onDayPress={(day) => this._onDayPress(day.dateString)}
      />
    )
  }
}