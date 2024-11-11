import PopoverMenu from '@/components/PopoverMenu/PopoverMenu';
import { downloadJson } from '@/utils/downloads/downloadJson';
import Clipboard from '@react-native-clipboard/clipboard';
import PopoverMenuButton from './PopoverMenuButton';
import { showAlert } from '@/utils/utils';
import { View } from 'react-native';
import React from 'react';

interface JsonItemPopoverMenuProps {
  isVisible: boolean;
  fromRef: React.RefObject<View>;
  onClose: () => void;
  value: object;
  label: string;
}

const JsonItemPopoverMenu: React.FC<JsonItemPopoverMenuProps> = ({ isVisible, fromRef, onClose, value, label }) => {
  const handleCopyJson = () => {
    Clipboard.setString(JSON.stringify(value, null, 2));
    showAlert('JSON copied to clipboard');
    onClose();
  };

  const handleDownloadJson = async () => {
    const filename = `${label}.json`;
    try {
      await downloadJson(value, filename);
      onClose();
    } catch (error) {
      showAlert(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <PopoverMenu isVisible={isVisible} fromRef={fromRef} onClose={onClose}>
      <PopoverMenuButton label="Copy JSON" icon="📄" onPress={handleCopyJson} />
      <PopoverMenuButton label="Download JSON" icon="📥" onPress={handleDownloadJson} />
    </PopoverMenu>
  );
};

export default JsonItemPopoverMenu;
