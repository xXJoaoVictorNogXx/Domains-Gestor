export interface Account {
  id: string;
  email: string;
  storage: number;
  isBlocked: boolean;
  domainId: string;
}

export interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountId: string | null;
}