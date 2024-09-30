import {View, TouchableOpacity, StyleSheet} from 'react-native';
import IRadio from './radio.interface';
import RadioLogic from './radio.logic';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function RadioButton(props: IRadio) {
  const {selected, isMultiSelect = false, ...rest} = props;
  const {} = RadioLogic();

  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <MaterialIcons name="check" style={styles.checkIcon} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#C6C4C4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: '#00C7D7',
    borderColor: '#00C7D7',
  },
  checkIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
  },
});
