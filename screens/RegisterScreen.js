import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { BlurView } from 'expo-blur';
import colors from 'config/colors';
import { useState } from 'react';
import { radius, spacingX, spacingY } from 'config/spacing';
import Typo from 'components/Typo';
import { normalizeY } from 'utils/normalize';
import { Octicons } from '@expo/vector-icons';
import AppButton from 'components/AppButton';
import { useNavigation } from '@react-navigation/native';
import useAuth from 'auth/useAuth';
const { width, height } = Dimensions.get('screen');
let paddingTop = Platform.OS === 'ios' ? height * 0.07 : spacingY._10;

function RegisterScreen(props) {
  const navigation = useNavigation();
  const Auth = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <View style={[styles.c1, { opacity: 0.7 }]} />
        <View style={[styles.pinkCircle, { opacity: 0.7 }]} />
        <View style={[styles.c2, { opacity: 0.7 }]} />
      </View>
      <BlurView intensity={100} tint="light" style={styles.blurContainer}>
        <Typo size={26} style={styles.text}>
          Hello There!
        </Typo>
        <View style={{ marginVertical: '5%' }}>
          <Typo size={20} style={styles.body}>
            Join Us to Unlock a World
          </Typo>
          <Typo size={20} style={styles.body}>
            of Shopping Delights!
          </Typo>
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
            style={styles.input}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            style={styles.input}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            style={styles.input}
            secureTextEntry={isSecure}
          />
          {isSecure ? (
            <TouchableOpacity onPress={() => setIsSecure(false)}>
              <Octicons name="eye-closed" size={20} color="grey" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setIsSecure(true)}>
              <Octicons name="eye" size={20} color="grey" />
            </TouchableOpacity>
          )}
        </View>
        <AppButton
          onPress={() => Auth.setUser('123')}
          label={'Register'}
          style={{
            backgroundColor: '#D84040', 
            borderRadius: radius._12,
            marginTop: spacingY._40,
          }}
        />

        <View style={styles.orContinueRow}>
          <View style={styles.line} />
          <Typo>or continue with</Typo>
          <View style={styles.line} />
        </View>
        <View style={[styles.orContinueRow, { width: '85%', gap: spacingX._15 }]}>
          <Icon icon={require('../assets/google.png')} />
          <Icon icon={require('../assets/apple.png')} />
          <Icon icon={require('../assets/facebook.png')} />
        </View>
        <TouchableOpacity
          style={[styles.orContinueRow, { gap: spacingX._5, marginTop: '15%' }]}
          onPress={() => navigation.navigate('Signin')}>
          <Typo>Already a memeber?</Typo>
          <Typo style={{ color: colors.blue }}>Signin</Typo>
        </TouchableOpacity>
      </BlurView>
    </SafeAreaView>
  );
}

const Icon = ({ icon }) => {
  return (
    <TouchableOpacity style={styles.iconBg}>
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurContainer: {
    ...StyleSheet.absoluteFill,
    paddingTop: paddingTop,
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
    marginTop: spacingY._15,
    shadowColor: colors.lightPink,
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
  c1: {
    width: width / 1.5,
    height: width / 1.5,
    borderRadius: width / 2,
    backgroundColor: colors.lightBlue,
    alignSelf: 'flex-end',
    position: 'absolute',
    top: '25%',
  },
  c2: {
    height: normalizeY(100),
    backgroundColor: colors.lightPink,
    width: '90%',
    alignSelf: 'center',
    bottom: '25%',
  },
  pinkCircle: {
    width: width / 1.5,
    height: width / 1.5,
    borderRadius: width / 2,
    backgroundColor: colors.lightPink,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  orContinueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: spacingY._10,
    marginTop: '10%',
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

export default RegisterScreen;
