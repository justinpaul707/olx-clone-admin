import { useState, useCallback } from 'react';
import { ValidationEngine } from '../utils/validation.utils';
import type { FieldValidationConfig, ValidationResult } from '../types/validation.types';

export const useValidation = (config: FieldValidationConfig) => {
  const [validationResults, setValidationResults] = useState<{ [key: string]: ValidationResult }>({});

  const validateField = useCallback((fieldName: string, value: unknown) => {
    const rules = config[fieldName];
    if (!rules) return { isValid: true, errors: [] };
    const result = ValidationEngine.validateField(value, rules);
    setValidationResults(prev => ({
      ...prev,
      [fieldName]: result
    }));
    return result;
  }, [config]);

  const validateForm = useCallback((formData: Record<string, unknown>) => {
    const results = ValidationEngine.validateForm(formData, config);
    setValidationResults(results);
    const isFormValid = Object.values(results).every(result => result.isValid);
    return { isValid: isFormValid, results };
  }, [config]);

  const getFieldError = useCallback((fieldName: string) => {
    const result = validationResults[fieldName];
    return result?.errors?.[0] || '';
  }, [validationResults]);

  const hasFieldError = useCallback((fieldName: string) => {
    const result = validationResults[fieldName];
    return result ? !result.isValid : false;
  }, [validationResults]);

  const clearFieldError = useCallback((fieldName: string) => {
    setValidationResults(prev => ({
      ...prev,
      [fieldName]: { isValid: true, errors: [] }
    }));
  }, []);

  const clearAllErrors = useCallback(() => {
    setValidationResults({});
  }, []);

  return {
    validateField,
    validateForm,
    getFieldError,
    hasFieldError,
    clearFieldError,
    clearAllErrors,
    validationResults
  };
};
