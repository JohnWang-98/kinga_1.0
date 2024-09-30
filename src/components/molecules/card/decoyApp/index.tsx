import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import IDecoyApp from './decoyApp.interface';
import DecoyAppLogic from './decoyApp.logic';
import CustomText from '@/components/atoms/customText';
import EditIcon from '@/assets/icons/edit';
import RadioButton from '@/components/atoms/buttons/radio';
import {Fragment} from 'react';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation from React Navigation

export default function DecoyAppCard(props: IDecoyApp) {
  const {data, selectedOption, setSelectedOption} = props;
  const navigation = useNavigation(); // Initialize navigation hook
  const {handleNavigate} = DecoyAppLogic(data, setSelectedOption);

  return (
    <TouchableOpacity onPress={handleNavigate}>
      <View className=" mb-8 mx-3">
        <View
          className={`rounded-2xl ${
            data.image && 'h-44'
          } justify-between relative`}>
          {data.image && (
            <Fragment>
              <Image
                className="rounded-2xl absolute left-0 right-0 top-0 bottom-0 w-full h-full"
                source={data.image}
              />
              <View className="items-end p-3">
                <RadioButton
                  selected={selectedOption === data.id}
                  onPress={() => setSelectedOption(data.id)}
                />
              </View>
            </Fragment>
          )}
          <View
            className="px-5 py-3 relative flex-row items-center justify-between rounded-2xl"
            style={styles.blurOverlay}>
            <CustomText className="font-600 text-xl">{data.label}</CustomText>
            {data.image ? (
              <TouchableOpacity
                onPress={() => navigation.navigate(data.edit_route)}>
                <EditIcon />
              </TouchableOpacity>
            ) : (
              <RadioButton
                selected={selectedOption === data.id}
                onPress={() => setSelectedOption(data.id)}
              />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  blurOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
