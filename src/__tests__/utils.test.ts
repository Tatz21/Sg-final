import { describe, it, expect } from 'vitest';
import { formatPrice, formatArea, slugify } from '@/lib/utils';
import { hasPermission } from '@/lib/auth';

describe('Utility and Currency Formatters', () => {
  it('formats INR currency correctly', () => {
    const formatted = formatPrice(225000, 'INR');
    expect(formatted).toContain('2,25,000');
  });

  it('formats AED currency correctly', () => {
    const formatted = formatPrice(3200000, 'AED');
    expect(formatted).toContain('AED');
    expect(formatted).toContain('3,200,000');
  });

  it('handles null price with Price on Request', () => {
    expect(formatPrice(null)).toBe('Price on Request');
  });

  it('formats area with correct units preserved', () => {
    expect(formatArea(800, 'sq ft')).toBe('800 sq ft');
    expect(formatArea(46, 'sqm')).toBe('46 sqm');
    expect(formatArea(null)).toBe('Area on Request');
  });

  it('generates consistent url slugs', () => {
    expect(slugify('LePont by RLC Residences')).toBe('lepont-by-rlc-residences');
    expect(slugify('Azure by Lapis (RAK Central)')).toBe('azure-by-lapis-rak-central');
  });
});

describe('RBAC Permission Hierarchy', () => {
  it('allows SUPER_ADMIN to perform any role action', () => {
    expect(hasPermission('SUPER_ADMIN', 'SALES')).toBe(true);
    expect(hasPermission('SUPER_ADMIN', 'EDITOR')).toBe(true);
    expect(hasPermission('SUPER_ADMIN', 'ADMIN')).toBe(true);
    expect(hasPermission('SUPER_ADMIN', 'SUPER_ADMIN')).toBe(true);
  });

  it('restricts SALES from editor and admin actions', () => {
    expect(hasPermission('SALES', 'SALES')).toBe(true);
    expect(hasPermission('SALES', 'EDITOR')).toBe(false);
    expect(hasPermission('SALES', 'ADMIN')).toBe(false);
  });
});

