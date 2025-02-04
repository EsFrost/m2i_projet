interface RequestLog {
  endpoint: string;
  method: string;
  timestamp: number;
  duration: number;
}

class RequestTracker {
  private static instance: RequestTracker;
  private requests: RequestLog[] = [];
  private listeners: Set<(count: number) => void> = new Set();

  private constructor() {}

  public static getInstance(): RequestTracker {
    if (!RequestTracker.instance) {
      RequestTracker.instance = new RequestTracker();
    }
    return RequestTracker.instance;
  }

  public trackRequest = async (
    endpoint: string,
    method: string,
    requestFn: () => Promise<Response>
  ): Promise<Response> => {
    const startTime = performance.now();
    try {
      const response = await requestFn();
      const endTime = performance.now();

      this.requests.push({
        endpoint,
        method,
        timestamp: Date.now(),
        duration: endTime - startTime,
      });

      this.notifyListeners();
      return response;
    } catch (error) {
      const endTime = performance.now();
      this.requests.push({
        endpoint,
        method,
        timestamp: Date.now(),
        duration: endTime - startTime,
      });
      this.notifyListeners();
      throw error;
    }
  };

  public getRequestCount(): number {
    return this.requests.length;
  }

  public getRequests(): RequestLog[] {
    return [...this.requests];
  }

  public getRequestCountByEndpoint(endpoint: string): number {
    return this.requests.filter((req) => req.endpoint === endpoint).length;
  }

  public clearRequests(): void {
    this.requests = [];
    this.notifyListeners();
  }

  public addListener(callback: (count: number) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners(): void {
    const count = this.getRequestCount();
    this.listeners.forEach((listener) => listener(count));
  }

  public getLastMinuteRequests(): number {
    const oneMinuteAgo = Date.now() - 60000;
    return this.requests.filter((req) => req.timestamp > oneMinuteAgo).length;
  }

  public getAverageRequestDuration(): number {
    if (this.requests.length === 0) return 0;
    const totalDuration = this.requests.reduce(
      (acc, req) => acc + req.duration,
      0
    );
    return totalDuration / this.requests.length;
  }
}

export const requestTracker = RequestTracker.getInstance();

// Custom fetch wrapper that uses the request tracker
export const trackedFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  return requestTracker.trackRequest(url, options.method || "GET", () =>
    fetch(url, options)
  );
};
