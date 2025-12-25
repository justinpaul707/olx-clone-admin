import React from 'react';
import { Card } from '@app/components/ui/card';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  format?: 'number' | 'currency' | 'percentage';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  format = 'number'
}) => {
  const formatValue = (val: number | string): string => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
        }).format(val);
      case 'percentage':
        return `${val}%`;
      default:
        return new Intl.NumberFormat('en-US').format(val);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="p-2 bg-blue-100 rounded-lg">
              {icon}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatValue(value)}
            </p>
          </div>
        </div>
        
        {trend && (
          <div className={`flex items-center space-x-1 text-sm ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <span className={`inline-block w-0 h-0 border-l-4 border-r-4 border-solid ${
              trend.isPositive 
                ? 'border-l-transparent border-r-transparent border-b-4 border-b-green-600' 
                : 'border-l-transparent border-r-transparent border-t-4 border-t-red-600'
            }`} />
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatsCard;