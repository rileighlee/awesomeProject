import React, {useState} from "react";
import {StyleSheet, View, TextInput, Text, Pressable} from 'react-native';

function GoalInput(props){
    const [enteredGoalText, setEnteredText] = useState('');

    // Defining the goal input handler
    function textInputHandler(enteredText) {
        setEnteredText(enteredText);
    };

    function addGoalHandler(){
        props.onAddGoal(enteredGoalText);
        setEnteredText ('');
    };

    return(
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={textInputHandler}
          placeholder="Your Course Goal!"
          value={enteredGoalText} // Bind the input value to the state
        />
          <Pressable
           onPress={addGoalHandler}
           onPressIn={() => console.log('Pressed In')}
           onPressOut={() => console.log('Pressed Out')}
           onLongPress={() => console.log('Long Pressed')}
            style={({ pressed }) => [
              styles.buttonContainer,
              {
                backgroundColor: pressed ? '#002547' : '#004369',
                // Adjust other styles as needed
              },
            ]}>
              <Text style={styles.buttonText}>Add Goal</Text>
          </Pressable>
        <View style={{ width: 16 }} />
          <Pressable
            style={({ pressed }) => [
              styles.resetButtonContainer,
              {
                backgroundColor: pressed ? '#560000' : '#750000',
                // Adjust other styles as needed
                opacity: props.resetDisabled ? 0.5 : 1, // Set opacity based on the disabled prop
              },
            ]}
            onPress={props.onResetGoals}
            disabled={props.resetDisabled}
            >
              <Text style={styles.buttonText}>Reset</Text>
          </Pressable>
        </View>
    );
}

export default GoalInput;

const styles = StyleSheet.create(
    {
        inputContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
            borderBottomColor: '#cccccc',
            borderBottomWidth: 1,
            marginHorizontal: 16,
            marginVertical: 120,
            flex: 3,
          },
          textInput: {
            borderColor: '#cccccc',
            borderWidth: 2,
            color: '#cccccc',
            width: '50%',
            marginRight: 8,
            padding: 13,
          },
          buttonContainer: {
            elevation: 6,
            paddingHorizontal: 8,
            paddingVertical: 6,
            flex: 3,
            flexDirection: 'row',
            borderRadius: 3,
            alignItems: 'center'
          },
          resetButtonContainer: {
            elevation: 6,
            paddingHorizontal: 5,
            paddingVertical: 6,
            flex: 3,
            flexDirection: 'row',
            borderRadius: 3,
            alignItems: 'center'
          },
          buttonText:{
            flex: 1,
            fontFamily: 'Roboto',
            color:'#fff',
            fontSize: 14,
            lineHeight: 21,
            textAlign: 'center'
          },
          
    }
)