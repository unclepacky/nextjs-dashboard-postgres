import React, { ReactElement } from 'react';
import { IconType } from 'react-icons';

interface CustomIconProps {
  icon: IconType;
  width?: string;
  height?: string;
  color?: string;
  stroke?: string;
}

export default function CustomIcon({
  icon: Icon,
  width = '24px',
  height = '24px',
  color = 'currentColor',
  stroke,
}: CustomIconProps) {
  return <Icon style={{ width, height, color, stroke }} />;
}
