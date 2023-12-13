import React, {useState} from "react";
import { StyleSheet, View, Text } from "react-native";

function GoalItem(props) {
  return (
    <View style={styles.goalItems}>
      <Text style={styles.goalText}>{props.text}</Text>
    </View>
      );
}

export default GoalItem;

const styles = StyleSheet.create(
    {
        goalText: {
            color: '#000',
            fontWeight: 15,
          },
    }
)