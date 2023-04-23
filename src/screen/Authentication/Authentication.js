import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useContext} from 'react';
import Login from '../../components/TwoWayScreen/Login';
import Signup from '../../components/TwoWayScreen/Signup';
import TwoWayHeader from '../../components/header/TwoWayHeader';
import {Colors} from '../../constant/Colors';
import {Context} from '../../context/ContextFile';
import {useDispatch, useSelector} from 'react-redux';
import {LOGIN, SOCIAL_LOGIN_DETAILS} from '../../redux/reducers/AuthReducer';

const Authentication = () => {
  // const [login, setLogin] = useState(true);
  const dispatch = useDispatch();
  const login = useSelector(state => state.auth.login);

  return (
    <View style={styles.container}>
      <TwoWayHeader
        leftTitle="Login "
        rightTitle="SignUp"
        first={login}
        onPressLeft={() => {
          dispatch({type: LOGIN, payload: true});
          dispatch({type: SOCIAL_LOGIN_DETAILS, payload: ''});
        }}
        onPressRight={() => dispatch({type: LOGIN, payload: false})}
      />
      {login ? <Login /> : <Signup />}
    </View>
  );
};

export default Authentication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeWhite,
  },
});
