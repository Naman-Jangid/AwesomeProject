import {Pressable} from 'react-native';
import {ReactElement} from 'react';

interface PressableWrapperInterface {
  children: ReactElement;
  onPress?: () => void;
  onPressColor?: string;
  borderRadius?: number;
  wrapperStyle?: any;
}

const PressableWrapper = ({
  children,
  onPressColor,
  borderRadius,
  wrapperStyle,
  onPress,
}: PressableWrapperInterface): ReactElement => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.5 : 1,
          backgroundColor: pressed ? onPressColor : 'transparent',
          borderRadius: pressed ? borderRadius : 1,
        },
        wrapperStyle,
      ]}>
      {children}
    </Pressable>
  );
};
export default PressableWrapper;
