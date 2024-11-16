import React, { useState, useEffect, useMemo } from 'react';
import { S3_BASE_URL } from '@/constants/constants';
import { useStore } from '@/store/useStore';
import { SvgXml } from 'react-native-svg';

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
        console.error(error);
      }
    };

    fetchSvg();
  }, [fileName]);

  return (
    <>
      {svgData && <SvgXml xml={svgData} width={width} height={height} fill={fillColor} />}
    </>
  );
};

export default RemoteSvg;
