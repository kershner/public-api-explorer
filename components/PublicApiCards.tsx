import { View, ScrollView, StyleSheet, PanResponder } from 'react-native';
import React, { useRef, useState, useMemo } from 'react';
import PublicApiCard from '@/components/PublicApiCard';
import useIsRootScreen from '@/hooks/useIsRootScreen';
import { Picker } from '@react-native-picker/picker';
import { publicApis } from '@/data/PublicApis';
import { shuffleArray } from '@/utils/utils';
import { useStore } from '@/store/useStore';

const randomizedApiList = shuffleArray(publicApis);

const PublicApiCards: React.FC = () => {
  const scrollRef = useRef<ScrollView | null>(null);
  const scrollStartX = useRef(0);
  const isRoot = useIsRootScreen();
  const colors = useStore((state) => state.colors);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredApis = selectedCategory === "All"
    ? randomizedApiList
    : randomizedApiList.filter(api => api.category === selectedCategory);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        outerContainer: {
          flex: 1,
        },
        innerContainer: {
          flexDirection: isRoot ? 'column' : 'row',
          alignItems: 'center'
        },
        pickerContainer: {
          marginVertical: 8,
          marginRight: isRoot ? 0 : 8,
          borderRadius: 4,
          borderWidth: 2,
          borderColor: colors.textPrimary,
          overflow: 'hidden',
          height: 40,
          width: isRoot ? 200 : 100,
        },
        picker: {
          backgroundColor: colors.background,
          color: colors.textPrimary,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderWidth: 0,
        },
        scrollViewContainer: {
          width: '100%',
          ...(isRoot && { flexGrow: 1 }),
        },
        container: {
          flexDirection: 'row',
          flexWrap: isRoot ? 'wrap' : 'nowrap',
          paddingVertical: 10,
          alignItems: 'flex-start',
          justifyContent: isRoot ? 'center' : 'flex-start',
          ...(isRoot && {
            width: '100%',
          }),
        },
      }),
    [colors, isRoot]
  );

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
    <View style={styles.outerContainer}>
      <View 
        {...(!isRoot ? panResponder.panHandlers : {})}
        style={styles.innerContainer} >
        
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
            style={styles.picker}
          >
            <Picker.Item label="All" value="All" />
            {[...new Set(publicApis.map(api => api.category))].map(category => (
              <Picker.Item key={category} label={category} value={category} />
            ))}
          </Picker>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          ref={scrollRef}
          horizontal={!isRoot}
          showsHorizontalScrollIndicator={!isRoot}
          showsVerticalScrollIndicator={isRoot}
        >
          <View style={styles.container}>
            {filteredApis.map((api, index) => (
              <PublicApiCard key={index} api={api} index={index} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default PublicApiCards;
