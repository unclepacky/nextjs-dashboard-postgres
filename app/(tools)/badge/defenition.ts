// Define enums for badge types and categories
export enum BadgeType {
  Default = 'default',
  Large = 'large',
  Bordered = 'bordered',
  Pill = 'pill',
}

export enum BadgeCategory {
  Danger = 'danger',
  Default = 'default',
}

export type FontType = { size: string; height: string };

// Mapping for badge type to round property
export const typeToRound: Record<BadgeType, string | FontType> = {
  pill: '999px',
  default: '4px',
  bordered: '1px',
  large: { size: '0.875rem', height: '1.25rem' },
};

// Mapping for badge category to color
export const categoryToColor: Record<BadgeCategory, string> = {
  danger: 'red',
  default: 'blue',
};
