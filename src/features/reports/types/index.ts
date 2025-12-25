export interface ReportFilters {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  location?: string;
  userId?: string;
  categoryId?: string;
  subcategoryId?: string;
  compareWith?: {
    startDate: string;
    endDate: string;
  };
}

export interface PerformanceMetric {
  date: string;
  revenue: number;
  newListings: number;
  activeUsers: number;
  totalTransactions: number;
}

export interface ComparisonData {
  metric: string;
  currentPeriod: number;
  previousPeriod: number;
  changePercentage: number;
}

export interface ReportData {
  performance: PerformanceMetric[];
  summary: {
    totalRevenue: number;
    totalListings: number;
    totalUsers: number;
    growth: number;
  };
  comparison?: ComparisonData[];
}
