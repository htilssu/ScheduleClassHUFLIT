import { Alert } from '@mantine/core';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { AlertProps } from '../types';

export function AlertComponent({ type, message, onClose }: AlertProps) {
  return (
    <Alert
      variant="light"
      color={type === 'success' ? 'green' : 'red'}
      title={type === 'success' ? 'Thành công' : 'Lỗi'}
      icon={type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
      mb="md"
      withCloseButton
      onClose={onClose}
    >
      {message}
    </Alert>
  );
} 