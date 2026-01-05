/**
 * Report interfaces and types
 */

export interface IReport {
  id: string;
  title: string;
  type: ReportType;
  createdAt: Date;
  sections: ReportSection[];
  metadata: ReportMetadata;
  filters?: ReportFilters;
  formatting?: ReportFormatting;
  charts?: Chart[];
  exportOptions?: ExportOptions;
}

export enum ReportType {
  SALES = 'sales',
  ANALYTICS = 'analytics',
  FINANCIAL = 'financial',
  INVENTORY = 'inventory',
  CUSTOMER = 'customer',
}

export interface ReportSection {
  title: string;
  content: any;
  order: number;
}

export interface ReportMetadata {
  author: string;
  department: string;
  confidentiality: 'public' | 'internal' | 'confidential';
  tags: string[];
}

export interface ReportFilters {
  dateRange?: { start: Date; end: Date };
  categories?: string[];
  regions?: string[];
  minAmount?: number;
  maxAmount?: number;
}

export interface ReportFormatting {
  theme: 'light' | 'dark' | 'corporate';
  fontSize: number;
  includePageNumbers: boolean;
  includeTableOfContents: boolean;
  watermark?: string;
}

export interface Chart {
  type: 'bar' | 'line' | 'pie' | 'scatter';
  title: string;
  data: any[];
}

export interface ExportOptions {
  formats: ('pdf' | 'excel' | 'csv' | 'json')[];
  compression: boolean;
  password?: string;
}
