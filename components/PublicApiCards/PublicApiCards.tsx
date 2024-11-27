import { View, ScrollView, StyleSheet, Text } from 'react-native';
import PublicApiCard from '@/components/PublicApiCards/PublicApiCard';
import React, { useRef, useState, useMemo } from 'react';
import { Picker } from '@react-native-picker/picker';
import { publicApis } from '@/data/PublicApis';
import { shuffleArray } from '@/utils/utils';
import { useStore } from '@/store/useStore';

const randomizedApiList = shuffleArray(publicApis);

type PublicApiCardsProps = {
  closeModal?: () => void;
};

const PublicApiCards: React.FC<PublicApiCardsProps> = ({ closeModal }) => {
  const scrollRef = useRef<ScrollView | null>(null);
  const colors = useStore((state) => state.colors);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredApis = selectedCategory === "All"
    ? randomizedApiList
    : randomizedApiList.filter(api => api.category === selectedCategory);

    const styles = useMemo(
      () =>
        StyleSheet.create({
          container: {
            flexDirection: 'column',
            alignItems: 'flex-end',
            flex: 1,
          },
          pickerWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
          },
          pickerLabel: {
            color: colors.textPrimary,
            fontWeight: 'bold',
          },
          pickerContainer: {
            margin: 8,
            justifyContent: 'center',
            borderRadius: 4,
            borderWidth: 2,
            borderColor: colors.textPrimary,
            backgroundColor: colors.background,
            overflow: 'hidden',
            width: 100,
            height: 41,
          },
          picker: {
            backgroundColor: colors.background,
            color: colors.textPrimary,
            paddingHorizontal: 12,
            borderWidth: 0,
          },
          scrollViewContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingVertical: 8
          },
        }),
      [colors]
    );

  return (
    <View 
      style={styles.container} >
      
      <View style={styles.pickerWrapper}>
      <Text style={styles.pickerLabel}>Filter by category: </Text>
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
        >

        {filteredApis.map((api, index) => (
          <PublicApiCard key={index} api={api} index={index} closeModal={closeModal} />
        ))}
      </ScrollView>
    </View>
  );
};

export default PublicApiCards;
