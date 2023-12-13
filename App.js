import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Modal, Pressable, Dimensions } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import PushPinIcon from '@mui/icons-material/PushPin';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isResetDisabled, setResetDisabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const [resetConfirmationVisible, setResetConfirmationVisible] = useState(
    false
  );
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleWarningModal = () => {
    setWarningModalVisible(!warningModalVisible);
  };

  const toggleResetConfirmation = () => {
    setResetConfirmationVisible(!resetConfirmationVisible);
  };

  const addGoalHandler = (enteredGoalText) => {
    if (enteredGoalText.trim() === '') {
      return;
    }

    const updatedGoals = [
      ...courseGoals,
      { text: enteredGoalText, key: Math.random().toString() },
    ];

    setCourseGoals(updatedGoals);
    setResetDisabled(false);

    if (updatedGoals.length > 5) {
      setWarningModalVisible(true);
    }
  };

  const confirmResetHandler = () => {
    setCourseGoals([]);
    setResetDisabled(true);
    setWarningModalVisible(false);
    setResetConfirmationVisible(false);
  };

  return (
    <View style={styles.appContainer}>
      <Pressable onPress={toggleModal} style={styles.iconUser}>
        <AccountCircleIcon style={styles.iconUser} />
      </Pressable>
      <Image style={styles.image1} source={require('./assets/goal.jpg')} />
      <View style={styles.logoContainer}>
        <Image source={require('./assets/logo1.png')} style={styles.logo} />
      </View>

      <GoalInput
        onAddGoal={addGoalHandler}
        onResetGoals={toggleResetConfirmation}
        resetDisabled={isResetDisabled}
      />

      <View style={styles.goalsContainer}>
        <View style={styles.goalListContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>
              <PushPinIcon style={styles.cookieIcon} />
              List of Goals
            </Text>
          </View>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => (
              <View style={styles.goalItemContainer}>
                <GoalItem
                  text={itemData.item.text}                />
              </View>
            )}
          />

          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.textModal}>Welcome user!</Text>
                <Pressable onPress={toggleModal}>
                  <Text style={styles.textModalHide}>Hide</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <Modal
            visible={warningModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={toggleWarningModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.textModal}>
                  Warning: Too many goals! Consider focusing on your top priorities.
                </Text>
                <Pressable onPress={toggleWarningModal}>
                  <Text style={styles.textModalHide}>Hide</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <Modal
            visible={resetConfirmationVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setResetConfirmationVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.textModal}>
                  Are you sure you want to reset all goals?
                </Text>
                <Pressable onPress={confirmResetHandler}>
                  <Text style={styles.textModalHide}>Yes</Text>
                </Pressable>
                <Pressable onPress={toggleResetConfirmation}>
                  <Text style={styles.textModalNo}>No</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E95793'
  },
  goalsContainer: {
    flex: 5,
    paddingHorizontal: 16,
  },
  goalItemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#a2abab',
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  goalListContainer: {
    flex: 5,
    maxHeight: '50%',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 400,
    justifyContent: 'center',
  },
  image1: {
    flex: 6,
    height: '10%',
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  textModal: {
    color: '#000',
    fontFamily: 'Roboto',
  },
  textModalHide: {
    color: 'red',
    fontFamily: 'Roboto',
  },
  textModalNo: {
    color: 'blue',
    fontFamily: 'Roboto'
  },
  iconUser: {
    fontSize: 50,
    position: 'absolute',
    top: 10,
    left: 15,
    zIndex: 1,
    backgroundColor: 'transparent', // Set background color to transparent
  },
});