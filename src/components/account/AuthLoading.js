import React, { useContext, useEffect } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Spinner } from '../common';
import {
  NAVIGATION_AUTH_STACK_PATH,
  NAVIGATION_LOGIN_STACK_PATH,
} from '../../navigation/routes';
import { magento } from '../../magento';
import { logError } from '../../helper/logger';
import { ThemeContext } from '../../theme';

const AuthLoading = (props) => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const customerToken = await AsyncStorage.getItem('customerToken');
      magento.setCustomerToken(customerToken);

      props.navigation.navigate(
        customerToken
          ? NAVIGATION_AUTH_STACK_PATH
          : NAVIGATION_LOGIN_STACK_PATH,
      );
    } catch (e) {
      logError(e);
      // TODO: add error screen via switch navigation
      props.navigation.navigate(NAVIGATION_LOGIN_STACK_PATH);
    }
  };

  return (
    <View style={styles.container(theme)}>
      <ActivityIndicator
            color='#0a1142'
            size='large'
            style={{
              flex: 1,
              justifyContent: 'center'
            }}
          />
      <StatusBar barStyle="default" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    alignContent: 'center',
    flexDirection: 'column',
    backgroundColor: theme.colors.background,
  }),
});

export default AuthLoading;