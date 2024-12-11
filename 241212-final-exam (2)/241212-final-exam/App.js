import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import MindScreen from './screens/MindScreen';
import HealthScreen from './screens/HealthScreen';
import CommunityScreen from './screens/CommunityScreen';
import ProfileScreen from './screens/ProfileScreen';
import CreatePost from './screens/CreatePost';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 로그인 화면
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const JSON_URL =
      'https://raw.githubusercontent.com/simchzu/sampledata.json/refs/heads/main/login_info.json';

    fetch(JSON_URL)
      .then(response => response.json())
      .then(users => {
        const user = users.find(
          user => user.email === email && user.password === password
        );

        if (user) {
          navigation.replace('MainTabs'); // 탭 네비게이션으로 이동
        } else {
          Alert.alert('로그인 실패', '아이디 또는 비밀번호가 일치하지 않습니다.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('에러 발생', '로그인 요청 중 문제가 발생했습니다.');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleImgcontainer}>
        <Image
          source={require('./assets/logo.png')}
          style={{ height: 250, width: 250, borderRadius: 150 }}
        />
      </View>
      <View style={styles.inputContainerWrapper}>
        <Text style={styles.title}>ID</Text>
        <TextInput
          style={styles.inputContainer}
          placeholder=" 아이디 입력"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.title}>Password</Text>
        <TextInput
          style={styles.inputContainer}
          placeholder=" 비밀번호 입력"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}> Login </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// 탭 네비게이션
const MainTabs = () => {
  const getIconName = (routeName, focused) => {
    const iconMap = {
      Home: focused ? 'home' : 'home-outline',
      Mind: focused ? 'happy' : 'happy-outline',
      Health: focused ? 'fitness' : 'fitness-outline',
      Community: focused ? 'chatbubbles' : 'chatbubbles-outline',
      Profile: focused ? 'person' : 'person-outline',
    };
    return iconMap[routeName];
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = getIconName(route.name, focused);
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
        tabBarActiveTintColor: '#4D96FF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mind" component={MindScreen} />
      <Tab.Screen name="Health" component={HealthScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// 메인 앱 컴포넌트
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7FD',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleImgcontainer: {
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left', // 좌측 정렬
    width: '100%', // input과 일치하도록 너비 설정
  },
  inputContainerWrapper: {
    width: '100%', // Wrapper width를 inputContainer에 맞춤
    alignItems: 'flex-start', // 좌측 정렬
  },
  inputContainer: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    // 음영 효과 추가
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3, // 안드로이드 음영 효과
  },
  loginButton: {
    backgroundColor: '#4D96FF',
    borderRadius: 25,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});