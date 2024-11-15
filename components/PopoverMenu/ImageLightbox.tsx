import { Modal, View, Image, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useStore } from '@/store/useStore';
import React, { useMemo } from 'react';

interface ImageLightboxProps {
  visible: boolean;
  onClose: () => void;
  imageUrl: string;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ visible, onClose, imageUrl }) => {
  const colors = useStore((state) => state.colors);
  
  const styles = useMemo(
    () =>
      StyleSheet.create({
        overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)', justifyContent: 'center', alignItems: 'center' },
        image: { width: '90%', height: '70%', resizeMode: 'contain' },
        closeButton: { position: 'absolute', top: 40, right: 20, backgroundColor: colors.textPrimary, paddingVertical: 4, paddingHorizontal: 12, borderRadius: 4 },
        closeButtonText: { color: colors.background, fontSize: 16, fontWeight: 'bold' },
      }),
    []
  );

  return (
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ImageLightbox;
