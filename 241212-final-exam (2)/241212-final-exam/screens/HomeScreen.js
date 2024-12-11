import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
  Animated,
  Image,  // 추가
} from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ route }) {
  const navigation = useNavigation();
  const [isMoodModalVisible, setIsMoodModalVisible] = useState(false);
  const [isHealthModalVisible, setIsHealthModalVisible] = useState(false);
  const [moodData, setMoodData] = useState([20, 20, 20, 20, 20]);
  const [healthData, setHealthData] = useState([]);
  const [newWeight, setNewWeight] = useState('');
  const [newDate, setNewDate] = useState('');
  const [selectedMoodIndex, setSelectedMoodIndex] = useState(null);

  const userName = route.params?.userName || '';
  const currentHour = new Date().getHours();
  
  const getGreeting = () => {
    if (currentHour >= 5 && currentHour < 12) {
      return `좋은 아침이에요, ${userName}`;
    } else if (currentHour >= 12 && currentHour < 17) {
      return `좋은 오후예요, ${userName}`;
    } else if (currentHour >= 17 && currentHour < 21) {
      return `좋은 저녁이에요, ${userName}`;
    } else {
      return `좋은 밤이에요, ${userName}`;
    }
  };

  const moodLabels = ['좋음', '화남', '그저 그래요', '우울', '슬픔'];
  const moodColors = ['#34D399', '#F87171', '#FBBF24', '#60A5FA', '#A78BFA'];

  const pieChartData = moodData.map((value, index) => ({
    name: moodLabels[index],
    population: value,
    color: moodColors[index],
    legendFontColor: '#7F7F7F',
    legendFontSize: 14,
  }));

  const addMood = (index) => {
    const updatedMoodData = [...moodData];
    updatedMoodData[index] += 10; // 기분 데이터 업데이트
    setMoodData(updatedMoodData);
    setSelectedMoodIndex(index); // 선택된 기분 인덱스 저장
    setIsMoodModalVisible(false);
  };

  const addHealthData = () => {
    if (!newDate || !newWeight) return;
    const updatedHealthData = [
      ...healthData,
      { date: newDate, weight: parseFloat(newWeight) },
    ].slice(-7); // 최대 7개까지 유지
    setHealthData(updatedHealthData);
    setNewDate('');
    setNewWeight('');
    setIsHealthModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* 프로필 사진 추가 */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/profile.png')}  // 프로필 사진 URL 넣기
          style={styles.profileImage}
        />
      </View>
      
      <Text style={styles.welcomeText}>{getGreeting()}</Text>
      <Text style={styles.subText}>오늘은 기분이 어떠세요?</Text>

      {/* Mood Tracker */}
      <TouchableOpacity
        style={styles.trackerContainer}
        onPress={() => setIsMoodModalVisible(true)}
      >
        <Text style={styles.trackerTitle}>주간 기분 분석</Text>
        <PieChart
          data={pieChartData}
          width={screenWidth - 40}
          height={200}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 0]}
          absolute
        />
      </TouchableOpacity>

      {/* Health Tracker */}
      <TouchableOpacity
        style={styles.trackerContainer}
        onPress={() => setIsHealthModalVisible(true)}
      >
        <Text style={styles.trackerTitle}>체중 변화</Text>
        <LineChart
          data={{
            labels: healthData.length > 0 ? healthData.map((d) => d.date) : ['-'],
            datasets: [
              {
                data: healthData.length > 0 ? healthData.map((d) => d.weight) : [0],
              },
            ],
          }}
          width={screenWidth - 40}
          height={200}
          chartConfig={chartConfig}
          bezier
        />
      </TouchableOpacity>

      {/* Mood Modal */}
      <Modal
        transparent
        visible={isMoodModalVisible}
        animationType="fade"
        onRequestClose={() => setIsMoodModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>오늘의 기분은?</Text>
            <Text style={styles.modalSubtitle}>
              기분을 선택하고 오늘 하루를 기록해보세요.
            </Text>
            <View style={styles.moodCardContainer}>
              {moodLabels.map((mood, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.moodCard,
                    {
                      backgroundColor:
                        selectedMoodIndex === index ? moodColors[index] : '#fff',
                      shadowColor: selectedMoodIndex === index ? moodColors[index] : '#ccc',
                    },
                  ]}
                  onPress={() => addMood(index)}
                >
                  <Text
                    style={[
                      styles.moodCardText,
                      {
                        color: selectedMoodIndex === index ? '#fff' : '#333',
                      },
                    ]}
                  >
                    {mood}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsMoodModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Health Modal */}
      <Modal
        transparent
        visible={isHealthModalVisible}
        animationType="fade"
        onRequestClose={() => setIsHealthModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>체중 기록</Text>
            <Text style={styles.modalSubtitle}>
              날짜와 체중을 입력하고 기록하세요.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="날짜 (예: 11.26)"
              value={newDate}
              onChangeText={setNewDate}
              keyboardType="default"
            />
            <TextInput
              style={styles.input}
              placeholder="체중 (예: 63.5)"
              value={newWeight}
              onChangeText={setNewWeight}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.saveButton} onPress={addHealthData}>
              <Text style={styles.saveButtonText}>저장</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsHealthModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(72, 123, 247, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#4D96FF',
  },
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20, marginTop: 40 },
  profileContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // 원형으로 만들기
  },
  welcomeText: { fontSize: 28, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  subText: { fontSize: 18, color: '#777', marginBottom: 20 },
  trackerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
  },
  trackerTitle: { fontSize: 20, fontWeight: '600', marginBottom: 15, color: '#4D96FF' },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#4D96FF' },
  modalSubtitle: { fontSize: 14, color: '#555', marginBottom: 20, textAlign: 'center' },
  moodCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  moodCard: {
    width: '45%',
    height: 80,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 5,
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  moodCardText: { fontSize: 18, fontWeight: 'bold' },
  closeButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonText: { color: '#fff', fontSize: 16 },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#4D96FF',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
  },
  saveButtonText: { color: '#fff', fontSize: 16 },
});