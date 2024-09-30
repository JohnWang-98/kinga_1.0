import CustomText from '@/components/atoms/customText';
import IConversations from './conversations.interface';
import ConversationsLogic from './conversations.logic';
import { ScrollFrame } from '@/components/atoms/frame';
import KingaCard from '@/components/molecules/card/kinga';
import InnerHeader from '@/components/molecules/header/inner';
import Options from '@/components/molecules/options';
import { conversationsOptions } from '@/lib/constants';
import { View } from 'react-native';
import MicIcon from '@/assets/icons/mic';
import Separator from '@/components/atoms/separator';
import { StyleSheet } from 'react-native';

export default function Conversations(props: IConversations) {
  const {} = props;
  const { handleNavigate } = ConversationsLogic();
  return (
    <View style={styles.container}>
      <ScrollFrame>
        <InnerHeader label="Conversations" gobackLabel="Settings" />
        <Separator />
        <KingaCard
          title="Record Voice"
          titleClassName="font-400 text-sm"
          subtitle="Record a decoy message for when you answer."
          arrow
          children={<MicIcon />}
          onPress={handleNavigate}
        />
        <View className="my-4 text-center">
          <CustomText className="text-center font-300">or</CustomText>
        </View>
        <Options
          label="Pick from our prerecorded voices"
          options={conversationsOptions}
        />
        <Separator />
        <Options
          label="Pick from yout prerecorded voices"
          options={conversationsOptions}
        />
      </ScrollFrame>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152e42',
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1, // Ensure it renders above the tab bar
  },
});
