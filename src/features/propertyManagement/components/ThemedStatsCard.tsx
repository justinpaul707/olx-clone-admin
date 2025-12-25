import React from 'react';
import { useTheme } from '@/app/providers/hooks';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ThemedStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  description?: string;
}

export const ThemedStatsCard: React.FC<ThemedStatsCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  description,
}) => {
  const { theme } = useTheme();

  return (
    <Card
      className="p-6 hover:shadow-lg transition-all"
      style={{
        backgroundColor: theme.colors.surface.base,
        borderColor: theme.colors.border.primary,
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p
            className="text-sm font-medium mb-1"
            style={{ color: theme.colors.text.secondary }}
          >
            {title}
          </p>
          <h3
            className="text-3xl font-bold mb-2"
            style={{ color: theme.colors.text.primary }}
          >
            {value}
          </h3>
          {trend && (
            <div className="flex items-center gap-1 text-sm">
              <span
                style={{
                  color: trend.isPositive
                    ? theme.colors.status.success
                    : theme.colors.status.error,
                }}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
              {description && (
                <span style={{ color: theme.colors.text.tertiary }}>
                  {description}
                </span>
              )}
            </div>
          )}
        </div>
        <div
          className="p-3 rounded-lg"
          style={{
            backgroundColor: `${theme.colors.brand.primary}15`,
          }}
        >
          <Icon
            className="w-6 h-6"
            style={{ color: theme.colors.brand.primary }}
          />
        </div>
      </div>
    </Card>
  );
};
