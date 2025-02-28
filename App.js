import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from 'navigation/AppNavigator';
import { StatusBar } from 'react-native';
import { useState } from 'react';
import AuthNavigator from 'navigation/AuthNavigator';
import AuthContext from 'auth/AuthContext';  // ✅ Import AuthContext
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './redux/queryClient';
import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {
  const [user, setUser] = useState(null);  // ✅ Manage user authentication state

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ user, setUser }}>
          <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              {user ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer>
          </GestureHandlerRootView>
        </AuthContext.Provider>
      </QueryClientProvider>
    </Provider>
  );
}
