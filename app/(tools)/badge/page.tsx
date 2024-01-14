import Badge from './Badge';
import { BadgeCategory, BadgeType } from './defenition';

export default function BadgePage() {
  return (
    <div>
      <Badge
        type={BadgeType.Pill}
        category={BadgeCategory.Danger}
        content="Pill Danger"
        bordered={BadgeType.Bordered}
        large={BadgeType.Large}
      />
      <Badge
        type={BadgeType.Pill}
        category={BadgeCategory.Danger}
        content="Pill Danger"
      />
      <Badge
        type={BadgeType.Pill}
        category={BadgeCategory.Default}
        content="Pill Danger"
        bordered={BadgeType.Bordered}
      />
      <Badge
        type={BadgeType.Pill}
        category={BadgeCategory.Default}
        content="Pill Danger"
      />
      <Badge
        type={BadgeType.Default}
        category={BadgeCategory.Default}
        content="Pill Danger"
        bordered={BadgeType.Bordered}
      />
      <Badge
        type={BadgeType.Default}
        category={BadgeCategory.Danger}
        content="Pill Danger"
        bordered={BadgeType.Bordered}
        large={BadgeType.Large}
      />
      <Badge
        type={BadgeType.Default}
        category={BadgeCategory.Danger}
        content="Pill Danger"
      />
      <Badge
        type={BadgeType.Default}
        category={BadgeCategory.Default}
        content="Pill Danger"
        large={BadgeType.Large}
      />
    </div>
  );
}
