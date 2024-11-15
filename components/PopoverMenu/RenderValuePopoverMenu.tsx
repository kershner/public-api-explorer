import PopoverMenuButton from '@/components/PopoverMenu/PopoverMenuButton';
import ImageLightbox from '@/components/PopoverMenu/ImageLightbox';
import PopoverMenu from '@/components/PopoverMenu/PopoverMenu';
import Clipboard from '@react-native-clipboard/clipboard';
import { checkUrl, showAlert } from '@/utils/utils';
import React, { useEffect, useState } from 'react';
import { View, Linking } from 'react-native';
import { useStore } from '@/store/useStore';

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
  const [isApiLink, setIsApiLink] = useState(false);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);
  const url = useStore((state) => state.url);

  useEffect(() => {
    const checkValueType = async () => {
      if (typeof value === 'string' && value.startsWith('http')) {
        const canOpen = await Linking.canOpenURL(value);
        setIsLink(canOpen);
        setIsImage(/\.(jpeg|jpg|gif|png)$/i.test(value));

        try {
          const apiBaseUrl = new URL(url).origin;
          const valueUrl = new URL(value);
          setIsApiLink(valueUrl.origin === apiBaseUrl);
        } catch (error) {
          setIsApiLink(false);
        }
      } else {
        setIsLink(false);
        setIsImage(false);
        setIsApiLink(false);
      }
    };

    if (isVisible) {
      checkValueType();
    }
  }, [isVisible, value, url]);

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
    setIsLightboxVisible(true); // Show lightbox
    onClose();
  };

  const handleViewApiLink = () => {
    if (typeof value === 'string') {
      checkUrl(value);
    }
    onClose();
  };

  return (
    <>
      <PopoverMenu isVisible={isVisible} fromRef={fromRef} onClose={onClose}>
        <PopoverMenuButton
          label="Copy value"
          icon="📄"
          onPress={() => handleCopy(String(value), 'Value copied to clipboard.')}
        />
        <PopoverMenuButton
          label="Copy value with label"
          icon="📄"
          onPress={() => handleCopy(`${label}: ${String(value)}`, 'Value copied to clipboard with label.')}
        />
        {isLink && (
          <PopoverMenuButton
            label="Open link"
            icon="↗️"
            onPress={handleOpenLink}
          />
        )}
        {isImage && (
          <PopoverMenuButton
            label="View image"
            icon="📷"
            onPress={handleViewImage}
          />
        )}
        {isApiLink && (
          <PopoverMenuButton
            label="Explore API link"
            icon="💻"
            onPress={handleViewApiLink}
            isHighlighted={true}
          />
        )}
      </PopoverMenu>

      <ImageLightbox visible={isLightboxVisible} onClose={() => setIsLightboxVisible(false)} imageUrl={typeof value === 'string' ? value : ''} />
    </>
  );
};

export default RenderValuePopoverMenu;
