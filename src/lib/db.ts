import { PrismaClient } from '@prisma/client';
import {
  INITIAL_COUNTRIES,
  INITIAL_INVESTMENTS,
  INITIAL_PROPERTIES,
  INITIAL_LEADS,
} from './seed-data';
import type {
  CountryItem,
  PropertyItem,
  InvestmentOfferingItem,
  LeadItem,
  LeadStatus,
} from '@/types';

// Global singleton PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// In-memory runtime store ensuring seamless DX even without active Postgres instance
class DataStore {
  countries: CountryItem[] = [...INITIAL_COUNTRIES];
  properties: PropertyItem[] = [...INITIAL_PROPERTIES];
  investments: InvestmentOfferingItem[] = [...INITIAL_INVESTMENTS];
  leads: LeadItem[] = [...INITIAL_LEADS];
  auditLogs: Array<{
    id: string;
    actor: string;
    action: string;
    entityType: string;
    entityId: string;
    details?: string;
    timestamp: string;
  }> = [
    {
      id: 'log-1',
      actor: 'system',
      action: 'BOOTSTRAP',
      entityType: 'System',
      entityId: 'seed',
      details: 'Initialized seed data with Azure by Lapis and verified Philippines inventory',
      timestamp: new Date().toISOString(),
    },
  ];

  // Countries
  getCountries() {
    return this.countries;
  }

  getCountryBySlug(slug: string) {
    return this.countries.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
  }

  // Properties
  getProperties(filters?: { countrySlug?: string; status?: string; featured?: boolean }) {
    return this.properties.filter((p) => {
      if (filters?.countrySlug && p.countrySlug.toLowerCase() !== filters.countrySlug.toLowerCase()) {
        return false;
      }
      if (filters?.status && p.status !== filters.status) {
        return false;
      }
      if (filters?.featured !== undefined && p.featured !== filters.featured) {
        return false;
      }
      return true;
    });
  }

  getPropertyBySlug(slug: string) {
    return this.properties.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
  }

  addProperty(property: PropertyItem) {
    this.properties.unshift(property);
    this.recordAudit('admin', 'CREATE', 'Property', property.id, `Created property ${property.title}`);
    return property;
  }

  updateProperty(id: string, updates: Partial<PropertyItem>) {
    const idx = this.properties.findIndex((p) => p.id === id);
    if (idx !== -1) {
      this.properties[idx] = { ...this.properties[idx], ...updates };
      this.recordAudit('admin', 'UPDATE', 'Property', id, `Updated property ${this.properties[idx].title}`);
      return this.properties[idx];
    }
    return null;
  }

  // Investments
  getInvestments(filters?: { status?: string; featured?: boolean }) {
    return this.investments.filter((inv) => {
      if (filters?.status && inv.status !== filters.status) {
        return false;
      }
      if (filters?.featured !== undefined && inv.featured !== filters.featured) {
        return false;
      }
      return true;
    });
  }

  getInvestmentBySlug(slug: string) {
    return this.investments.find((inv) => inv.slug.toLowerCase() === slug.toLowerCase());
  }

  addInvestment(investment: InvestmentOfferingItem) {
    this.investments.unshift(investment);
    this.recordAudit('admin', 'CREATE', 'InvestmentOffering', investment.id, `Created investment ${investment.title}`);
    return investment;
  }

  updateInvestment(id: string, updates: Partial<InvestmentOfferingItem>) {
    const idx = this.investments.findIndex((inv) => inv.id === id);
    if (idx !== -1) {
      this.investments[idx] = { ...this.investments[idx], ...updates };
      this.recordAudit('admin', 'UPDATE', 'InvestmentOffering', id, `Updated investment ${this.investments[idx].title}`);
      return this.investments[idx];
    }
    return null;
  }

  // Leads
  getLeads(filters?: { status?: LeadStatus; search?: string }) {
    return this.leads.filter((lead) => {
      if (filters?.status && lead.status !== filters.status) {
        return false;
      }
      if (filters?.search) {
        const q = filters.search.toLowerCase();
        return (
          lead.name.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          lead.phone.includes(q) ||
          (lead.propertyTitle && lead.propertyTitle.toLowerCase().includes(q)) ||
          (lead.investmentTitle && lead.investmentTitle.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }

  getLeadById(id: string) {
    return this.leads.find((l) => l.id === id);
  }

  createLead(data: Omit<LeadItem, 'id' | 'createdAt' | 'status'> & { status?: LeadStatus }): LeadItem {
    const newLead: LeadItem = {
      ...data,
      id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      status: data.status || 'NEW',
      createdAt: new Date().toISOString(),
      internalNotes: [],
    };
    this.leads.unshift(newLead);
    this.recordAudit(
      'system',
      'CREATE',
      'Lead',
      newLead.id,
      `New lead received from ${newLead.name} (${newLead.email})`
    );
    return newLead;
  }

  updateLeadStatus(id: string, status: LeadStatus, assignedTo?: string) {
    const lead = this.leads.find((l) => l.id === id);
    if (lead) {
      const prev = lead.status;
      lead.status = status;
      if (assignedTo !== undefined) lead.assignedToName = assignedTo;
      this.recordAudit('admin', 'UPDATE_STATUS', 'Lead', id, `Changed lead status from ${prev} to ${status}`);
      return lead;
    }
    return null;
  }

  addLeadNote(leadId: string, authorName: string, body: string) {
    const lead = this.leads.find((l) => l.id === leadId);
    if (lead) {
      if (!lead.internalNotes) lead.internalNotes = [];
      const note = {
        id: `note-${Date.now()}`,
        authorName,
        body,
        createdAt: new Date().toISOString(),
      };
      lead.internalNotes.push(note);
      this.recordAudit('admin', 'ADD_NOTE', 'Lead', leadId, `Added internal note by ${authorName}`);
      return note;
    }
    return null;
  }

  // Audit Logs
  recordAudit(actor: string, action: string, entityType: string, entityId: string, details?: string) {
    this.auditLogs.unshift({
      id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      actor,
      action,
      entityType,
      entityId,
      details,
      timestamp: new Date().toISOString(),
    });
  }

  getAuditLogs() {
    return this.auditLogs;
  }
}

// Global data repository singleton
const globalForStore = globalThis as unknown as {
  store: DataStore | undefined;
};

export const repository = globalForStore.store ?? new DataStore();
if (process.env.NODE_ENV !== 'production') globalForStore.store = repository;

