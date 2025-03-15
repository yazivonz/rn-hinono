import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import colors from 'config/colors';
import { useContext, useState, useCallback, useMemo, memo } from 'react';
import { useMutation } from "@tanstack/react-query";
import { radius, spacingX, spacingY } from 'config/spacing';
import Typo from 'components/Typo';
import { normalizeY } from 'utils/normalize';
import { Octicons } from '@expo/vector-icons';
import AppButton from 'components/AppButton';
import { useNavigation } from '@react-navigation/native';
import useAuth from 'auth/useAuth';
import axios from 'axios';
import baseURL from '../assets/common/baseURL';
import { loginAction } from '../redux/authSlice';
import AuthContext from '../auth/AuthContext';
import { useDispatch } from 'react-redux';

const { width, height } = Dimensions.get('screen');

// Memoize the Icon component to prevent unnecessary re-renders
const Icon = memo(({ icon }) => {
  return (
    <TouchableOpacity style={styles.iconBg}>
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
  );
});

// Background components wrapped in memo to prevent re-rendering
const BackgroundElements = memo(() => (
  <View style={styles.background}>
    <View style={[styles.c1, { opacity: 0.5 }]} />
    <View style={[styles.orangeCircle, { bottom: '25%', left: '5%', opacity: 0.5 }]} />
    <View style={[styles.orangeCircle, { opacity: 0.4 }]} />
    <View style={styles.c2} />
  </View>
));

function SigninScreen() {
  // Hooks
  const Auth = useAuth();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthContext);
  
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Memoize the paddingTop value
  const paddingTop = useMemo(() => 
    Platform.OS === 'ios' ? height * 0.07 : spacingY._10,
  []);

  // Memoized welcome text to prevent re-rendering
  const welcomeText = useMemo(() => (
    <View style={{ marginVertical: '5%' }}>
      <Typo size={20} style={styles.body}>
        Welcome back you've
      </Typo>
      <Typo size={20} style={styles.body}>
        been missed!
      </Typo>
    </View>
  ), []);

  // Optimized input handlers
  const handleEmailChange = useCallback((text) => {
    setEmail(text);
  }, []);

  const handlePasswordChange = useCallback((text) => {
    setPassword(text);
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setIsSecure(prev => !prev);
  }, []);

  // Optimized navigation handler
  const navigateToRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  // Optimized login mutation
  const loginMutation = useMutation({
    mutationFn: () => {
      return axios.post(`${baseURL}/login`, { email, password });
    },
    onSuccess: (response) => {
      const data = response.data;
      dispatch(loginAction(data));
      setUser(data);
 
    },
    onError: (error) => {
      console.error("Login error:", error);
      Alert.alert(
        "Login Failed", 
        "Your Email or Password is Incorrect. Try Again",
        [{ text: "OK" }]
      );
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  // Optimized sign in handler
  const handleSignIn = useCallback(() => {
    if (!email || !password) {
      Alert.alert("Missing Information", "Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    loginMutation.mutate();
  }, [email, password, loginMutation]);

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundElements />
      <BlurView 
        intensity={100} 
        tint="light" 
        style={[styles.blurContainer, { paddingTop }]}
      >
        <Typo size={26} style={styles.text}>
          Hello Again!
        </Typo>
        
        {welcomeText}
        
        <View style={styles.inputView}>
          <TextInput
            value={email}
            onChangeText={handleEmailChange}
            placeholder="Enter email"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputView}>
          <TextInput
            value={password}
            onChangeText={handlePasswordChange}
            placeholder="Password"
            style={styles.input}
            secureTextEntry={isSecure}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Octicons 
              name={isSecure ? "eye-closed" : "eye"} 
              size={20} 
              color="grey" 
            />
          </TouchableOpacity>
        </View>
        
        <Typo style={styles.recoverTxt}>Forgot Password</Typo>
        
        <AppButton
          onPress={handleSignIn}
          label={isLoading ? 'Signing in...' : 'Sign in'}
          disabled={isLoading || loginMutation.isPending}
          style={{ 
            backgroundColor: '#D84040', 
            borderRadius: radius._12,
            opacity: isLoading ? 0.7 : 1 
          }}
        />

        <View style={styles.divider}>
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />
        </View>
        
        <TouchableOpacity
          style={styles.registerRow}
          onPress={navigateToRegister}
        >
          <Typo>Not a member?</Typo>
          <Typo style={{ color: colors.blue }}>Register now</Typo>
        </TouchableOpacity>
      </BlurView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurContainer: {
    ...StyleSheet.absoluteFill,
    padding: spacingY._20,
    paddingBottom: '10%',
    textAlign: 'center',
    overflow: 'hidden',
    borderRadius: radius._20,
  },
  background: {
    flex: 1,
    paddingBottom: '10%',
    justifyContent: 'flex-end',
    ...StyleSheet.absoluteFill,
  },
  inputView: {
    backgroundColor: colors.white,
    borderRadius: radius._15,
    borderCurve: 'continuous',
    marginTop: spacingY._15,
    shadowColor: colors.lightBlue,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: spacingX._15,
  },
  input: {
    paddingVertical: spacingY._20,
    paddingHorizontal: spacingX._20,
    fontSize: normalizeY(16),
    flex: 1,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: '15%',
  },
  body: {
    textAlign: 'center',
    alignSelf: 'center',
    margin: 2,
  },
  recoverTxt: {
    alignSelf: 'flex-end',
    marginTop: spacingY._15,
    marginBottom: '7%',
  },
  c1: {
    width: width / 1.5,
    height: width / 1.5,
    borderRadius: width / 2,
    backgroundColor: colors.lightBlue,
    alignSelf: 'flex-end',
  },
  c2: {
    width: width / 1.2,
    height: width / 1.2,
    borderRadius: width / 2,
    backgroundColor: '#fee2e2',
    opacity: 0.8,
    marginBottom: 50,
    alignSelf: 'flex-end',
  },
  orangeCircle: {
    width: width / 1.5,
    height: width / 1.5,
    borderRadius: width / 2,
    backgroundColor: '#fed7aa',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: spacingY._10,
    marginTop: '10%',
  },
  registerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: spacingX._5,
    marginTop: '15%',
  },
  iconBg: {
    flex: 1,
    borderWidth: normalizeY(2),
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacingY._10,
    borderRadius: radius._10,
  },
  icon: {
    height: normalizeY(25),
    width: normalizeY(25),
  },
  line: {
    height: 1,
    width: '20%',
    backgroundColor: colors.black,
  },
});

export default memo(SigninScreen);