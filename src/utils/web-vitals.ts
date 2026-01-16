/**
 * Web Vitals 性能监控
 * 监控核心 Web 指标（Core Web Vitals）
 * LCP: Largest Contentful Paint - 最大内容绘制
 * FID: First Input Delay - 首次输入延迟
 * CLS: Cumulative Layout Shift - 累积布局偏移
 * 以及补充指标
 */

interface VitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needsImprovement' | 'poor';
  delta?: number;
  id: string;
  navigationType?: string;
}

/**
 * 性能阈值定义
 */
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  TTFB: { good: 600, poor: 1800 },
  FCP: { good: 1800, poor: 3000 },
  INP: { good: 200, poor: 500 },
};

/**
 * 获取阈值评级
 */
function getRating(
  value: number,
  metric: keyof typeof THRESHOLDS
): 'good' | 'needsImprovement' | 'poor' {
  const threshold = THRESHOLDS[metric];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needsImprovement';
  return 'poor';
}

/**
 * 获取 LCP (最大内容绘制)
 * 衡量页面加载感知速度
 */
export function getLCP(callback: (metric: VitalMetric) => void): void {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];

    const metric: VitalMetric = {
      name: 'LCP',
      value: lastEntry.renderTime || lastEntry.loadTime,
      rating: getRating(
        lastEntry.renderTime || lastEntry.loadTime,
        'LCP'
      ),
      id: `v3-${Date.now()}`,
    };

    callback(metric);
  });

  try {
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    console.warn('LCP observer not supported');
  }
}

/**
 * 获取 FID (首次输入延迟)
 * 衡量页面交互能力
 */
export function getFID(callback: (metric: VitalMetric) => void): void {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      const metric: VitalMetric = {
        name: 'FID',
        value: entry.processingStart - entry.startTime,
        rating: getRating(entry.processingStart - entry.startTime, 'FID'),
        id: `v3-${Date.now()}`,
      };
      callback(metric);
    });
  });

  try {
    observer.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    console.warn('FID observer not supported');
  }
}

/**
 * 获取 CLS (累积布局偏移)
 * 衡量页面视觉稳定性
 */
export function getCLS(callback: (metric: VitalMetric) => void): void {
  let clsValue = 0;

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;

        const metric: VitalMetric = {
          name: 'CLS',
          value: clsValue,
          rating: getRating(clsValue, 'CLS'),
          id: `v3-${Date.now()}`,
        };
        callback(metric);
      }
    });
  });

  try {
    observer.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    console.warn('CLS observer not supported');
  }
}

/**
 * 获取 TTFB (首字节时间)
 * 衡量服务器响应速度
 */
export function getTTFB(callback: (metric: VitalMetric) => void): void {
  const navigationTiming = performance.getEntriesByType('navigation')[0];

  if (navigationTiming) {
    const ttfb =
      (navigationTiming as PerformanceNavigationTiming)
        .responseStart -
      (navigationTiming as PerformanceNavigationTiming)
        .fetchStart;

    const metric: VitalMetric = {
      name: 'TTFB',
      value: ttfb,
      rating: getRating(ttfb, 'TTFB'),
      id: `v3-${Date.now()}`,
    };

    callback(metric);
  }
}

/**
 * 获取 FCP (首次内容绘制)
 * 衡量首次有内容绘制的时间
 */
export function getFCP(callback: (metric: VitalMetric) => void): void {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      const metric: VitalMetric = {
        name: 'FCP',
        value: entry.startTime,
        rating: getRating(entry.startTime, 'FCP'),
        id: `v3-${Date.now()}`,
      };
      callback(metric);
    });
  });

  try {
    observer.observe({ type: 'paint', buffered: true });
  } catch (e) {
    console.warn('FCP observer not supported');
  }
}

/**
 * 获取 INP (交互至下一绘制)
 * 衡量页面整体交互性（FID 的替代品）
 */
export function getINP(callback: (metric: VitalMetric) => void): void {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    let maxDuration = 0;

    entries.forEach((entry: any) => {
      if (entry.duration > maxDuration) {
        maxDuration = entry.duration;
      }
    });

    const metric: VitalMetric = {
      name: 'INP',
      value: maxDuration,
      rating: getRating(maxDuration, 'INP'),
      id: `v3-${Date.now()}`,
    };
    callback(metric);
  });

  try {
    observer.observe({ type: 'event', buffered: true });
  } catch (e) {
    console.warn('INP observer not supported');
  }
}

/**
 * 性能监控管理器
 * 统一管理所有性能指标
 */
export class PerformanceMonitoringManager {
  private metrics: Map<string, VitalMetric> = new Map();
  private onMetricCallback?: (metric: VitalMetric) => void;
  private sendToAnalytics?: (metric: VitalMetric) => void;

  constructor(options?: {
    onMetric?: (metric: VitalMetric) => void;
    sendToAnalytics?: (metric: VitalMetric) => void;
  }) {
    this.onMetricCallback = options?.onMetric;
    this.sendToAnalytics = options?.sendToAnalytics;
  }

  /**
   * 启动所有监控
   */
  startMonitoring(): void {
    // 只在生产环境和用户同意的情况下启动
    if (this.shouldMonitor()) {
      this.monitorLCP();
      this.monitorFID();
      this.monitorCLS();
      this.monitorTTFB();
      this.monitorFCP();
      this.monitorINP();

      console.log('✅ 性能监控已启动');
    }
  }

  private shouldMonitor(): boolean {
    // 可根据用户隐私设置、环境等条件判断
    if (typeof window === 'undefined') return false;

    // 检查用户是否允许分析
    if ('navigator' in window && 'doNotTrack' in navigator) {
      return navigator.doNotTrack !== '1';
    }

    return true;
  }

  private monitorLCP(): void {
    getLCP((metric) => {
      this.recordMetric(metric);
      this.onMetricCallback?.(metric);
    });
  }

  private monitorFID(): void {
    getFID((metric) => {
      this.recordMetric(metric);
      this.onMetricCallback?.(metric);
    });
  }

  private monitorCLS(): void {
    getCLS((metric) => {
      this.recordMetric(metric);
      this.onMetricCallback?.(metric);
    });
  }

  private monitorTTFB(): void {
    getTTFB((metric) => {
      this.recordMetric(metric);
      this.onMetricCallback?.(metric);
    });
  }

  private monitorFCP(): void {
    getFCP((metric) => {
      this.recordMetric(metric);
      this.onMetricCallback?.(metric);
    });
  }

  private monitorINP(): void {
    getINP((metric) => {
      this.recordMetric(metric);
      this.onMetricCallback?.(metric);
    });
  }

  private recordMetric(metric: VitalMetric): void {
    this.metrics.set(metric.name, metric);

    // 输出到控制台
    const emoji =
      metric.rating === 'good'
        ? '✅'
        : metric.rating === 'needsImprovement'
          ? '⚠️ '
          : '❌';

    console.log(
      `${emoji} ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`
    );

    // 发送到分析服务
    if (this.sendToAnalytics) {
      this.sendToAnalytics(metric);
    }
  }

  /**
   * 获取所有已记录的指标
   */
  getMetrics(): Map<string, VitalMetric> {
    return this.metrics;
  }

  /**
   * 生成性能报告
   */
  generateReport(): {
    timestamp: string;
    metrics: Record<string, VitalMetric>;
    summary: 'good' | 'needsImprovement' | 'poor';
  } {
    const metricsRecord: Record<string, VitalMetric> = {};
    this.metrics.forEach((metric) => {
      metricsRecord[metric.name] = metric;
    });

    // 计算总体评级
    let poorCount = 0;
    let needsImprovementCount = 0;

    this.metrics.forEach((metric) => {
      if (metric.rating === 'poor') poorCount++;
      else if (metric.rating === 'needsImprovement') needsImprovementCount++;
    });

    const summary =
      poorCount > 0
        ? 'poor'
        : needsImprovementCount > 0
          ? 'needsImprovement'
          : 'good';

    return {
      timestamp: new Date().toISOString(),
      metrics: metricsRecord,
      summary,
    };
  }
}

/**
 * 使用示例
 * 在 Astro 或主布局文件中添加：
 *
 * <script is:inline>
 *   import { PerformanceMonitoringManager } from '@utils/web-vitals';
 *
 *   if (import.meta.env.PROD) {
 *     const manager = new PerformanceMonitoringManager({
 *       onMetric: (metric) => {
 *         // 本地处理
 *         console.log('Metric:', metric);
 *       },
 *       sendToAnalytics: async (metric) => {
 *         // 发送到分析服务（如 Google Analytics, Umami 等）
 *         try {
 *           await fetch('/api/analytics', {
 *             method: 'POST',
 *             body: JSON.stringify(metric),
 *           });
 *         } catch (error) {
 *           console.error('Failed to send metric:', error);
 *         }
 *       },
 *     });
 *
 *     manager.startMonitoring();
 *
 *     // 页面卸载时获取报告
 *     window.addEventListener('beforeunload', () => {
 *       const report = manager.generateReport();
 *       console.log('Performance Report:', report);
 *     });
 *   }
 * </script>
 */
