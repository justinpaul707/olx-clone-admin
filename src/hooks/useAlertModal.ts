import { useState, useCallback } from 'react';

interface AlertModalConfig {
  isOpen: boolean;
  title: string;
  message: string;
  variant?: 'danger' | 'warning' | 'info' | 'success';
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => Promise<void> | void;
  isLoading?: boolean;
}

interface ShowAlertOptions {
  title: string;
  message: string;
  onConfirm: () => Promise<void> | void;
  variant?: 'danger' | 'warning' | 'info' | 'success';
  confirmText?: string;
  cancelText?: string;
}

export const useAlertModal = () => {
  const [config, setConfig] = useState<AlertModalConfig>({
    isOpen: false,
    title: '',
    message: '',
    variant: 'danger',
    confirmText: 'Confirm', 
    cancelText: 'Cancel',
    onConfirm: async () => {},
    isLoading: false,
  });

  const show = useCallback((options: ShowAlertOptions) => {
    setConfig({
      isOpen: true,
      title: options.title,
      message: options.message,
      variant: options.variant || 'danger',
      confirmText: options.confirmText || 'Confirm',
      cancelText: options.cancelText || 'Cancel',
      onConfirm: options.onConfirm,
      isLoading: false,
    });
  }, []);

  const hide = useCallback(() => {
    setConfig((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setConfig((prev) => ({ ...prev, isLoading }));
  }, []);

  return {
    isOpen: config.isOpen,
    title: config.title,
    message: config.message,
    variant: config.variant,
    confirmText: config.confirmText,
    cancelText: config.cancelText,
    isLoading: config.isLoading,
    show,
    hide,
    onConfirm: config.onConfirm, 
    setLoading
  };
};
