import React from 'react';
import { Input } from '@app/components/ui/input';
import { Label } from '@app/components/ui/label';
import { Checkbox } from '@app/components/ui/checkbox';
import { PropertyStatus, PropertyCondition } from '../../types';

interface DetailsStepProps {
  formData: {
    title: string;
    description: string;
    price: number;
    currency: string;
    status: PropertyStatus;
    condition: PropertyCondition;
    isNegotiable: boolean;
  };
  onChange: (field: string, value: any) => void;
}

export const DetailsStep: React.FC<DetailsStepProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 gap-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Property Title</Label>
          <Input
            id="title"
            placeholder="e.g. Luxury Apartment in Downtown"
            value={formData.title}
            onChange={(e) => onChange('title', e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            rows={5}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Describe the property details..."
            value={formData.description}
            onChange={(e) => onChange('description', e.target.value)}
          />
        </div>

        {/* Price and Currency */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              min="0"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => onChange('price', parseFloat(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <select
              id="currency"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.currency}
              onChange={(e) => onChange('currency', e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
            </select>
          </div>
        </div>

        {/* Status and Condition */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.status}
              onChange={(e) => onChange('status', e.target.value)}
            >
              {Object.values(PropertyStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <select
              id="condition"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.condition}
              onChange={(e) => onChange('condition', e.target.value)}
            >
              {Object.values(PropertyCondition).map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Options */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isNegotiable"
            checked={formData.isNegotiable}
            onCheckedChange={(checked) => onChange('isNegotiable', checked)}
          />
          <Label htmlFor="isNegotiable" className="cursor-pointer">
            Price is Negotiable
          </Label>
        </div>
      </div>
    </div>
  );
};
