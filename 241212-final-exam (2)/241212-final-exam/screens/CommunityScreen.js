import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // @react-native-picker/picker 라이브러리 사용
import { Ionicons } from '@expo/vector-icons';

const CommunityScreen = () => {
  const [posts, setPosts] = useState([]); // 게시글 목록 상태 관리
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal 가시성 상태 관리
  const [category, setCategory] = useState('일반'); // 게시글 카테고리
  const [title, setTitle] = useState(''); // 게시글 제목
  const [content, setContent] = useState(''); // 게시글 내용

  const handlePostPress = (item) => {
    Alert.alert('게시글 선택', `선택한 게시글: ${item.title}`);
  };

  const handleSavePost = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('오류', '제목과 내용을 모두 입력해주세요.');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      category: category || '일반',
      title: title.trim(),
      content: content.trim(),
    };

    setPosts((prevPosts) => [...prevPosts, newPost]); // 게시글 추가
    setIsModalVisible(false); // Modal 닫기
    setTitle(''); // 제목 초기화
    setContent(''); // 내용 초기화
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>커뮤니티</Text>
      <FlatList
        data={posts || []} // 데이터가 없는 경우 빈 배열로 처리
        renderItem={({ item }) => (
          item ? (
            <TouchableOpacity onPress={() => handlePostPress(item)} style={styles.postItem}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postContent}>{item.content}</Text>
            </TouchableOpacity>
          ) : null
        )}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()} // 키를 안전하게 처리
        ListEmptyComponent={<Text style={styles.emptyText}>게시글이 없습니다.</Text>} // 데이터 없는 경우 표시
      />

      {/* 게시글 작성 버튼 */}
      <TouchableOpacity style={styles.fab} onPress={() => setIsModalVisible(true)}>
        <Ionicons name="create" size={30} color="white" />
      </TouchableOpacity>

      {/* 게시글 작성 Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
        onDismiss={() => setIsModalVisible(false)} // Modal 닫기 처리
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>게시글 작성</Text>

            {/* 카테고리 선택 */}
            <Text style={styles.label}>카테고리</Text>
            <Picker
              selectedValue={category}
              style={styles.picker}
              onValueChange={(itemValue) => setCategory(itemValue)}
            >
              <Picker.Item label="일반 고민" value="일반 고민" />
              <Picker.Item label="취업/진로" value="취업/진로" />
              <Picker.Item label="연애" value="연애" />
              <Picker.Item label="학업" value="학업" />
              <Picker.Item label="가족 관계" value="가족 관계" />
              <Picker.Item label="친구 관계" value="친구 관계" />
              <Picker.Item label="정신 건강" value="정신 건강" />
              <Picker.Item label="기타 고민" value="기타 고민" />
              
            </Picker>

            {/* 제목 입력 */}
            <Text style={styles.label}>제목</Text>
            <TextInput
              style={styles.input}
              placeholder="제목을 입력하세요"
              value={title}
              onChangeText={setTitle}
            />

            {/* 내용 입력 */}
            <Text style={styles.label}>내용</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="내용을 입력하세요"
              value={content}
              onChangeText={setContent}
              multiline
            />

            {/* 저장 버튼 */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSavePost}>
              <Text style={styles.saveButtonText}>저장</Text>
            </TouchableOpacity>

            {/* 취소 버튼 */}
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancelButtonText}>취소</Text>
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
    marginTop: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  postItem: {
    marginBottom: 15,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 14,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#aaa',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4D96FF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    maxHeight: '80%',
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 3,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#4D96FF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#555',
    fontSize: 16,
  },
});

export default CommunityScreen;