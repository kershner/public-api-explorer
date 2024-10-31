import PopoverMenu from '@/components/PopoverMenu/PopoverMenu';
import Clipboard from '@react-native-clipboard/clipboard';
import PopoverMenuButton from './PopoverMenuButton';
import { showAlert } from '@/utils/utils';
import { View } from 'react-native';
import React from 'react';

interface RenderValuePopoverMenuProps {
  isVisible: boolean;
  fromRef: React.RefObject<View>;
  onClose: () => void;
  value: string | number | boolean | object | null;
  label: string;
}

const RenderValuePopoverMenu: React.FC<RenderValuePopoverMenuProps> = ({ isVisible, fromRef, onClose, label, value }) => {
  const handleCopyValue = () => {
    Clipboard.setString(String(value));
    showAlert('Value copied to clipboard.');
    onClose();
  };

  const handleCopyValueWithLabel = () => {
    const stringToCopy = `${label}: ${String(value)}`;
    Clipboard.setString(stringToCopy);
    showAlert('Value copied to clipboard with label.');
    onClose();
  };

  return (
    <PopoverMenu isVisible={isVisible} fromRef={fromRef} onClose={onClose}>
      <PopoverMenuButton label="Copy value" icon="content-copy" onPress={handleCopyValue} />
      <PopoverMenuButton label="Copy value with label" icon="content-copy" onPress={handleCopyValueWithLabel} />
    </PopoverMenu>
  );
};

export default RenderValuePopoverMenu;
