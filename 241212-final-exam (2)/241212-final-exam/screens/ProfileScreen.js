import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userBio, setUserBio] = useState('');
  const [goal, setGoal] = useState('');
  const [profileImage] = useState(require('../assets/profile.png')); // 기본 프로필 사진

  const handleSaveProfile = () => {
    if (userName.trim() === '') {
      Alert.alert('프로필 저장', '이름을 입력해주세요.');
      return;
    }

    // 이름 변경 후 HomeScreen으로 이동하며 userName을 파라미터로 전달
    navigation.navigate('Home', { userName });
    Alert.alert('프로필 저장', `프로필이 저장되었습니다: ${userName}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>내 정보</Text>

      {/* User Info Section */}
      <View style={styles.userInfoContainer}>
        {/* 프로필 이미지 */}
        <Image
          source={profileImage}
          style={styles.profileImage}
        />

        {/* 이름 입력 */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder="이름을 입력하세요"
            placeholderTextColor="#777"
          />
        </View>

        {/* 자기소개 입력 */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.bioInput]}
            value={userBio}
            onChangeText={setUserBio}
            placeholder="자기소개를 입력하세요"
            placeholderTextColor="#777"
            multiline
          />
        </View>
      </View>

      {/* 목표 설정 Section */}
      <View style={styles.goalContainer}>
        <Text style={styles.subHeader}>목표 설정</Text>
        <TextInput
          style={styles.input}
          value={goal}
          onChangeText={setGoal}
          placeholder="목표를 입력하세요"
          placeholderTextColor="#777"
        />
      </View>

      {/* 저장 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>저장</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    marginTop: 40,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    marginTop: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  userInfoContainer: {
    marginBottom: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#F3F7FD',
    marginBottom: 20,
    marginTop: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#f5f5f5', // 배경색으로 음영을 추가
    borderRadius: 5, // 둥근 모서리
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // 안드로이드 음영 효과
  },
  input: {
    width: '100%',
    height: 45,
    fontSize: 16,
    paddingLeft: 10,
    color: '#333',
    backgroundColor: '#f5f5f5',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  goalContainer: {
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#4D96FF',
    borderRadius: 15,
    marginBottom: 15,
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;