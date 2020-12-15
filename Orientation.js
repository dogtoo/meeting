import React, { useReducer } from 'react';
import { View, Dimensions, Platform } from 'react-native';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
import { useStateValue } from './Auth';

export default function Orientation() {
  const [state, dispatch] = useStateValue();
  let screenSize = 'xs';
  const isExtraLarge = useMediaQuery({ query: '(min-device-width: 1920px)' });
  const isLarge = useMediaQuery({
    query: '(min-device-width: 1280px) and (max-device-width: 1920px)',
  });
  const isMedium = useMediaQuery({
    query: '(min-device-width: 960px) and (max-device-width: 1280px)',
  });
  const isSmall = useMediaQuery({
    query: '(min-device-width: 600px) and  (max-device-width: 960px)',
  });
  const isExtraSmall = useMediaQuery({
    query: '(min-device-width: 0px) and (max-device-width: 600px)',
  });

  if (isExtraSmall) screenSize = 'xs';
  else if (isSmall) screenSize = 'sm';
  else if (isMedium) screenSize = 'md';
  else if (isLarge) screenSize = 'lg';
  else if (isExtraLarge) screenSize = 'xl';

  const onLayout = () => {
    dispatch({
      type: 'ON_LAYOUT',
      payload: {
        screenWidth: Dimensions.get('window').width,
        screenHeight: Dimensions.get('window').height,
        orientation:
          Dimensions.get('window').height >= Dimensions.get('window').width
            ? 'PORTRAIT'
            : 'LANDSCAPE',
        platformPadding: Platform.OS === 'android' ? 23 : 0,
        platformOS: Platform.OS,
        screenSize,
      },
    });
  };

  return <View onLayout={() => onLayout()}></View>;
}
