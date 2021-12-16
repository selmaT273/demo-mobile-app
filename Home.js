import { StyleSheet, View, Text, Button } from 'react-native';
import * as Calendar from 'expo-calendar';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

export default function Home() {
  const [calendars, setCalendars] = useState();
  const [eventsForToday, setEventsForToday] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const myCalendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        setCalendars(myCalendars);
      }
    })();
  }, []);

  async function getEventsForToday() {
    const importantCalendar = calendars.filter(c => c.title === "T.Lasagna ");
    const startOfDay = moment().startOf("day").toDate();
    const endOfDay = moment().endOf("day").toDate();
    const events = await Calendar.getEventsAsync([importantCalendar.id], startOfDay, endOfDay);
    setEventsForToday(events.map(e => e.title));
    console.log('Here is your important calendar');
    console.log( { eventsForToday });
  }

  return (
    <View style={styles.container}>
      <Text>Daily Events Example</Text>
      <Button title="Get Today's Events" onPress={getEventsForToday} />
      {eventsForToday.map(et => <Text key={et}>{et}</Text>)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#f0f',
    borderColor: '#000'
  }
});