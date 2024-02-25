import { IconType } from 'react-icons';
import { CiEdit, CiBoxList } from 'react-icons/ci';
import { MdOutlineAddHome, MdViewCompact } from 'react-icons/md';
import { RiGalleryLine } from 'react-icons/ri';
import { GrVmMaintenance } from 'react-icons/gr';
import { Contract, Transaction } from '@prisma/client';

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

export const ContractColumns: { label: string; value: keyof Contract }[] = [
  { label: 'Unit', value: 'unitId' },
  { label: 'Client', value: 'customerId' },
  { label: 'Start', value: 'startDate' },
  { label: 'End', value: 'endDate' },
  { label: 'Currency', value: 'currency' },
  { label: 'Daily', value: 'dailyAmount' },
  { label: 'Monthly', value: 'monthlyAmount' },
  { label: 'New Monthly', value: 'newMonthlyAmount' },
  { label: 'Type', value: 'type' },
  { label: 'Daily?', value: 'isDaily' },
];
export const CustomerStatementColumns: {
  label: string;
  value: keyof Transaction | 'unitId';
}[] = [
  { label: 'Unit', value: 'unitId' },
  { label: 'Type', value: 'type' },
  { label: 'Date', value: 'currentDate' },
  { label: 'Amount', value: 'amount' },
  { label: 'Start', value: 'fromDate' },
  { label: 'End', value: 'toDate' },
];
