import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, Dimensions } from 'react-native';
import React, { useMemo, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { downloadCsv as exportCsv } from '@/utils/utils';
import { useStore } from '@/store/useStore';

interface PopoverMenuProps {
  isVisible: boolean;
  fromRef: React.RefObject<View>;
  onClose: () => void;
  value: string | number | boolean | object | null;
}

const PopoverMenu: React.FC<PopoverMenuProps> = ({ isVisible, fromRef, onClose, value }) => {
  const colors = useStore((state) => state.colors);
  const currentUrl = useStore((state) => state.currentUrl);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
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
  
  const handleDownloadCsv = async () => {
    if (value === null || typeof value !== 'object') {
      console.error('Error: value must be a non-null object or an array of objects to export as CSV.');
      return;
    }
  
    // If `value` is a single object, wrap it in an array; otherwise, assume it's an array of objects
    const dataToExport = Array.isArray(value) ? value : [value];
    const urlWithoutScheme = currentUrl.replace(/^https?:\/\//, "");
    const filename = `${urlWithoutScheme}_data.csv`;

    console.log(value);
  
    // try {
    //   await exportCsv(dataToExport, filename);
    // } catch (error) {
    //   console.error('Error downloading CSV:', error);
    // }
  };

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
          <TouchableOpacity onPress={handleDownloadCsv} style={styles.button}>
            <Icon name="file-download" size={20} color={colors.textPrimary} />
            <Text style={styles.buttonText}>Download CSV</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PopoverMenu;
