import { View, TouchableOpacity, Modal, Text, Switch, Button, StyleSheet } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useStore } from '@/store/useStore';

const SettingsMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const darkMode = useStore((state) => state.darkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const toggleModal = () => setModalVisible(!modalVisible);
  const colors = useStore((state) => state.colors);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        settingsButton: {
          fontSize: 24,
        },
        modalOverlay: {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          justifyContent: 'center',
          alignItems: 'center',
        },
        modalContent: {
          width: '100%',
          maxWidth: 450,
          backgroundColor: colors.accent,
          color: colors.textPrimary,
          padding: 24,
          borderRadius: 8,
        },
        title: {
          fontSize: 18,
          marginBottom: 12,
          color: colors.textPrimary,
          fontWeight: 'bold'
        },
        optionRowsContainer: {
          marginBottom: 12,
        },
        optionRow: {
          width: '100%',
          maxWidth: '90%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'center',
          alignItems: 'center',
          marginBottom: 16,
          paddingBottom: 6,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
          borderStyle: 'dotted'
        },
        buttonText: {
          color: colors.textPrimary,
          textAlign: 'center',
          fontWeight: 'bold'
        }
      }),
    [colors]
  );

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.settingsButton}>⚙️</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} onRequestClose={toggleModal} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Settings</Text>
            
            <View style={styles.optionRowsContainer}>
              <View style={styles.optionRow}>
                <Text style={{ color: colors.textPrimary }}>Dark Mode</Text>
                <Switch value={darkMode} onValueChange={toggleDarkMode} />
              </View>
            </View>

            <TouchableOpacity onPress={toggleModal} style={{ backgroundColor: colors.background, paddingVertical: 8 }}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SettingsMenu;
