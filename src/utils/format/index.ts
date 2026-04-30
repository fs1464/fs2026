export function formatCurrency(value: number): string {
  if (!value && value !== 0) return '-';
  if (value >= 1_00_00_000) return `INR ${(value / 1_00_00_000).toFixed(2)} Cr`;
  if (value >= 1_00_000) return `INR ${(value / 1_00_000).toFixed(2)} L`;
  if (value >= 1_000) return `INR ${(value / 1_000).toFixed(1)}K`;
  return `INR ${value}`;
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return '-';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '-';
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function daysUntil(value: string | null | undefined): number | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  const diff = d.getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
