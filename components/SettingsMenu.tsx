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
        modalOverlay: {
          flex: 1,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
        },
        modalContent: {
          width: '80%',
          backgroundColor: colors.accent,
          color: colors.textPrimary,
          padding: 16,
          borderRadius: 8,
        },
        title: {
          fontSize: 18,
          marginBottom: 12,
          color: colors.textPrimary,
        },
        optionRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        },
      }),
    [colors]
  );

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={{ fontSize: 24 }}>⚙️</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" onRequestClose={toggleModal} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.optionRow}>
              <Text style={{ color: colors.textPrimary }}>Dark Mode</Text>
              <Switch value={darkMode} onValueChange={toggleDarkMode} />
            </View>
            <Button title="Close" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SettingsMenu;
