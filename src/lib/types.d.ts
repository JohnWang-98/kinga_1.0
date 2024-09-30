declare module '*.svg' {
  import React, { ReactNode } from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

interface ISlides {
  id: string;
  title: string;
  description: string;
  image: any;
  bgColor: string;
}

interface Options {
  leftChildren?: () => JSX.Element;
  rightChildren?: (any) => JSX.Element;
  label: string;
  route?: Href<string | object>;
  id?: string;
  onSelected: (any) => void;
  buttonType:
    | 'navigation'
    | 'toggler'
    | 'player'
    | 'logout'
    | 'switch'
    | 'option'
    | undefined;
  switch?: (props: ISwitch) => JSX.Element;
  state: boolean;
  onToggleSwitch: (string, boolean) => void;
}

interface Contacts {
  id: string;
  name: string;
  number: string;
  profile: ImageSourcePropType | undefined;
}

interface Messages {
  senderEmail: string;
  senderPhone: string;
  senderName: string;
  message: string;
  location: { latitude: number; longitude: number };
  sendAt: string;
  new: boolean;
}

interface DecoyAppCard {
  id: number;
  label: string;
  image?: ImageSourcePropType | undefined;
  edit_route?: Href<string | object>;
  app_route?: Href<string | object>;
}
