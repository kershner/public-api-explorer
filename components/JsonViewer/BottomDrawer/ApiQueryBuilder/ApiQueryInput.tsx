import { TouchableOpacity, TextInput, StyleSheet, View, Modal, ActivityIndicator, Pressable } from 'react-native';
import ApiQueryModal from '@/components/JsonViewer/BottomDrawer/ApiQueryBuilder/ApiQueryModal';
import useIsRootScreen from '@/hooks/useIsRootScreen';
import React, { useMemo, useState } from 'react';
import { useStore } from '@/store/useStore';

interface ApiQueryInputProps {
  url: string;
}

const ApiQueryInput: React.FC<ApiQueryInputProps> = ({ url }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const colors = useStore((state) => state.colors);
  const loading = useStore((state) => state.loading);
  const isRoot = useIsRootScreen();

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const styles = useMemo(() => 
    StyleSheet.create({
      wrapper: {
        flex: isRoot ? undefined : 1,
      },
      inputContainer: {
        borderWidth: 2,
        borderColor: colors.textPrimary,
        borderRadius: 5,
        padding: 10,
        backgroundColor: colors.background,
      },
      input: {
        fontSize: 18,
        color: colors.textPrimary,
        fontWeight: 'bold',
      },
      loadingSpinnerWrapper: {
        position: 'absolute',
        right: 0,
        top: 1,
        backgroundColor: colors.background,
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
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={openModal} style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          editable={false}
          value={url}
          pointerEvents="none"
        />
        {loading ? (
          <View style={styles.loadingSpinnerWrapper}>
            <ActivityIndicator size={41} color={colors.textPrimary} />
          </View>
        ) : null}
      </TouchableOpacity>

      <Modal transparent visible={modalVisible}>
        <Pressable style={styles.overlay} onPress={closeModal}>
          <ApiQueryModal onClose={closeModal} url={url} />
        </Pressable>
      </Modal>
    </View>
  );
};

export default ApiQueryInput;
