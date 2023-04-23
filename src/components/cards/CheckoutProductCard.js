import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constant/Colors';
import {Font} from '../../constant/Font';

const CheckoutProductCard = props => {
  return (
    <View style={styles.productContainer}>
      <Text style={styles.nameText}>{props.title}</Text>
      <Text style={styles.descriptionLocText}>{props.name}</Text>
      <Text style={styles.descriptionLocText}>{props.description}</Text>
      <View style={styles.ammountCotainer}>
        <Text style={styles.EstText}>
          EstimatedAmount:
          {/* {props.estimated_cost} */}
        </Text>
        <Text style={styles.amountText}>${props.EstAmmount}</Text>
      </View>
    </View>
  );
};

export default CheckoutProductCard;

const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: Colors.ContainerBg,
    paddingHorizontal: 30,
    marginBottom: 20,
    marginHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  nameText: {
    fontFamily: Font.Poppins500,
    color: Colors.darkfont,
    fontSize: 16,
  },
  descriptionLocText: {
    fontFamily: Font.Poppins400,
    color: Colors.lightfont,
    fontSize: 14,
  },
  ammountCotainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 18,
  },
  EstText: {
    fontFamily: Font.Poppins500,
    color: Colors.darkfont,
  },
  amountText: {
    fontFamily: Font.Poppins500,
    color: Colors.themeRed,
  },
});
