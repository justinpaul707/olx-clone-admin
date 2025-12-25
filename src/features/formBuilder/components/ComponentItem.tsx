import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { type FormComponent, ComponentType } from '@app/features/formBuilder/types';
import { 
  GripVertical, 
  Edit2, 
  Trash2,
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
  MapPin
} from 'lucide-react';
import { Button } from '@app/components/ui/button';

interface ComponentItemProps {
  component: FormComponent;
  onEdit: (component: FormComponent) => void;
  onDelete: (componentId: string) => void;
}

const COMPONENT_ICONS: Record<ComponentType, React.ElementType> = {
  [ComponentType.TEXT_INPUT]: Type,
  [ComponentType.TEXTAREA]: AlignLeft,
  [ComponentType.NUMBER_INPUT]: Hash,
  [ComponentType.SELECT]: ListOrdered,
  [ComponentType.MULTI_SELECT]: CheckSquare,
  [ComponentType.RADIO]: Circle,
  [ComponentType.CHECKBOX]: CheckSquare,
  [ComponentType.DATE_PICKER]: Calendar,
  [ComponentType.FILE_UPLOAD]: Upload,
  [ComponentType.IMAGE_UPLOAD]: Image,
  [ComponentType.RANGE_SLIDER]: Sliders,
  [ComponentType.LOCATION_PICKER]: MapPin,
};

export const ComponentItem: React.FC<ComponentItemProps> = ({
  component,
  onEdit,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const Icon = COMPONENT_ICONS[component.type];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-surface-base border border-border-primary rounded-lg p-4 ${
        isDragging ? 'shadow-lg' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="mt-1 cursor-grab active:cursor-grabbing text-text-tertiary hover:text-text-primary"
        >
          <GripVertical className="h-5 w-5" />
        </button>

        {/* Component Icon */}
        <div className="mt-0.5">
          <Icon className="h-5 w-5 text-primary-base" />
        </div>

        {/* Component Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-text-primary truncate">
              {component.label}
            </h4>
            {component.required && (
              <span className="text-xs px-2 py-0.5 bg-status-error/10 text-status-error rounded">
                Required
              </span>
            )}
          </div>
          <p className="text-sm text-text-secondary mb-2">
            {component.type.replace(/_/g, ' ')}
          </p>
          {component.description && (
            <p className="text-xs text-text-tertiary">{component.description}</p>
          )}
          {component.options && component.options.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {component.options.slice(0, 3).map((opt, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 bg-surface-elevated rounded text-text-secondary"
                >
                  {opt.label}
                </span>
              ))}
              {component.options.length > 3 && (
                <span className="text-xs px-2 py-0.5 text-text-tertiary">
                  +{component.options.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(component)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(component.id)}
          >
            <Trash2 className="h-4 w-4 text-status-error" />
          </Button>
        </div>
      </div>
    </div>
  );
};
