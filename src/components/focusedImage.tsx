import React, { useState, useEffect } from 'react';
import Animated from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';

type Props = {
  source: any;
  sharedTransitionTag: string;
  style: any;
  resizeMode?: any;
};

const FocusedImage = ({ source, sharedTransitionTag, style, resizeMode }: Props) => {
  const isFocused = useIsFocused();
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (isFocused) {
      // remount immediately when focused
      setShouldRender(true);
    } else {
      // delay unmount so transition can complete first
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 600); // 600ms covers the transition duration
      return () => clearTimeout(timer);
    }
  }, [isFocused]);

  if (!shouldRender) return null;

  return (
    <Animated.Image
      source={source}
      sharedTransitionTag={sharedTransitionTag}
      style={style}
      resizeMode={resizeMode}
    />
  );
};

export default FocusedImage;