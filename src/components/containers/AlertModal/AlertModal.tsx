import React from 'react';
import { ModalContainer } from '@app/components/containers/ModalContainer/ModalContainer';
import { Button } from '@app/components/ui/button';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info' | 'success';
  isLoading?: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />;
      case 'warning':
        return <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />;
      case 'success':
        return <CheckCircle className="h-12 w-12 text-green-500 mb-4" />;
      case 'info':
      default:
        return <Info className="h-12 w-12 text-blue-500 mb-4" />;
    }
  };

  const getButtonProps = () => {
    switch (variant) {
      case 'danger':
        return { variant: 'destructive' as const };
      case 'warning':
        return {
          variant: 'default' as const,
          className: 'bg-yellow-600 hover:bg-yellow-700 text-white'
        };
      case 'success':
        return {
          variant: 'default' as const,
          className: 'bg-green-600 hover:bg-green-700 text-white'
        };
      case 'info':
      default:
        return { variant: 'default' as const };
    }
  };

  const buttonProps = getButtonProps();

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-sm text-center"
    >
      <div className="flex flex-col items-center justify-center">
        {getIcon()}
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-6 text-center">{message}</p>

        <div className="flex justify-center gap-3 w-full">
          <Button variant="ghost" onClick={onClose} disabled={isLoading} className="flex-1">
            {cancelText}
          </Button>
          <Button
            variant={buttonProps.variant}
            className={(buttonProps.className ? `flex-1 ${buttonProps.className}` : 'flex-1')}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmText}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
};
