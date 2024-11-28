import { View, ScrollView, StyleSheet } from 'react-native';
import PublicApiCard from '@/components/PublicApiCards/PublicApiCard';
import React, { useRef, useState, useMemo } from 'react';
import { publicApis } from '@/data/PublicApis';
import { shuffleArray } from '@/utils/utils';
import { useStore } from '@/store/useStore';
import MultiSelectPicker from '@/components/MultiSelectPicker';

const randomizedApiList = shuffleArray(publicApis);

type PublicApiCardsProps = {
  closeModal?: () => void;
};

const PublicApiCards: React.FC<PublicApiCardsProps> = ({ closeModal }) => {
  const scrollRef = useRef<ScrollView | null>(null);
  const colors = useStore((state) => state.colors);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());

  const filteredApis =
    selectedCategories.size === 0
      ? randomizedApiList
      : randomizedApiList.filter(api => selectedCategories.has(api.category));

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
          marginVertical: 8,
          paddingRight: 8
        },
        scrollViewContainer: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingVertical: 8,
        },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <View style={styles.pickerWrapper}>
        <MultiSelectPicker
          options={[...new Set(publicApis.map(api => api.category))].sort()}
          selectedOptions={selectedCategories}
          onChange={setSelectedCategories}
          label="Filter by category"
        />
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
