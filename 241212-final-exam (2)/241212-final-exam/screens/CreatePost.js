import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
  StyleSheet,
  Alert,
} from 'react-native';

const CreatePost = ({ navigation, route }) => {
  const { setPosts } = route.params; // setPosts 받기

  const [category, setCategory] = useState('일반');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('오류', '제목과 내용을 모두 입력해주세요.');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      category,
      title,
      content,
    };

    // 기존 게시글에 새 게시글을 추가
    setPosts((prevPosts) => [...prevPosts, newPost]);
    Alert.alert('성공', '게시글이 저장되었습니다.');
    navigation.goBack(); // 게시글 작성 후 이전 화면으로 돌아가기
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>게시글 작성</Text>

      <Text style={styles.label}>카테고리</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="일반" value="일반" />
          <Picker.Item label="고민" value="고민" />
          <Picker.Item label="연애" value="연애" />
          <Picker.Item label="취업/진로" value="취업/진로" />
          <Picker.Item label="기타" value="기타" />
        </Picker>
      </View>

      <Text style={styles.label}>제목</Text>
      <TextInput
        style={styles.input}
        placeholder="제목을 입력하세요"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>내용</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="내용을 입력하세요"
        value={content}
        onChangeText={setContent}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>저장</Text>
      </TouchableOpacity>
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
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
    elevation: 3,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#4D96FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreatePost;