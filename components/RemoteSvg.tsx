import React, { useState, useEffect, useMemo } from 'react';
import { Platform } from 'react-native'; // For platform detection
import { S3_BASE_URL } from '@/constants/constants';
import { useStore } from '@/store/useStore';
import { SvgXml } from 'react-native-svg'; // Native SVG rendering
import { ReactSVG } from 'react-svg'; // Web SVG rendering

const baseUrl = S3_BASE_URL;

// In-memory cache for SVG data
const svgCache: Record<string, string> = {};

interface RemoteSvgProps {
  fileName: string;
  width: number | string;
  height: number | string;
}

const RemoteSvg: React.FC<RemoteSvgProps> = ({ fileName, width, height }) => {
  const [svgData, setSvgData] = useState<string | null>(null);
  const colors = useStore((state) => state.colors);

  const fillColor = useMemo(() => colors.textPrimary, [colors]);

  useEffect(() => {
    const fetchSvg = async () => {
      const cacheKey = `${baseUrl}/${fileName}`;

      // Check if SVG is already cached
      if (svgCache[cacheKey]) {
        setSvgData(svgCache[cacheKey]);
        return;
      }

      try {
        const response = await fetch(cacheKey);
        const data = await response.text();

        // Cache the fetched SVG data
        svgCache[cacheKey] = data;
        setSvgData(data);
      } catch (error) {
        console.error(`Failed to fetch SVG: ${cacheKey}`, error);
      }
    };

    fetchSvg();
  }, [fileName]);

  if (!svgData) return null;

  if (Platform.OS === 'web') {
    return (
      <ReactSVG
        src={`data:image/svg+xml;base64,${btoa(svgData)}`}
        beforeInjection={(svg) => {
          svg.setAttribute('width', `${width}`);
          svg.setAttribute('height', `${height}`);
        }}
      />
    );
  }

  return <SvgXml xml={svgData} width={width} height={height} fill={fillColor} />;
};

export default RemoteSvg;
