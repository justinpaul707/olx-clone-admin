// src/utils/validation.utils.ts
import type { ValidationRule, ValidationResult, FieldValidationConfig } from '../types/validation.types';

export class ValidationEngine {
  private static validateRequired(value: any, rule: ValidationRule): string | null {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return rule.message;
    }
    return null;
  }

  private static validateMinLength(value: string, rule: ValidationRule): string | null {
    if (value && value.length < rule.value) {
      return rule.message;
    }
    return null;
  }

  private static validateMaxLength(value: string, rule: ValidationRule): string | null {
    if (value && value.length > rule.value) {
      return rule.message;
    }
    return null;
  }

  private static validatePattern(value: string, rule: ValidationRule): string | null {
    if (value && !rule.value.test(value)) {
      return rule.message;
    }
    return null;
  }

  private static validateRange(value: number, rule: ValidationRule): string | null {
    const num = typeof value === 'string' ? parseInt(value) : value;
    if (isNaN(num)) return null;
    if (rule.value.min !== undefined && num < rule.value.min) {
      return rule.message;
    }
    if (rule.value.max !== undefined && num > rule.value.max) {
      return rule.message;
    }
    return null;
  }

  private static validateCustom(value: any, rule: ValidationRule): string | null {
    if (rule.validator && !rule.validator(value)) {
      return rule.message;
    }
    return null;
  }

  public static validateField(value: any, rules: ValidationRule[]): ValidationResult {
    const errors: string[] = [];
    for (const rule of rules) {
      let error: string | null = null;
      switch (rule.type) {
        case 'required':
          error = this.validateRequired(value, rule);
          break;
        case 'minLength':
          error = this.validateMinLength(value, rule);
          break;
        case 'maxLength':
          error = this.validateMaxLength(value, rule);
          break;
        case 'pattern':
          error = this.validatePattern(value, rule);
          break;
        case 'range':
          error = this.validateRange(value, rule);
          break;
        case 'custom':
          error = this.validateCustom(value, rule);
          break;
      }
      if (error) {
        errors.push(error);
      }
    }
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  public static validateForm(formData: any, config: FieldValidationConfig): { [key: string]: ValidationResult } {
    const results: { [key: string]: ValidationResult } = {};
    Object.keys(config).forEach(fieldName => {
      const fieldValue = formData[fieldName];
      const fieldRules = config[fieldName];
      results[fieldName] = this.validateField(fieldValue, fieldRules);
    });
    return results;
  }
}
