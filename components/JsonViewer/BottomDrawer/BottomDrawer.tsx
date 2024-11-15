import { View, StyleSheet, Text, Modal, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import PublicApiCards from '@/components/PublicApiCards/PublicApiCards';
import ApiQueryInput from '@/components/ApiQueryBuilder/ApiQueryInput'; 
import React, { useMemo, useState } from 'react';
import { useStore } from '@/store/useStore';

const BottomDrawer = ({ url }: { url: string }) => {
  const colors = useStore((state) => state.colors);
  const [modalVisible, setModalVisible] = useState(false);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          gap: 5,
        },
        overlay: {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        },
        modalContent: {
          width: '80%',
          height: '70%',
          backgroundColor: colors.background,
          borderRadius: 10,
          padding: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        },
        showApisButton: {
          padding: 12,
          marginBottom: 8,
          borderRadius: 4,
          backgroundColor: colors.accent,
          alignSelf: 'center',
        },
        showApisText: {
          color: colors.textPrimary,
          fontWeight: 'bold'
        },
        closeButton: { alignSelf: 'flex-end', backgroundColor: colors.textPrimary, paddingVertical: 4, paddingHorizontal: 12, borderRadius: 4, marginRight: 8, marginBottom: 8 },
        closeButtonText: { color: colors.background, fontSize: 16, fontWeight: 'bold' },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <ApiQueryInput url={url} />
      <Pressable style={styles.showApisButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.showApisText}>APIs</Text>
      </Pressable>
      
      <Modal
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modalContent} onPress={() => {}}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>

            <ScrollView>
              <PublicApiCards closeModal={() => setModalVisible(false)} />
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default BottomDrawer;
