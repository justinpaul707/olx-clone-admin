import React, { useState } from 'react';
import { ComponentType, type FormComponent } from '@app/features/formBuilder/types';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import { 
  Type, 
  Hash, 
  AlignLeft, 
  ListOrdered, 
  CheckSquare, 
  Circle, 
  Calendar,
  Upload,
  Image,
  Sliders,
  MapPin,
  Plus,
  Trash2
} from 'lucide-react';

interface ComponentEditorProps {
  component?: FormComponent;
  onSave: (component: Omit<FormComponent, 'id' | 'order'>) => void;
  onCancel: () => void;
}

const COMPONENT_TYPES = [
  { type: ComponentType.TEXT_INPUT, label: 'Text Input', icon: Type },
  { type: ComponentType.TEXTAREA, label: 'Text Area', icon: AlignLeft },
  { type: ComponentType.NUMBER_INPUT, label: 'Number Input', icon: Hash },
  { type: ComponentType.SELECT, label: 'Select Dropdown', icon: ListOrdered },
  { type: ComponentType.MULTI_SELECT, label: 'Multi Select', icon: CheckSquare },
  { type: ComponentType.RADIO, label: 'Radio Buttons', icon: Circle },
  { type: ComponentType.CHECKBOX, label: 'Checkboxes', icon: CheckSquare },
  { type: ComponentType.DATE_PICKER, label: 'Date Picker', icon: Calendar },
  { type: ComponentType.FILE_UPLOAD, label: 'File Upload', icon: Upload },
  { type: ComponentType.IMAGE_UPLOAD, label: 'Image Upload', icon: Image },
  { type: ComponentType.RANGE_SLIDER, label: 'Range Slider', icon: Sliders },
  { type: ComponentType.LOCATION_PICKER, label: 'Location Picker', icon: MapPin },
];

export const ComponentEditor: React.FC<ComponentEditorProps> = ({
  component,
  onSave,
  onCancel,
}) => {
  const [selectedType, setSelectedType] = useState<ComponentType>(
    component?.type || ComponentType.TEXT_INPUT
  );
  const [label, setLabel] = useState(component?.label || '');
  const [name, setName] = useState(component?.name || '');
  const [placeholder, setPlaceholder] = useState(component?.placeholder || '');
  const [description, setDescription] = useState(component?.description || '');
  const [required, setRequired] = useState(component?.required || false);
  const [options, setOptions] = useState<Array<{ label: string; value: string }>>(
    component?.options || []
  );
  const [validation] = useState(component?.validation || {});

  const handleAddOption = () => {
    setOptions([...options, { label: '', value: '' }]);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, field: 'label' | 'value', value: string) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const componentData: Omit<FormComponent, 'id' | 'order'> = {
      type: selectedType,
      label,
      name: name || label.toLowerCase().replace(/\s+/g, '_'),
      placeholder,
      description,
      required,
    };

    // Add options for select/radio/checkbox types
    if ([ComponentType.SELECT, ComponentType.MULTI_SELECT, ComponentType.RADIO, ComponentType.CHECKBOX].includes(selectedType)) {
      componentData.options = options.filter(opt => opt.label && opt.value);
    }

    // Add validation if present
    if (Object.keys(validation).length > 0) {
      componentData.validation = validation;
    }

    onSave(componentData);
  };

  const needsOptions = [
    ComponentType.SELECT,
    ComponentType.MULTI_SELECT,
    ComponentType.RADIO,
    ComponentType.CHECKBOX,
  ].includes(selectedType);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Component Type Selection */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Component Type
        </label>
        <div className="grid grid-cols-3 gap-3">
          {COMPONENT_TYPES.map(({ type, label: typeLabel, icon: Icon }) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedType === type
                  ? 'border-primary-base bg-primary-light/10'
                  : 'border-border-primary hover:border-primary-light'
              }`}
            >
              <Icon className={`h-5 w-5 mx-auto mb-1 ${
                selectedType === type ? 'text-primary-base' : 'text-text-secondary'
              }`} />
              <div className={`text-xs ${
                selectedType === type ? 'text-primary-base font-medium' : 'text-text-secondary'
              }`}>
                {typeLabel}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Basic Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Label *
          </label>
          <Input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Enter field label"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Field Name
          </label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Auto-generated from label"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Placeholder
        </label>
        <Input
          type="text"
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
          placeholder="Enter placeholder text"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add helpful description"
          className="w-full px-3 py-2 border border-border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary-base"
          rows={2}
        />
      </div>

      {/* Required Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="required"
          checked={required}
          onChange={(e) => setRequired(e.target.checked)}
          className="h-4 w-4 text-primary-base border-border-primary rounded focus:ring-primary-base"
        />
        <label htmlFor="required" className="ml-2 text-sm text-text-primary">
          Required field
        </label>
      </div>

      {/* Options for Select/Radio/Checkbox */}
      {needsOptions && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-text-primary">
              Options
            </label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleAddOption}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Option
            </Button>
          </div>
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="text"
                  value={option.label}
                  onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                  placeholder="Label"
                  className="flex-1"
                />
                <Input
                  type="text"
                  value={option.value}
                  onChange={(e) => handleOptionChange(index, 'value', e.target.value)}
                  placeholder="Value"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveOption(index)}
                >
                  <Trash2 className="h-4 w-4 text-status-error" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-border-primary">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {component ? 'Update Component' : 'Add Component'}
        </Button>
      </div>
    </form>
  );
};
