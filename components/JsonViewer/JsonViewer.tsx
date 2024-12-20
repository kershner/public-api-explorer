import { FlatList, Platform, StyleSheet, View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import FilterControls from "@/components/JsonViewer/TopDrawer/FilterControls";
import ChosenApiInfo from '@/components/JsonViewer/TopDrawer/ChosenApiInfo';
import BottomDrawer from '@/components/JsonViewer/BottomDrawer/BottomDrawer';
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
  const currentApiExpanded = useStore((state) => state.currentApiExpanded);
  const expandAll = useStore((state) => state.expandAll);

  const styles = useMemo(() => 
    StyleSheet.create({
      jsonViewerContainer: {
        paddingTop: currentApiExpanded ? 6 : 16,
        paddingHorizontal: 16,
        position: 'relative',
        height: '100%',
        flex: 1
      },
      container: { 
        flexGrow: 1, 
        paddingBottom: 100,
        paddingRight: 4,
      },
      bottomDrawer: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
      },
      backToTopButton: {
        position: 'absolute',
        bottom: 60,
        right: Platform.OS === 'web' ? 19 * 2 : 19,  // Offset for web scrollbar
        backgroundColor: colors.background,
        borderWidth: 2,
        borderColor: colors.textPrimary,
        borderRadius: 6,
        padding: 10,
      },
      backToTopButtonText: {
        color: colors.textPrimary,
      },
      toggleButton: {
        marginBottom: currentApiExpanded ? 4 : 0,
        paddingVertical: 4,
        paddingHorizontal: 16,
        backgroundColor: colors.accent,
        borderRadius: 15,
        alignSelf: 'flex-end',
      },
      toggleButtonText: {
        color: colors.textPrimary,
        fontWeight: 'bold',
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

  const rootData = useMemo(() => {
    return Array.isArray(filteredJson)
      ? filteredJson.map((item, index) => ({ key: index.toString(), value: item }))
      : Object.entries(filteredJson).map(([key, value]) => ({ key, value }));
  }, [filteredJson]);

  return (
    <View style={styles.jsonViewerContainer}>
      {currentApiExpanded && (
        <ChosenApiInfo jsonData={jsonData} url={url} />
      )}

      <FilterControls
        jsonData={jsonData}
        onFilterUpdate={setFilteredJson}
      />

      <FlatList
        data={rootData}
        renderItem={({ item, index }) => (
          <JsonItem
            key={index.toString()}
            label={item.key}
            value={item.value as string | number | boolean | object | null}
            level={0}
            expandAll={expandAll}
          />
        )}
        keyExtractor={(item, index) => `root-${index}`}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
        contentContainerStyle={styles.container}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        disableVirtualization={Platform.OS === 'web'}
      />

      <BottomDrawer url={url} jsonData={jsonData} />
      
      {showBackToTop && (
        <TouchableOpacity style={styles.backToTopButton} onPress={scrollToTop}>
          <Text style={styles.backToTopButtonText}>↑ Top</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default JsonViewer;
