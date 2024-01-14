import { IconType } from 'react-icons';
import { CiEdit, CiBoxList } from 'react-icons/ci';
import { MdOutlineAddHome, MdViewCompact } from 'react-icons/md';
import { RiGalleryLine } from 'react-icons/ri';
import { GrVmMaintenance } from 'react-icons/gr';

export interface UnitDropDownTypes {
  label: string;
  link: string;
  icon: IconType;
}

export const unitDropDownMenu: UnitDropDownTypes[] = [
  { label: 'Edit', link: '/', icon: CiEdit },
  { label: 'Add', link: '/', icon: MdOutlineAddHome },
  { label: 'View', link: '/', icon: MdViewCompact },
  { label: 'List', link: '/', icon: CiBoxList },
  { label: 'Gallery', link: '/', icon: RiGalleryLine },
  { label: 'Maintenance', link: '/', icon: GrVmMaintenance },
];
