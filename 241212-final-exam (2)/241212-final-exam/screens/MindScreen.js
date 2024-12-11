import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

export default function MindScreen() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // 상담사 목록
  const doctors = [
    {
      id: 1,
      name: '김현철',
      image: require('../assets/doctor1.png'),
      experience: '10년 경력',
      location: '서울 강남구 테헤란로 123 강남마음클리닉 ',
      phone: '02-1234-5678',
    },
    {
      id: 2,
      name: '김지선',
      image: require('../assets/doctor2.png'),
      experience: '7년 경력',
      location: '서울 마포구 홍대로 77서울심리삼담소',
      phone: '02-9876-5432',
    },
    {
      id: 3,
      name: '서지혜',
      image: require('../assets/doctor3.png'),
      experience: '5년 경력',
      location: '부산 해운대구 센텀로 45 한빛정신건강의원',
      phone: '051-1234-5678',
    },
    {
      id: 4,
      name: '한재호',
      image: require('../assets/doctor4.png'),
      experience: '12년 경력',
      location: '대구 수성구 달구벌대로 88 마음샘병원',
      phone: '053-9876-5432',
    },
    {
      id: 5,
      name: '임윤민',
      image: require('../assets/doctor5.png'),
      experience: '13년 경력',
      location: '부산 진구 중앙대로 101 윤민 정신건강클리닉 ',
      phone: '051-1357-2468',
    },
  ];

  // 오늘의 사연 목록
  const [issues, setIssues] = useState([
    {
      id: 1,
      category: '기타',
      title: '감정이 너무 쉽게 요동쳐요',
      description: '작은 일에도 기분이 크게 오르고 내리는데, 스스로 감정을 다스리는 게 너무 어려워요. 괜히 주변 사람들에게 짜증을 내고 후회하기도 해요. 왜 이렇게 민감한 걸까요? 어떻게 하면 마음을 더 단단하게 만들 수 있을까요?',
      likes: 120,
    },
    {
      id: 2,
      category: '가족 관계',
      title: '가족인데도 대화가 너무 어려워요',
      description: '가족들과 이야기하면 항상 오해가 쌓이고 싸움으로 끝나요. 내가 잘못된 걸까요, 아니면 서로 너무 달라진 걸까요? 가족이라는 울타리에서 왜 이렇게 고립감을 느끼는지 모르겠어요.',
      likes: 95,
    },
    {
      id: 3,
      category: '연애',
      title: '사랑받는 게 부담스러울 때',
      description: '상대방이 나를 너무 사랑해주는데, 이상하게 저는 그 마음이 무겁게 느껴져요. 진심으로 고맙지만, 한편으로는 제 자신이 그 기대에 미치지 못할 것 같아 도망치고 싶어요. 이런 제가 문제인 걸까요?',
      likes: 88,
    },
    {
      id: 4,
      category: '친구 관계',
      title: '가면을 쓴 것 같은 내 모습',
      description: '친구들과 어울릴 때 항상 밝고 즐거운 척하지만, 집에 돌아오면 너무 지치고 공허해요. 진짜 제 모습을 보여주면 사람들에게 멀어질까 봐 두려워요. 나를 있는 그대로 받아줄 사람은 없는 걸까요?',
      likes: 75,
    },
    {
      id: 5,
      category: '정신 건강',
      title: '내가 점점 없어지는 기분이에요',
      description: '하고 싶은 것도, 좋아하는 것도 점점 사라지고 있는 느낌이에요. 무언가를 열심히 해보려고 해도 금방 포기하게 되고, 그냥 흘러가는 대로 살고 있는 것 같아요. 어떻게 해야 나 자신을 다시 찾을 수 있을까요?',
      likes: 60,
    },
  ]);

  // 좋아요 증가 함수 (좋아요 수 갱신 후 정렬)
  const handleLike = (issueId) => {
    setIssues((prevIssues) => {
      const updatedIssues = prevIssues.map((issue) =>
        issue.id === issueId ? { ...issue, likes: issue.likes + 1 } : issue
      );

      // 좋아요 수에 따라 내림차순 정렬
      updatedIssues.sort((a, b) => b.likes - a.likes);

      return updatedIssues;
    });
  };

  return (
    <LinearGradient colors={['#ffffff', '#f0f4ff']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 상담사 소개 섹션 */}
        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>상담사 소개</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.profileScroll}>
            {doctors.map((doctor) => (
              <TouchableOpacity
                key={doctor.id}
                style={styles.profile}
                onPress={() => {
                  setSelectedDoctor(doctor);
                  setModalVisible(true);
                }}
              >
                <Image source={doctor.image} style={styles.profileImage} />
                <Text style={styles.profileName}>{doctor.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 오늘의 사연 섹션 */}
        <View style={styles.issueSection}>
          <Text style={styles.sectionTitle}>오늘의 사연</Text>
          {issues.map((issue) => (
            <View key={issue.id} style={styles.issueCard}>
              <View style={styles.issueHeader}>
                <Text style={styles.issueCategory}>{issue.category}</Text>
              </View>
              <Text style={styles.issueTitle}>{issue.title}</Text>
              <Text style={styles.issueDescription}>{issue.description}</Text>
              <View style={styles.issueFooter}>
                <Text style={styles.issueLikes}>❤️ {issue.likes} likes</Text>
                <TouchableOpacity onPress={() => handleLike(issue.id)}>
                  <Ionicons name="heart" size={24} color="#4D96FF" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 상담사 프로필 Modal */}
      {selectedDoctor && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={selectedDoctor.image} style={styles.modalImage} />
              <Text style={styles.modalName}>{selectedDoctor.name}</Text>
              <Text style={styles.modalText}>경력: {selectedDoctor.experience}</Text>
              <Text style={styles.modalText}>병원 위치: {selectedDoctor.location}</Text>
              <Text style={styles.modalText}>전화번호: {selectedDoctor.phone}</Text>
              {/* 닫기 버튼 */}
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={28} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 30,
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  profileSection: {
    marginBottom: 30,
  },
  profileScroll: {
    paddingHorizontal: 5,
  },
  profile: {
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15, 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  profileName: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  issueSection: {
    marginBottom: 30,
  },
  issueCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  issueHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  issueCategory: {
    color: '#4D96FF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  issueTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  issueDescription: {
    fontSize: 14,
    marginTop: 10,
    color: '#555',
  },
  issueFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  issueLikes: {
    fontSize: 14,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: screenWidth - 40,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#ccc',
    borderRadius: 50,
    padding: 10,
  },
});