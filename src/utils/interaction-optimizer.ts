/**
 * 交互性能优化工具类
 * 提供防抖、节流、虚拟滚动等性能相关工具
 * 使用方式：import { InteractionOptimizer } from '@utils/interaction-optimizer';
 */

/**
 * 防抖函数 - 延迟执行，直到事件停止触发后指定时间
 * 用于：搜索输入、窗口大小调整等
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function debounced(...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * 节流函数 - 定时执行，在指定时间间隔内最多执行一次
 * 用于：滚动事件、鼠标移动等
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  interval: number = 300
): (...args: Parameters<T>) => void {
  let lastCallTime = 0;
  
  return function throttled(...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCallTime >= interval) {
      lastCallTime = now;
      fn(...args);
    }
  };
}

/**
 * 交集观察器 - 监控元素可见性
 * 用于：懒加载、无限滚动、元素进入视口检测
 */
export class IntersectionObserverManager {
  private observer: IntersectionObserver;

  constructor(
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
  ) {
    const defaultOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
      ...options,
    };

    this.observer = new IntersectionObserver(callback, defaultOptions);
  }

  observe(element: Element): void {
    this.observer.observe(element);
  }

  observeAll(selector: string): void {
    document.querySelectorAll(selector).forEach(el => this.observe(el));
  }

  unobserve(element: Element): void {
    this.observer.unobserve(element);
  }

  disconnect(): void {
    this.observer.disconnect();
  }

  getObserver(): IntersectionObserver {
    return this.observer;
  }
}

/**
 * 事件委托 - 使用事件委托减少事件监听器数量
 * 用于：列表项点击、动态内容事件处理
 */
export class EventDelegator {
  private parent: Element;
  private handlers: Map<string, Map<string, EventListener>> = new Map();

  constructor(parent: Element) {
    this.parent = parent;
  }

  on(selector: string, eventType: string, handler: EventListener): void {
    const boundHandler = (e: Event) => {
      const target = e.target as Element;
      if (target?.matches(selector)) {
        handler.call(target, e);
      }
    };

    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Map());
    }
    this.handlers.get(eventType)!.set(selector, boundHandler);

    this.parent.addEventListener(eventType, boundHandler as EventListener);
  }

  off(selector: string, eventType: string): void {
    const handler = this.handlers.get(eventType)?.get(selector);
    if (handler) {
      this.parent.removeEventListener(eventType, handler);
      this.handlers.get(eventType)?.delete(selector);
    }
  }

  offAll(): void {
    this.handlers.forEach((typeHandlers, eventType) => {
      typeHandlers.forEach((handler) => {
        this.parent.removeEventListener(eventType, handler);
      });
    });
    this.handlers.clear();
  }
}

/**
 * 虚拟滚动 - 只渲染可见的元素，用于长列表
 * 用于：文章列表、图片库等大量项目
 */
export class VirtualScroller {
  private container: HTMLElement;
  private items: HTMLElement[];
  private itemHeight: number;
  private visibleCount: number;
  private startIndex: number = 0;
  private observer: ResizeObserver;

  constructor(
    container: HTMLElement,
    itemHeight: number,
    onRender: (startIdx: number, endIdx: number) => void
  ) {
    this.container = container;
    this.itemHeight = itemHeight;
    this.items = Array.from(container.children) as HTMLElement[];
    this.visibleCount = Math.ceil(container.clientHeight / itemHeight);

    // 初始化虚拟滚动
    this.updateVisibleItems(onRender);

    // 监听滚动
    container.addEventListener(
      'scroll',
      throttle(() => this.updateVisibleItems(onRender), 50)
    );

    // 监听容器大小变化
    this.observer = new ResizeObserver(() => {
      this.visibleCount = Math.ceil(container.clientHeight / itemHeight);
      this.updateVisibleItems(onRender);
    });
    this.observer.observe(container);
  }

  private updateVisibleItems(
    onRender: (startIdx: number, endIdx: number) => void
  ): void {
    const scrollTop = this.container.scrollTop;
    const startIndex = Math.max(0, Math.floor(scrollTop / this.itemHeight));
    const endIndex = Math.min(
      this.items.length,
      startIndex + this.visibleCount + 1
    );

    if (startIndex !== this.startIndex) {
      this.startIndex = startIndex;
      onRender(startIndex, endIndex);
    }
  }

  destroy(): void {
    this.observer.disconnect();
  }
}

/**
 * 批量 DOM 操作 - 使用 DocumentFragment 批量插入
 */
export function batchInsertDOM(
  parent: Element,
  elements: Element[],
  batchSize: number = 50
): void {
  let i = 0;
  const insert = () => {
    const fragment = document.createDocumentFragment();
    const end = Math.min(i + batchSize, elements.length);

    for (; i < end; i++) {
      fragment.appendChild(elements[i]);
    }

    parent.appendChild(fragment);

    if (i < elements.length) {
      requestAnimationFrame(insert);
    }
  };

  insert();
}

/**
 * 图片懒加载 - 结合 IntersectionObserver
 */
export class LazyImageLoader {
  private loaded: Set<HTMLImageElement> = new Set();

  load(selector: string = 'img[data-src]'): void {
    const images = document.querySelectorAll<HTMLImageElement>(selector);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (!this.loaded.has(img)) {
            img.src = img.dataset.src || '';
            img.onload = () => {
              img.classList.add('loaded');
              this.loaded.add(img);
            };
            observer.unobserve(img);
          }
        }
      });
    });

    images.forEach((img) => observer.observe(img));
  }
}

/**
 * 平滑过渡 - requestAnimationFrame 动画
 */
export class SmoothTransition {
  static smoothScroll(
    target: number,
    duration: number = 300,
    easing: (t: number) => number = this.easeInOutQuad
  ): Promise<void> {
    return new Promise((resolve) => {
      const start = window.scrollY;
      const startTime = performance.now();
      const distance = target - start;

      const scroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easing(progress);

        window.scrollTo(0, start + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(scroll);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(scroll);
    });
  }

  static easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  static easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 + (t - 1) * (2 * (t - 2)) * (2 * (t - 2));
  }
}

/**
 * 性能监控 - 测量函数执行时间
 */
export class PerformanceMonitor {
  static measure<T>(name: string, fn: () => T): T {
    const startMark = `${name}-start`;
    const endMark = `${name}-end`;

    performance.mark(startMark);
    const result = fn();
    performance.mark(endMark);

    performance.measure(name, startMark, endMark);

    const measure = performance.getEntriesByName(name)[0];
    console.log(
      `⏱️  ${name}: ${(measure?.duration || 0).toFixed(2)}ms`
    );

    return result;
  }

  static async measureAsync<T>(
    name: string,
    fn: () => Promise<T>
  ): Promise<T> {
    const startMark = `${name}-start`;
    const endMark = `${name}-end`;

    performance.mark(startMark);
    const result = await fn();
    performance.mark(endMark);

    performance.measure(name, startMark, endMark);

    const measure = performance.getEntriesByName(name)[0];
    console.log(
      `⏱️  ${name}: ${(measure?.duration || 0).toFixed(2)}ms`
    );

    return result;
  }
}
