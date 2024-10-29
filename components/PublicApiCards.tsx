import { View, ScrollView, StyleSheet, PanResponder } from 'react-native';
import PublicApiCard from '@/components/PublicApiCard';
import useIsRootScreen from '@/hooks/useIsRootScreen';
import { publicApis } from '@/data/PublicApis';
import { shuffleArray } from '@/utils/utils';
import React, { useRef } from 'react';


const PublicApiCards: React.FC = () => {
  const scrollRef = useRef<ScrollView | null>(null);
  const scrollStartX = useRef(0);
  const isRoot = useIsRootScreen();
  const styles = getStyles(isRoot);
  const randomizedApiList = shuffleArray(publicApis);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
      onPanResponderGrant: () => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ x: scrollStartX.current, animated: false });
        }
      },
      onPanResponderMove: (_, gestureState) => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            x: scrollStartX.current - gestureState.dx,
            animated: false,
          });
        }
      },
      onPanResponderRelease: () => {
        if (scrollRef.current) {
          scrollStartX.current = scrollRef.current.getScrollableNode().scrollLeft || 0;
        }
      },
    })
  ).current;

  return (
    <View style={styles.outerContainer} {...(!isRoot ? panResponder.panHandlers : {})}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        ref={scrollRef}
        horizontal={!isRoot}
        showsHorizontalScrollIndicator={!isRoot}
        showsVerticalScrollIndicator={isRoot}
      >
        <View style={styles.container}>
          {randomizedApiList.map((api, index) => (
            <PublicApiCard key={index} api={api} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const getStyles = (isRoot: boolean) =>
  StyleSheet.create({
    outerContainer: {
      flex: 1,
    },
    scrollViewContainer: {
      width: '100%',
      ...(isRoot && { flexGrow: 1 }),
    },
    container: {
      flexDirection: 'row',
      paddingVertical: 10,
      ...(isRoot && { 
        flexWrap: 'wrap',
        width: '100%',
      }),
    },
  });

export default PublicApiCards;
