import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ILocationMessages from './locationMessages.interface';
import LocationMessagesLogic from './locationMessages.logic';
import CustomText from '@/components/atoms/customText';
import { Fragment, useEffect } from 'react';
import RadioButton from '@/components/atoms/buttons/radio';
import SelectedContacts from '@/components/atoms/selectedContacts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { sampleLocationMessages } from '@/lib/constants';
import { Badge } from 'react-native-paper';
import { Colors } from '@/lib/colors';
import {
  getMoreMessagesRequest,
  markNotificationReadRequest,
} from '@/lib/services/locationBroadcast';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function LocationMessages(props: ILocationMessages) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [locationMessages, setLocationMessages] = useState([]);
  const [lastCount, setLastCount] = useState(0);
  const [endReached, setEndReached] = useState(false);
  const navigation = useNavigation();

  const loadMoreMessages = async () => {
    const res = await getMoreMessagesRequest(lastCount, 10);

    if (res.success) {
      const moreMessages = res.data.data;
      if (moreMessages.length === 0) {
        setEndReached(true);
        return;
      }

      setLocationMessages([...locationMessages, ...moreMessages]);
      setLastCount(lastCount + moreMessages.length);
    }
  };

  // Use useFocusEffect to refresh the UI when the screen is focused
  useFocusEffect(
    useCallback(() => {
      // Logic to refresh UI or fetch new data
      handleLoadMore();
      // Optionally, return a cleanup function
      return () => {
        console.log('Screen is unfocused');
      };
    }, []),
  );

  const handleLoadMore = async () => {
    if (endReached) return;

    if (isLoadingMore) return; // Prevent multiple triggers

    setIsLoadingMore(true);
    await loadMoreMessages(); // Assuming this function fetches more messages and updates the state in parent component
    setIsLoadingMore(false);
  };

  const handleViewMessage = async index => {
    console.log('Viewing message', locationMessages[index]);

    const res = await markNotificationReadRequest(locationMessages[index].id);
    if (res.success) {
      console.log(res.data.message);
      locationMessages[index].status = 'read';
      setLocationMessages([...locationMessages]);
    }

    navigation.navigate('LocationMessage', {
      message: locationMessages[index],
    });
  };

  const renderMessageItem = ({ item, index }) => {
    const isNew = item.status !== 'read';

    return (
      <Fragment key={index}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => handleViewMessage(index)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {item?.profile ? (
              <Image
                source={item.profile}
                style={{ width: 48, height: 48, borderRadius: 24 }}
              />
            ) : (
              <MaterialCommunityIcons
                name="account-alert-outline"
                size={48}
                color="#fff"
              />
            )}
            <View style={{ marginLeft: 10 }}>
              <CustomText>{item.from.fullName}</CustomText>
              <CustomText>{item.message}</CustomText>
            </View>
          </View>

          {isNew && (
            <Badge
              size={16}
              style={{
                position: 'absolute',
                top: 12,
                right: 4,
                backgroundColor: 'red',
              }}></Badge>
          )}
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            marginVertical: 8,
          }}
        />
      </Fragment>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={locationMessages}
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5} // Load more when scrolled 50% from the bottom
        ListFooterComponent={() =>
          isLoadingMore ? <ActivityIndicator size={24} color="white" /> : null
        }
      />
    </View>
  );

  // return (
  //   <View>
  //     {messages.map((message, index) => (
  //       <Fragment key={index}>
  //         <TouchableOpacity
  //           className="flex-row justify-between items-center"
  //           onPress={() => handleViewMessage(index)}>
  //           <View className="flex-row items-center">
  //             {message?.profile !== undefined ? (
  //               <Image source={message?.profile} className="w-12 h-12" />
  //             ) : (
  //               <MaterialCommunityIcons
  //                 name="account-alert-outline"
  //                 size={48}
  //                 color="#fff"
  //               />
  //             )}
  //             <View className="flex-row items-center">
  //               <CustomText className="ml-3">{message.senderName}</CustomText>
  //               <CustomText className="ml-3">{message.message}</CustomText>
  //             </View>
  //           </View>
  //         </TouchableOpacity>
  //         <View className="flex-1 h-[1px] bg-white/20 my-2" />
  //       </Fragment>
  //     ))}
  //   </View>
  // );
}
