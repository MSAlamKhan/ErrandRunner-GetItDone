import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import ScreenHeader from '../../../components/header/ScreenHeader';
import TaskContainer from '../../../components/Task/TaskContainer';
import SearchInput from '../../../components/inputs/SearchInput';
import { Colors } from '../../../constant/Colors';
import CustomButton from '../../../components/buttons/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { get_Menu } from '../../../redux/actions/CustomerAction';
import FullScreenLogin from '../../../components/Loader/FullScreenLoader';
import { moderateScale } from 'react-native-size-matters-ch';
import RNLocation from 'react-native-location';
import { ADD_LOCATION } from '../../../redux/reducers/CustomerReducer';

const Dashboard = ({ navigation }) => {
  const [selectedMenuData, setSelectedMenuData] = useState([]);
  const menu_data = useSelector(state => state.customer.menu_data);
  const loading = useSelector(state => state.customer.is_loading);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [search, setSearch] = useState([]);

  const dispatch = useDispatch();
  const getmenu = () => {
    dispatch(get_Menu(setFilteredDataSource));
  };
  useEffect(() => {
    getmenu();
    permission();
  }, []);

  const permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('====================================');
        console.log('yes permission');
        console.log('====================================');
        RNLocation.getLatestLocation().then(latestLocation => {
          dispatch({
            type: ADD_LOCATION,
            payload: {
              latitude: latestLocation.latitude,
              longitude: latestLocation.longitude,
            },
          });
        });
        RNLocation.configure({
          distanceFilter: 100, // Meters
          desiredAccuracy: {
            ios: 'best',
            android: 'balancedPowerAccuracy',
          },
          // Android only
          androidProvider: 'auto',
          interval: 5000, // Milliseconds
          fastestInterval: 10000, // Milliseconds
          maxWaitTime: 5000, // Milliseconds
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // const taskContainerHandler = item => {
  //   const sameValue = selectedMenuData.some(i => i.id == item.id);
  //   if (sameValue) {
  //     const filterItem = selectedMenuData.filter(i => i.id != item.id);
  //     setSelectedMenuData(filterItem);
  //   } else {
  //     selectedMenuData.push(item);

  //     console.log(selectedMenuData);
  //   }
  // };
  // console.log('aaaa', selectedMenuData);

  const taskContainerHandler = item => {
    const isFound = selectedMenuData.some(element => {
      if (element.id === item.id) {
        return true;
      }
      return false;
    });

    if (isFound == true) {
      setSelectedMenuData(prev => prev.filter(e => e.id !== item.id));
    } else {
      setSelectedMenuData(prev => prev.concat(item));
    }
  };

  // const searchFilterFunction = text => {
  //   console.log('AAAAAAAAA', text);
  //   if (text) {
  //     const newData = selectedMenuData.filter(function (item) {
  //       // const itemData = item.title;
  //       //   ? item.title.toUpperCase()
  //       //   : ''.toUpperCase();
  //       // const textData = text.toUpperCase();
  //       // return itemData.indexOf(textData) > -1;
  //     });
  //     // setSelectedMenuData(newData);
  //   } else {
  //     setSelectedMenuData(selectedMenuData);
  //   }
  // };

  const searchFilterFunction = text => {
    if (text) {
      const newData = filteredDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(menu_data);
      setSearch(text);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader />
      <Text style={styles.titleText}>What you want to be done?</Text>
      <SearchInput onChangeText={text => searchFilterFunction(text)} />
      {loading ? (
        <FullScreenLogin />
      ) : (
        <View style={styles.tasksContainer}>
          <FlatList
            data={filteredDataSource}
            numColumns="2"
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              const check = selectedMenuData.some(i => item.id == i.id);
              console.log('check', check);
              return (
                <TaskContainer
                  title={item.title}
                  iconColor={check ? Colors.themeWhite : Colors.themeRed}
                  containerStyle={{
                    backgroundColor: check
                      ? Colors.themeRed
                      : Colors.lightPurpleDashBoardBoxBackground,
                  }}
                  onPress={() => taskContainerHandler(item)}
                  icon_name={item.icon_name}
                  icon_type={item.icon_type}
                />
              );
            }}
          />
          {selectedMenuData.length > 0 ? (
            <CustomButton
              style={{ margin: 30 }}
              title={'Go'}
              onPress={() => {
                navigation.navigate('addDetails', { selectedMenuData })
                setSelectedMenuData([]);
              }
              }
            />
          ) : null}
        </View>
      )}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.themeWhite,
    flex: 1,
  },
  titleText: {
    color: Colors.themeRed,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 30,
    width: 200,
    fontSize: 24,
  },
  tasksContainer: {
    flex: 1,
    // height: moderateScale(400),
  },
  taskFlatlistItem: {
    alignSelf: 'center',
    alignItems: 'center',
  },
});
