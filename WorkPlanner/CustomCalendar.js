import React from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class CustomCalendar extends React.Component {
  constructor(props) {
    super(props);

    var date = new Date();
    var formatedDate = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`

    this.state = {selectedDate: formatedDate}
  }
  render() {
    console.log(this.state.selectedDate)
    return (
      <CalendarList
        // Enable horizontal scrolling.
        horizontal={true}
        // Enable paging on horizontal
        pagingEnabled={true}
        // Set first day of the week to Monday
        firstDay={1}

        markedDates={{
          '2019-11-29': {selected: true, selectedColor: 'blue'},
        }}

        onDayPress={(day) => {console.log('selected day', day)}}
      />
    )
  }
}