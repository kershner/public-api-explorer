import { FlatList, Platform, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import FilterControls from "@/components/JsonViewer/TopDrawer/FilterControls";
import ChosenApiInfo from "@/components/JsonViewer/TopDrawer/ChosenApiInfo";
import React, { useMemo, useState, useRef } from 'react';
import JsonItem from '@/components/JsonViewer/JsonItem';
import { useStore } from '@/store/useStore';

interface JsonViewerProps {
  jsonData?: unknown;
  url?: string;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ jsonData, url = "" }) => {
  const colors = useStore((state) => state.colors);
  const [filteredJson, setFilteredJson] = useState<unknown>(jsonData); // Use filteredJson as data
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const scrollViewRef = useRef(null);

  const styles = useMemo(() => 
    StyleSheet.create({
      wrapper: { 
        flex: 1, 
        paddingTop: 16,
        paddingHorizontal: 16,
      },
      container: { 
        flexGrow: 1, 
        paddingBottom: 80,
      },
      backToTopButton: {
        position: 'absolute',
        bottom: 20,
        right: Platform.OS === 'web' ? 16 * 2 : 16,  // Offset for web scrollbar
        backgroundColor: colors.background,
        borderWidth: 2,
        borderColor: colors.textPrimary,
        borderRadius: 6,
        padding: 10,
      },
      backToTopButtonText: {
        color: colors.textPrimary,
      },
    }), 
    [colors]
  );
  

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowBackToTop(offsetY > 200);
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  // Use filteredJson for rootData instead of jsonData
  const rootData = useMemo(() => {
    return Array.isArray(filteredJson)
      ? filteredJson.map((item, index) => ({ key: index.toString(), value: item }))
      : Object.entries(filteredJson).map(([key, value]) => ({ key, value }));
  }, [filteredJson]);

  return (
    <View style={styles.wrapper}>
      <ChosenApiInfo jsonData={jsonData} url={url} />
      
      <FilterControls
        jsonData={jsonData}
        onFilterUpdate={setFilteredJson}
        colors={colors}
      />

      <FlatList
        data={rootData}
        renderItem={({ item, index }) => (
          <JsonItem
            key={index.toString()}
            label={item.key}
            value={item.value as string | number | boolean | object | null}
            level={0}
          />
        )}
        keyExtractor={(item, index) => `root-${index}`}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
        contentContainerStyle={styles.container}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        disableVirtualization={Platform.OS === 'web'}
      />

      {showBackToTop && (
        <TouchableOpacity style={styles.backToTopButton} onPress={scrollToTop}>
          <Text style={styles.backToTopButtonText}>↑ Top</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default JsonViewer;
