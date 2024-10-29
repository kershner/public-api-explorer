import { View, Modal, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useStore } from '@/store/useStore';
import React, { useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';

const SettingsMenu = () => {
  const modalOpen = useStore((state) => state.modalOpen);
  const setModalOpen = useStore((state) => state.setModalOpen);
  const toggleModal = () => setModalOpen(!modalOpen);
  const darkMode = useStore((state) => state.darkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const colors = useStore((state) => state.colors);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        modalOverlay: {
          flex: 1,
          backgroundColor: colors.background,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
        },
        title: {
          fontSize: 20,
          fontWeight: 'bold',
          color: colors.textPrimary,
        },
        optionRowsContainer: {
          padding: 16,
        },
        optionRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 12,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
        },
      }),
    [colors]
  );

  return (
    <Modal visible={modalOpen} onRequestClose={toggleModal}>
      <View style={styles.modalOverlay}>
        {/* Header with Close Button */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Ionicons name="close" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Options */}
        <View style={styles.optionRowsContainer}>
          <View style={styles.optionRow}>
            <Text style={{ color: colors.textPrimary }}>Dark Mode</Text>
            <Switch value={darkMode} onValueChange={toggleDarkMode} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SettingsMenu;
