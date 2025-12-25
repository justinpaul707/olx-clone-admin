// Simple debugging wrapper for API calls
class ApiDebugger {
  private static instance: ApiDebugger;
  private calls: Array<{
    id: string;
    method: string;
    data: any;
    timestamp: number;
    status: 'pending' | 'success' | 'error';
    response?: any;
    error?: any;
  }> = [];

  static getInstance() {
    if (!ApiDebugger.instance) {
      ApiDebugger.instance = new ApiDebugger();
    }
    return ApiDebugger.instance;
  }

  logApiCall(method: string, data: any) {
    const id = `${method}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const call = {
      id,
      method,
      data,
      timestamp: Date.now(),
      status: 'pending' as const,
    };
    
    this.calls.unshift(call);
    return id;
  }

  logApiSuccess(id: string, response: any) {
    const call = this.calls.find(c => c.id === id);
    if (call) {
      call.status = 'success';
      call.response = response;
    }
  }

  logApiError(id: string, error: any) {
    const call = this.calls.find(c => c.id === id);
    if (call) {
      call.status = 'error';
      call.error = error;
    }
  }

  getCalls() {
    return [...this.calls];
  }

  clearCalls() {
    this.calls = [];
  }
}

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).apiDebugger = ApiDebugger.getInstance();
}

export const apiDebugger = ApiDebugger.getInstance();
