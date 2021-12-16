import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Calendar({route, navigation}) {
  const { eventsForToday } = route.params;
  console.log(eventsForToday);
  
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Calendar Screen</Text>
      {eventsForToday.map(e => {
        <Text key={e}>{e}</Text>
      })}
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}