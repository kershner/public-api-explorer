import { TouchableOpacity, TextInput, StyleSheet, View, Modal } from 'react-native';
import ApiQueryModal from '@/components/ApiQueryBuilder/ApiQueryModal';
import React, { useMemo, useState } from 'react';
import { useStore } from '@/store/useStore';

interface ApiQueryInputProps {
  url: string;
}

const ApiQueryInput: React.FC<ApiQueryInputProps> = ({ url }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const colors = useStore((state) => state.colors);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const styles = useMemo(() => 
    StyleSheet.create({
      inputContainer: {
        borderWidth: 2,
        borderColor: colors.textPrimary,
        borderRadius: 5,
        padding: 10,
        backgroundColor: colors.background
      },
      input: {
        fontSize: 18,
        color: colors.textPrimary,
        fontWeight: 'bold'
      },
      overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
    }), 
    [colors]
  );

  return (
    <View>
      <TouchableOpacity onPress={openModal} style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          editable={false}
          value={url}
          pointerEvents="none"
        />
      </TouchableOpacity>

      <Modal transparent visible={modalVisible}>
        <View style={styles.overlay}>
          <ApiQueryModal onClose={closeModal} url={url} />
        </View>
      </Modal>
    </View>
  );
};

export default ApiQueryInput;
