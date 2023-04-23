import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import React, {useDebugValue, useState, useCallback} from 'react';
import {Colors} from '../../../constant/Colors';
import Input from '../../../components/inputs/Inputs';
import {useForm} from 'react-hook-form';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CustomButton from '../../../components/buttons/CustomButton';
import {NavigationContainer} from '@react-navigation/native';
import InputWithoutUseForm from '../../../components/inputs/InputWithoutUseForm';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {base_Url, token} from '../../../constant/BaseUrl';
import {Font} from '../../../constant/Font';
import {useEffect} from 'react';
// import {loc} from '../../../redux/actions/CustomerAction';
// import {dropLoc} from '../../../redux/actions/CustomerAction';

const AddDetails = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {selectedMenuData} = route.params;
  const userDetails = useSelector(state => state.auth.user_details);
  console.log('userDetails', userDetails);
  // const locVal = useSelector(state => state.customer.pickUpLoc);
  // const dropLocVal = useSelector(state => state.customer.dropOffLoc);

  // console.log('pickup Loccccc', locVal);

  const [deliveryCharges, setDeliveryCharges] = useState('');

  const fetchDeliveryCharges = async () => {
    try {
      let base_url = `${base_Url}/get_delivery_charges.php`;
      let formData = new FormData();
      formData.append('token', token);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      if (responseData.status == true) {
        console.log('get_delivery_charges DATa', responseData.data[0].cost);
        setDeliveryCharges(responseData.data[0].cost);
      }
    } catch (error) {
      console.log('get_delivery_charges', error);
    }
  };

  useEffect(() => {}, [dropOffLoc]);

  useFocusEffect(
    useCallback(() => {
      fetchDeliveryCharges();
    }, []),
  );

  console.log('get_delivery_charges', deliveryCharges);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});

  const declare = selectedMenuData.map(item => {
    return {
      title: item.title,
      name: '',
      description: '',
      estimated_cost: '',
      pickup_location: '',
      menu_item_id: item.id,
    };
  });

  const onSubmit = data => {
    let permission;
    permission = inputs.every(item =>
      item.description == '' ||
      item.estimated_cost == '' ||
      item.name == '' ||
      item.pickup_location == '' ||
      dropOffLoc == ''
        ? false
        : true,
    );
    console.log('====================================');
    console.log('Permission => ', permission);
    console.log('====================================');
    if (permission) {
      navigation.navigate('checkout', {
        inputs: inputs,
        dropOffLoc,
        dropCordinates,
        deliveryCharges,
      });
    } else {
      alert('Please Fill the Details');
    }

    console.log('INPUTSS', inputs);
    console.log('dropOffLoc', dropOffLoc);

    // console.log('CCCCCCCCCCCCCCCCCCCCCCCCCC', data);
  };

  const [inputs, setInputs] = useState(declare);
  const [dropOffLoc, setDropOffLoc] = useState('');
  const [dropCordinates, setDropCordinates] = useState({});

  // console.log('SAAAAAAAAAAAAAAAAAAAA', inputs);

  const nameChange = (item, key) => {
    const _inputs = [...inputs];
    _inputs[key].name = item;
    setInputs(_inputs);
  };

  const descriptionChange = (item, key) => {
    const _inputs = [...inputs];
    _inputs[key].description = item;
    setInputs(_inputs);
  };

  const estimatedCost = (item, key) => {
    const _inputs = [...inputs];
    _inputs[key].estimated_cost = item;
    setInputs(_inputs);
  };

  const pickupLocation = (item, key) => {
    const _inputs = [...inputs];
    _inputs[key].pickup_location = item;
    setInputs(_inputs);
  };

  const pickupCordinates = (item, key) => {
    const _inputs = [...inputs];
    _inputs[key].pick_lat = item.latitude;
    _inputs[key].pick_lon = item.longitude;
    setInputs(_inputs);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <KeyboardAvoidingView style={{flex: 1}}> */}
      <Text style={styles.headerText}>Details</Text>
      {inputs.map((item, index) => {
        return (
          <View key={item.id}>
            <Text style={styles.itemText}>{item.title}</Text>

            <InputWithoutUseForm
              control={control}
              style={styles.inputContainer}
              textStyle={styles.inputTextColor}
              value={item.name}
              onChangeText={text => nameChange(text, index)}
              placeholder="Name"
              placeholderTextColor={'#32323266'}
            />

            {errors.name && (
              <Text style={styles.error}>{errors.name.message} </Text>
            )}
            <InputWithoutUseForm
              control={control}
              textStyle={styles.inputTextColor}
              style={styles.inputContainer}
              name="Description"
              value={item.description}
              onChangeText={text => descriptionChange(text, index)}
              rules={{
                required: '* Descriptions is required',
              }}
              placeholder="Descriptions"
              placeholderTextColor={'#32323266'}
            />

            {errors.Description && (
              <Text style={styles.error}>{errors.Description.message} </Text>
            )}
            <InputWithoutUseForm
              keyboardType={'number-pad'}
              textStyle={styles.inputTextColor}
              control={control}
              style={styles.inputContainer}
              value={item.estimated_cost}
              onChangeText={text => estimatedCost(text, index)}
              name="estimated"
              rules={{
                required: '*Estimated Cost is required',
              }}
              //   onSubmitEditing={handleSubmit(onSubmit)}

              placeholder="Estimated Cost"
              placeholderTextColor={'#32323266'}
            />

            {errors.estimated && (
              <Text style={styles.error}>{errors.estimated.message} </Text>
            )}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('map', {
                  pickupLocation,
                  pickupCordinates,
                  index,
                })
              }>
              <View style={styles.locationContainer}>
                <Text
                  numberOfLines={1}
                  style={{fontFamily: Font.Poppins300, color: Colors.greyfont}}>
                  {inputs[index].pickup_location
                    ? inputs[index].pickup_location
                    : 'PickUp Location'}
                </Text>
                <SimpleLineIcons
                  name="location-pin"
                  size={20}
                  color={Colors.themeRed}
                />
              </View>
            </TouchableOpacity>
            {errors.pickup && (
              <Text style={styles.error}>{errors.pickup.message} </Text>
            )}
          </View>
        );
      })}
      <Text style={styles.dropLocationText}>Drop Location</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('dropOffMap', {
            setDropOffLoc,
            setDropCordinates,
          })
        }>
        <View style={styles.locationContainer}>
          <Text
            numberOfLines={1}
            style={{fontFamily: Font.Poppins300, color: Colors.greyfont}}>
            {dropOffLoc ? dropOffLoc : 'Drop-off Location'}
          </Text>
          <SimpleLineIcons
            name="location-pin"
            size={20}
            color={Colors.themeRed}
          />
        </View>
      </TouchableOpacity>
      <View style={{height: 10}}></View>
      <CustomButton
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        title="Continue"
      />
      {/* </KeyboardAvoidingView> */}
    </ScrollView>
  );
};

export default AddDetails;

const styles = StyleSheet.create({
  container: {
    // height: '99%',
    backgroundColor: Colors.themeWhite,
  },
  headerText: {
    color: Colors.themeRed,
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  itemText: {
    color: Colors.themeRed,
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    // textAlign: 'center',
    paddingLeft: 10,
    marginTop: 10,
  },
  inputTextColor: {
    color: Colors.inputText,
  },
  inputContainer: {
    backgroundColor: Colors.textInputBackground,
    paddingLeft: 10,
    width: '95%',
    borderRadius: 10,
    marginBottom: 10,
  },
  dropLocationText: {
    color: Colors.themeRed,
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    // textAlign: 'center',
    paddingLeft: 10,
    marginTop: 10,
  },
  locationIcon: {
    position: 'absolute',
    right: 5,
    top: 12,
    backgroundColor: '#fff',
    width: 30,
  },
  button: {
    marginBottom: 20,
    // position: 'absolute',
    // bottom: 10,
  },
  locationContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    padding: 10,
  },
});
