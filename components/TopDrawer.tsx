
import { View, Text, StyleSheet, Pressable } from 'react-native';
import SettingsMenu from '@/components/SettingsMenu';
import { useStore } from '@/store/useStore';
import React, { useMemo } from 'react';

const TopDrawer: React.FC = () => {
  const colors = useStore((state) => state.colors);
  const modalOpen = useStore((state) => state.modalOpen);
  const setModalOpen = useStore((state) => state.setModalOpen);
  const toggleModal = () => setModalOpen(!modalOpen);
  
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingHorizontal: 10,
          paddingVertical: 2,
          paddingBottom: 6,
          alignItems: 'flex-end',
          borderBottomColor: colors.textPrimary,
          borderBottomWidth: 2,
          width: '100%'
        },
        innerWrapper: {
          flexDirection: 'row',
          alignItems: 'center'
        },
        title: {
          color: colors.textPrimary,
          fontWeight: 'bold'
        }
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerWrapper}>
        <Pressable onPress={toggleModal}>
          <Text style={styles.title}>public api explorer</Text>
        </Pressable>

        <SettingsMenu />
      </View>
    </View>
  );
};

export default TopDrawer;
