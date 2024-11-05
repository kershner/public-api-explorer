import PopoverMenu from '@/components/PopoverMenu/PopoverMenu';
import Clipboard from '@react-native-clipboard/clipboard';
import PopoverMenuButton from './PopoverMenuButton';
import React, { useEffect, useState } from 'react';
import { View, Linking } from 'react-native';
import { showAlert } from '@/utils/utils';

interface RenderValuePopoverMenuProps {
  isVisible: boolean;
  fromRef: React.RefObject<View>;
  onClose: () => void;
  value: string | number | boolean | object | null;
  label: string;
}

const RenderValuePopoverMenu: React.FC<RenderValuePopoverMenuProps> = ({ isVisible, fromRef, onClose, label, value }) => {
  const [isLink, setIsLink] = useState(false);
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    const checkValueType = async () => {
      if (typeof value === 'string') {
        if (value.startsWith('http')) {
          const canOpen = await Linking.canOpenURL(value);
          setIsLink(canOpen);
          setIsImage(/\.(jpeg|jpg|gif|png)$/i.test(value));
        } else {
          setIsLink(false);
          setIsImage(false);
        }
      }
    };

    if (isVisible) {
      checkValueType();
    }
  }, [isVisible, value]);

  const handleCopy = (content: string, message: string) => {
    Clipboard.setString(content);
    showAlert(message);
    onClose();
  };

  const handleOpenLink = () => {
    if (isLink && typeof value === 'string') {
      Linking.openURL(value);
    } else {
      showAlert('Invalid link.');
    }
    onClose();
  };

  const handleViewImage = () => {
    console.log('View image functionality triggered.');
    onClose();
  };

  return (
    <PopoverMenu isVisible={isVisible} fromRef={fromRef} onClose={onClose}>
      <PopoverMenuButton
        label="Copy value"
        icon="content-copy"
        onPress={() => handleCopy(String(value), 'Value copied to clipboard.')}
      />
      <PopoverMenuButton
        label="Copy value with label"
        icon="content-copy"
        onPress={() => handleCopy(`${label}: ${String(value)}`, 'Value copied to clipboard with label.')}
      />
      {isLink && (
        <PopoverMenuButton
          label="Open link"
          icon="open-in-new"
          onPress={handleOpenLink}
        />
      )}
      {isImage && (
        <PopoverMenuButton
          label="View image"
          icon="image"
          onPress={handleViewImage}
        />
      )}
    </PopoverMenu>
  );
};

export default RenderValuePopoverMenu;
