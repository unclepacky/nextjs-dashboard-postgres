// Assuming TransactionType enum is imported or defined somewhere
import { Employee, TransactionType } from '@prisma/client';
import Cleaning from '../ui/dashboard/transactions/Cleaning';
import Electricity from '../ui/dashboard/transactions/Electricity';
import Credit from '../ui/dashboard/transactions/Credit';
import Debit from '../ui/dashboard/transactions/Debit';
import Internet from '../ui/dashboard/transactions/Internet';
import Maintenance from '../ui/dashboard/transactions/Maintenance';
import Payment from '../ui/dashboard/transactions/Payment';
import Rent from '../ui/dashboard/transactions/Rent';
import Transfer from '../ui/dashboard/transactions/Transfer';

// Define the type for the components mapping
type TransactionComponentsMap = {
  [key in TransactionType]?: React.ComponentType<{
    selectedType: TransactionType;
    employees: Employee[];
  }>;
};

// Define the components map with type annotation
const transactionComponents: TransactionComponentsMap = {
  CLEANING: Cleaning,
  ELECTRICITY: Electricity,
  CREDIT: Credit,
  DEBIT: Debit,
  INTERNET: Internet,
  MAINTENANCE: Maintenance,
  PAYMENT: Payment,
  RENT: Rent,
  TRANSFER: Transfer,
};

export default transactionComponents;
