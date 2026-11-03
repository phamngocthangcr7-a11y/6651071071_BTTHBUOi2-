export function formatCurrency(amount: number, currency: string = 'VND'): string {
  const formatted = new Intl.NumberFormat('vi-VN').format(Math.abs(amount));
  const sign = amount < 0 ? '-' : '';
  const symbol = currency === 'VND' ? '₫' : currency;
  return `${sign}${formatted} ${symbol}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email.trim());
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return ((...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  }) as T;
}
