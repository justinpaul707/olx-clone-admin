// src/types/validation.types.ts
export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'range' | 'custom';
  message: string;
  value?: any;
  validator?: (value: any) => boolean;
}

export interface FieldValidationConfig {
  [fieldName: string]: ValidationRule[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
