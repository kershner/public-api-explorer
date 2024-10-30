import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, Dimensions } from 'react-native';
import { downloadJson } from '@/utils/downloads/downloadJson';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import { useStore } from '@/store/useStore';
import React, { useMemo } from 'react';

interface PopoverMenuProps {
  isVisible: boolean;
  fromRef: React.RefObject<View>;
  onClose: () => void;
  value: object;
  label: string;
}

const PopoverMenu: React.FC<PopoverMenuProps> = ({ isVisible, fromRef, onClose, value, label }) => {
  const colors = useStore((state) => state.colors);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const screenWidth = Dimensions.get('window').width;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        modalOverlay: {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        popoverStyle: {
          position: 'absolute',
          top: position.top,
          left: position.left,
          backgroundColor: colors.textPrimary,
          borderColor: colors.textPrimary,
          borderWidth: 2,
          borderRadius: 8,
          overflow: 'hidden',
        },
        popoverContent: {
          borderRadius: 6,
          padding: 8,
          backgroundColor: colors.background,
          alignItems: 'flex-start',
        },
        button: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.accent,
          paddingVertical: 10,
          paddingHorizontal: 12,
          marginVertical: 6,
          borderRadius: 20,
        },
        buttonText: {
          fontSize: 16,
          color: colors.textPrimary,
          marginLeft: 8,
          flexShrink: 1,
        },
      }),
    [colors, position]
  );

  React.useEffect(() => {
    if (isVisible && fromRef.current) {
      fromRef.current.measure((x, y, width, height, pageX, pageY) => {
        const popoverWidth = 200;
        const adjustedLeft = pageX + width / 2 + popoverWidth > screenWidth
          ? screenWidth - popoverWidth
          : pageX + width / 2;

        setPosition({ top: pageY + height, left: adjustedLeft });
      });
    }
  }, [isVisible, fromRef, screenWidth]);

  // Copy JSON to clipboard
  const handleCopyJson = () => {
    Clipboard.setString(JSON.stringify(value, null, 2));
    console.log('JSON copied to clipboard');
  };

  // Download JSON file
  const handleDownloadJson = async () => {
    const filename = `${label}.json`;
    try {
      await downloadJson(value, filename);
      console.log('JSON file downloaded');
    } catch (error) {
      console.error('Error downloading JSON:', error);
    }
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={onClose}
      animationType="none"
    >
      <Pressable style={styles.modalOverlay} onPress={onClose} />

      <View style={styles.popoverStyle}>
        <View style={styles.popoverContent}>
          <TouchableOpacity onPress={handleCopyJson} style={styles.button}>
            <Icon name="content-copy" size={20} color={colors.textPrimary} />
            <Text style={styles.buttonText}>Copy JSON</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDownloadJson} style={styles.button}>
            <Icon name="file-download" size={20} color={colors.textPrimary} />
            <Text style={styles.buttonText}>Download JSON</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PopoverMenu;
