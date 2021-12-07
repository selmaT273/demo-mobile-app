import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

export default function App() {
  const [calendars, setCalendars] = useState();
  const [eventsForToday, setEventsForToday] = useState();

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
      <Text>Calendar Module Example</Text>
      <Button title="Create a new calendar" onPress={getEventsForToday} />
    </View>
  );
}



async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Expo Calendar' };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'Expo Calendar',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}

// const styles = StyleSheet.create({ ... }); 

// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Button style={styles.button} title="Add todo" color="pink"></Button>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

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
