import { View, TouchableOpacity, Image } from 'react-native';
import IMusicApp from './musicApp.interface';
import MusicAppLogic from './musicApp.logic';
import { Frame } from '@/components/atoms/frame';
import { Switch } from 'react-native-paper';
import CustomText from '@/components/atoms/customText';
import { Colors } from '@/lib/colors';
import Slider from '@react-native-community/slider';
import PreviewIcon from '@/assets/icons/preview';
import RepeatIcon from '@/assets/icons/repeat';
import ShuffleIcon from '@/assets/icons/shuffle';
import NextIcon from '@/assets/icons/next';
import LyricsArrowIcon from '@/assets/icons/lyrics-arrow';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MusicApp(props: IMusicApp) {
  const {} = props;
  const {
    statusBarHeight,
    isSwitchOn,
    toggleSwitch,
    handleLike,
    like,
    handlePlay,
    isPlaying,
    handleRepeat,
    handlePrev,
    handleNext,
    handleShuffle,
  } = MusicAppLogic();

  return (
    <Frame
      className="bg-[#1C1B1B] relative"
      style={{
        paddingTop: (statusBarHeight || 0) + 20,
      }}>
      <View className="flex-row justify-between items-center mb-5 mt-2">
        <Switch
          value={isSwitchOn}
          onValueChange={toggleSwitch}
          color={Colors.primary_bright}
        />
        <CustomText className="text-[#DDDDDD] font-700 text-lg">
          Now Playing
        </CustomText>
        <MaterialCommunityIcons
          name="dots-vertical"
          color={'#DDDDDD'}
          size={20}
        />
      </View>
      <Image
        source={require('../../../../assets/images/cover.png')}
        className="rounded-3xl h-[50%] w-full mb-8"
      />
      <View className="flex-row items-center justify-between">
        <View>
          <CustomText className="text-[#DFDFDF] font-700 text-2xl">
            Love me like you do
          </CustomText>
          <CustomText className="text-[#BABABA] text-base leading-10">
            Ellie Goulding
          </CustomText>
        </View>
        <TouchableOpacity onPress={handleLike}>
          <Ionicons
            name={like ? 'heart-sharp' : 'heart-outline'}
            color={'#6C6C6C'}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Slider
          style={{ height: 40 }}
          className="w-full px-0 mx-0"
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#B7B7B7"
          maximumTrackTintColor="#888888"
          thumbTintColor="#B7B7B7"
        />
        <View className="flex-row justify-between">
          <CustomText className="text-[#878787] text-xs font-600">
            2:25
          </CustomText>
          <CustomText className="text-[#878787] text-xs font-600">
            4:02
          </CustomText>
        </View>
      </View>
      <View className="flex-row items-center justify-between px-12 mt-2.5">
        <TouchableOpacity onPress={handleRepeat}>
          <RepeatIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePrev}>
          <PreviewIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlay}>
          <View className="bg-primary-bright rounded-full p-5">
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={40}
              color={'white'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <NextIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShuffle}>
          <ShuffleIcon />
        </TouchableOpacity>
      </View>
      <View className="items-center absolute bottom-2 left-0 right-0">
        <LyricsArrowIcon />
        <CustomText className="text-[#B9B9B9] font-700 text-sm mt-3 ml-0.5">
          Lyrics
        </CustomText>
      </View>
    </Frame>
  );
}
