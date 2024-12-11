import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Dimensions, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const ExerciseLogScreen = () => {
  const [exerciseLog, setExerciseLog] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: '',
    duration: '',
    intensity: '',
  });

  const exerciseIntensities = ['낮음', '보통', '높음'];

  const handleAddExercise = () => {
    if (!newExercise.name || !newExercise.duration || !newExercise.intensity) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    const dateStr = selectedDate.toISOString().split('T')[0];
    const updatedLog = { ...exerciseLog };

    if (!updatedLog[dateStr]) {
      updatedLog[dateStr] = [];
    }

    updatedLog[dateStr].push({ ...newExercise });
    setExerciseLog(updatedLog);

    setNewExercise({ name: '', duration: '', intensity: '' });
    setIsModalVisible(false);
  };

  const renderExercises = () => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const logs = exerciseLog[dateStr] || [];

    return logs.length > 0 ? (
      <FlatList
        data={logs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text style={styles.exerciseTitle}>{item.name}</Text>
            <Text style={styles.exerciseDetails}>
              {item.duration}분 | {item.intensity} 강도
            </Text>
          </View>
        )}
      />
    ) : (
      <Text style={styles.noExercises}>선택된 날짜에 운동 기록이 없습니다.</Text>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>운동 기록</Text>

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
        <Text style={styles.dateText}>
          {selectedDate.toISOString().split('T')[0]}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setSelectedDate(date);
          }}
        />
      )}

      {renderExercises()}

      <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>운동 추가</Text>
            <TextInput
              style={styles.input}
              placeholder="운동 이름"
              value={newExercise.name}
              onChangeText={(text) => setNewExercise({ ...newExercise, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="운동 시간 (분)"
              keyboardType="numeric"
              value={newExercise.duration}
              onChangeText={(text) => setNewExercise({ ...newExercise, duration: text })}
            />
            <Picker
              selectedValue={newExercise.intensity}
              style={styles.picker}
              onValueChange={(value) => setNewExercise({ ...newExercise, intensity: value })}
            >
              <Picker.Item label="운동 강도 선택" value="" />
              {exerciseIntensities.map((intensity, index) => (
                <Picker.Item key={index} label={intensity} value={intensity} />
              ))}
            </Picker>
            <TouchableOpacity style={styles.saveButton} onPress={handleAddExercise}>
              <Text style={styles.saveButtonText}>저장</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop: 40
  },
  datePickerButton: {
    backgroundColor: '#F0F8E8',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  exerciseItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#555',
  },
  noExercises: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4D96FF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: screenWidth - 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#4D96FF',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExerciseLogScreen;