import { View, ScrollView, StyleSheet, PanResponder, Text } from 'react-native';
import PublicApiCard from '@/components/PublicApiCards/PublicApiCard';
import React, { useRef, useState, useMemo } from 'react';
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
          container: {
            flexDirection: isRoot ? 'column' : 'row-reverse',
            alignItems: isRoot ? 'flex-end': 'center',
            flex: 1,
          },
          pickerWrapper: {
            flexDirection: 'row',
            alignItems: 'center'
          },
          pickerContainer: {
            marginVertical: 8,
            marginLeft: isRoot ? 0 : 8,
            justifyContent: 'center',
            borderRadius: 4,
            borderWidth: 2,
            borderColor: colors.textPrimary,
            overflow: 'hidden',
            width: 100,
          },
          picker: {
            backgroundColor: colors.background,
            color: colors.textPrimary,
            paddingHorizontal: 12,
            paddingVertical: 12,
            borderWidth: 0,
          },
          scrollViewContainer: {
            flexDirection: 'row',
            flexWrap: isRoot ? 'wrap' : 'nowrap',
            alignItems: 'flex-start',
            justifyContent: isRoot ? 'center' : 'flex-start',
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
    <View 
      {...(!isRoot ? panResponder.panHandlers : {})}
      style={styles.container} >
      
      <View style={styles.pickerWrapper}>
        { isRoot && <Text style={{ fontWeight: 'bold' }}>Filter by category: </Text> }
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
            style={styles.picker}
          >
            <Picker.Item label="All" value="All" />
            {[...new Set(publicApis.map(api => api.category))]
              .sort((a, b) => a.localeCompare(b)) // Sort categories alphabetically
              .map(category => (
                <Picker.Item key={category} label={category} value={category} />
            ))}
          </Picker>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        ref={scrollRef}
        horizontal={!isRoot}
        showsHorizontalScrollIndicator={!isRoot}
        showsVerticalScrollIndicator={isRoot}
      >
        {filteredApis.map((api, index) => (
          <PublicApiCard key={index} api={api} index={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default PublicApiCards;
