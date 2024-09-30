import AudioIcon from '@/assets/icons/audio';
import CheveronRight from '@/assets/icons/cheveron-right';
import MixerIcon from '@/assets/icons/mixer';
import PaintingIcon from '@/assets/icons/painting';
import PlayIcon from '@/assets/icons/play';
import VolumeIcon from '@/assets/icons/volume';
import Label from '@/components/atoms/label';
import { StyleSheet } from 'react-native';
import { Track } from 'react-native-track-player';
import { Colors } from './colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152e42',
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1, // Ensure it renders above the tab bar
  },
});

export const jwtToken = 'jwt';

export const slides: ISlides[] = [
  {
    id: '1',
    title: 'Welcome to KINGA',
    description: '',
    image: require('../assets/images/main_logo.png'),
    bgColor: 'bg-[#162F42]',
  },
  {
    id: '2',
    title: 'Do you feel uncomfortable and scared?',
    description:
      'Trigger a fake call or text to create an excuse to leave an uncomfortable situation discreetly.',
    image: require('../assets/images/onb_1.png'),
    bgColor: 'bg-[#41B1BB]',
  },
  {
    id: '3',
    title: 'You don’t feel safe about where you are?',
    description:
      'Share your live location with trusted contacts and they receive real-time updates of your whereabouts.',
    image: require('../assets/images/onb_2.png'),
    bgColor: 'bg-[#A499E0]',
  },
  {
    id: '4',
    title: 'You know you are in danger and need help?',
    description:
      'Discreetly call 911, with a single tap and get help immediately.',
    image: require('../assets/images/onb_3.png'),
    bgColor: 'bg-[#3DA1B1]',
  },
];

export const decoyCallOptions: Options[] = [
  // {
  //   label: 'Display Settings',
  //   leftChildren: PaintingIcon,
  //   route: 'DisplaySettings',
  //   buttonType: 'navigation',
  // },
  // {
  //   label: 'Ring Settings',
  //   leftChildren: VolumeIcon,
  //   route: 'RingSettings',
  //   buttonType: 'navigation',
  // },
  {
    label: 'Recorded Conversation',
    leftChildren: AudioIcon,
    route: 'RecordVoice',
    buttonType: 'navigation',
  },
  // {
  //   label: 'Advanced',
  //   leftChildren: MixerIcon,
  //   route: 'Advanced',
  //   buttonType: 'navigation',
  // },
];

export const displaySettingsOptions: Options[] = [
  {
    label: 'Display name',
    buttonType: 'switch',
  },
  {
    label: 'Display Profile',
    buttonType: 'switch',
  },
  {
    label: 'Display phone number',
    buttonType: 'switch',
  },
];

export const ringSettingsOptions: Options[] = [
  {
    label: 'Ring tone',
    buttonType: 'navigation',
    rightChildren: CheveronRight,
  },
  {
    label: 'Ring profile',
    buttonType: 'navigation',
    rightChildren: Label,
  },
];

export const LocationBroadcastOptions: Options[] = [
  {
    label: 'Select Contacts ',
    buttonType: 'navigation',
    rightChildren: CheveronRight,
    route: 'SelectContacts',
  },
  {
    label: 'Customize text message',
    buttonType: 'navigation',
    route: 'CustomizeText',
  },
  {
    label: 'Received Message',
    buttonType: 'navigation',
    route: 'ReceivedText',
  },
];

// interface Messages {
//   senderEmail: string;
//   senderPhone: string;
//   senderName: string;
//   message: string;
//   location: { latitude: number; longitude: number };
//   sendAt: string;
//   new: boolean;
// }
export const sampleLocationMessages: Messages[] = [
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    profile: require('@/assets/images/caller_id.png'),
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    new: true,
  },
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    profile: require('@/assets/images/caller_id.png'),
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    new: true,
  },
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    new: true,
  },
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    new: true,
  },
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    profile: require('@/assets/images/caller_id.png'),
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    new: true,
  },
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    profile: require('@/assets/images/caller_id.png'),
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    new: true,
  },
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    new: true,
  },
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    new: true,
  },
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    profile: require('@/assets/images/caller_id.png'),
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    new: true,
  },
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    profile: require('@/assets/images/caller_id.png'),
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    new: true,
  },
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    new: true,
  },
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    new: true,
  },
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    profile: require('@/assets/images/caller_id.png'),
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    new: true,
  },
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    profile: require('@/assets/images/caller_id.png'),
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    isNew: true,
  },
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    isNew: true,
  },
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    isNew: true,
  },
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    profile: require('@/assets/images/caller_id.png'),
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    isNew: true,
  },
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    profile: require('@/assets/images/caller_id.png'),
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    isNew: true,
  },
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    isNew: true,
  },
  {
    senderEmail: '',
    senderPhone: '12345678',
    senderName: 'Maria',
    message: 'Please help me',
    location: { latitude: 123.42343, longitude: -23.5324 },
    sendAt: '2024-09-20T08:00:00Z',
    isNew: true,
  },
];

export const conversationsOptions: Options[] = [
  {
    label: 'Panicking mom',
    buttonType: 'player',
    rightChildren: PlayIcon,
  },
  {
    label: 'Panicking dad',
    buttonType: 'player',
    rightChildren: PlayIcon,
  },
  {
    label: 'Anxious girlfriend',
    buttonType: 'player',
    rightChildren: PlayIcon,
  },
  {
    label: 'Anxious boyfriend',
    buttonType: 'player',
    rightChildren: PlayIcon,
  },
];

export const customizeTextOptions: Options[] = [
  {
    label: 'Please send help {Location}',
    buttonType: 'player',
  },
  {
    label: 'My date is creepy send help {Location}',
    buttonType: 'player',
  },
  {
    label: 'Add New Message',
    buttonType: 'navigation',
    route: 'AddText',
  },
];

export const contacts: Contacts[] = [
  {
    id: '1',
    name: 'Boss',
    number: '+1-555-1234',
    profile: require('../assets/images/contact_10.png'),
  },
  {
    id: '2',
    name: 'Christie',
    number: '+1-555-5678',
    profile: require('../assets/images/contact_4.png'),
  },
  {
    id: '3',
    name: 'Shaun',
    number: '+1-555-9101',
    profile: require('../assets/images/contact_9.png'),
  },
  {
    id: '4',
    name: 'Brian',
    number: '+1-555-1123',
    profile: require('../assets/images/contact_8.png'),
  },
  {
    id: '5',
    name: 'John',
    number: '+1-555-3141',
    profile: require('../assets/images/contact_6.png'),
  },
  {
    id: '6',
    name: 'Pete',
    number: '+1-555-3141',
    profile: require('../assets/images/contact_5.png'),
  },
  {
    id: '7',
    name: 'Jesse',
    number: '+1-555-3141',
    profile: require('../assets/images/contact_9.png'),
  },
  {
    id: '8',
    name: 'Frank',
    number: '+1-555-3141',
    profile: require('../assets/images/contact_10.png'),
  },
  {
    id: '9',
    name: 'Sam',
    number: '+1-555-3141',
    profile: require('../assets/images/contact_4.png'),
  },
  {
    id: '10',
    name: 'Ingrid',
    number: '+1-555-3141',
    profile: require('../assets/images/contact_11.png'),
  },
  {
    id: '11',
    name: 'Boyfriend',
    number: '+1-555-3141',
    profile: require('../assets/images/contact_3.png'),
  },
  {
    id: '12',
    name: 'Sarah',
    number: '+1-555-3141',
    profile: require('../assets/images/contact_2.png'),
  },
  {
    id: '13',
    name: 'Elinda',
    number: '+1-555-3141',
    profile: require('../assets/images/contact_12.png'),
  },
  {
    id: '14',
    name: 'Josh',
    number: '+1-555-3141',
    profile: require('../assets/images/contact_13.png'),
  },
];

export const apps: DecoyAppCard[] = [
  {
    id: 0,
    label: 'Default Widget',
  },
  {
    id: 1,
    label: 'Music App',
    image: require('../assets/images/music.png'),
    edit_route: 'Controls',
    app_route: 'MusicApp',
  },
  // {
  //   id: 1,
  //   label: 'Bible App',
  //   image: require('../assets/images/bible.png'),
  //   app_route: 'MusicApp',
  // },
  // {
  //   id: 2,
  //   label: 'Recipe App',
  //   image: require('../assets/images/recipe.png'),
  //   app_route: 'MusicApp',
  // },
];

export const actionLabels: string[] = [
  'Trigger Call',
  'Send location',
  'Dial 911',
];

export enum ACTION_TYPE {
  TRIGGER_CALL = 0,
  SEND_LOCATION = 1,
  DIAL_911 = 2,
}

export const controlsOptions: Options[] = [
  {
    label: 'Play button',
    buttonType: 'navigation',
    rightChildren: Label,
    route: 'ControlOptions',
    id: 'playButton',
  },
  {
    label: 'Next button',
    buttonType: 'navigation',
    rightChildren: Label,
    route: 'ControlOptions',
    id: 'nextButton',
  },
  {
    label: 'Prev button',
    buttonType: 'navigation',
    rightChildren: Label,
    route: 'ControlOptions',
    id: 'prevButton',
  },
  {
    label: 'Repeat button',
    buttonType: 'navigation',
    rightChildren: Label,
    route: 'ControlOptions',
    id: 'repeatButton',
  },
  {
    label: 'Shuffle button',
    buttonType: 'navigation',
    rightChildren: Label,
    route: 'ControlOptions',
    id: 'shuffleButton',
  },
];

export const tracks: Track[] = [
  {
    id: 1,
    title: 'Hot Natured',
    artist: 'Chunda Munki',
    album: '',
    artwork: require('../assets/images/cover.png'),
    url: require('../assets/images/adaptive-icon.png'),
  },
];

export const PreferencesOptions: Options[] = [
  {
    label: 'Push notifications',
    buttonType: 'switch',
    id: 'pushnotify',
  },
];

export const supportOptions: Options[] = [
  {
    label: 'Report an issue',
    buttonType: 'navigation',
    rightChildren: CheveronRight,
  },
  {
    label: 'About KINGA',
    buttonType: 'navigation',
    rightChildren: CheveronRight,
  },
  {
    label: 'FAQ',
    buttonType: 'navigation',
    rightChildren: CheveronRight,
  },
];

export const logoutOption: Options[] = [
  {
    label: 'Logout',
    buttonType: 'logout',
  },
];

export const reasonsOptions: Options[] = [
  {
    label: 'I dont want to use this app anymore',
    buttonType: 'player',
  },
  {
    label: 'I have a problem with the app',
    buttonType: 'player',
  },
  {
    label: 'I have another account',
    buttonType: 'player',
  },
];

export const controlOptionsTypes = [
  {
    id: 'playButton',
    label: 'Play button',
  },
  {
    id: 'skipButton',
    label: 'Skip button',
  },
  {
    id: 'prevButton',
    label: 'Preview button',
  },
  {
    id: 'trackerBanner',
    label: 'Tracker banner',
  },
  {
    id: 'track',
    label: 'Track',
  },
];

export const controlOptions: Options[] = [
  {
    label: 'Trigger Call',
    buttonType: 'toggler',
  },
  {
    label: 'Send live location',
    buttonType: 'toggler',
  },
  {
    label: 'Dial 911',
    buttonType: 'toggler',
  },
];
