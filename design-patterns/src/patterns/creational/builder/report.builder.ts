import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  IReport,
  ReportType,
  ReportMetadata,
  ReportFilters,
  ReportFormatting,
  Chart,
  ExportOptions,
} from './interfaces/report.interface';

/**
 * Report Builder - Builder Pattern Implementation
 * 
 * PROBLEM: Creating complex reports with many optional parameters is cumbersome
 * and error-prone. Constructor with 20+ parameters is unmanageable.
 * 
 * SOLUTION: Builder pattern provides a fluent interface for constructing
 * complex objects step by step.
 * 
 * REAL-WORLD USE CASE:
 * - Business intelligence reports
 * - Financial statements
 * - Analytics dashboards
 * - Custom data exports
 */
@Injectable()
export class ReportBuilder {
  private report: Partial<IReport>;

  constructor() {
    this.reset();
  }

  /**
   * Reset the builder to create a new report
   */
  reset(): ReportBuilder {
    this.report = {
      id: uuidv4(),
      createdAt: new Date(),
      sections: [],
      metadata: {
        author: 'System',
        department: 'General',
        confidentiality: 'internal',
        tags: [],
      },
    };
    return this;
  }

  /**
   * Set basic report information
   */
  setBasicInfo(title: string, type: ReportType): ReportBuilder {
    this.report.title = title;
    this.report.type = type;
    return this;
  }

  /**
   * Set report metadata
   */
  setMetadata(metadata: Partial<ReportMetadata>): ReportBuilder {
    this.report.metadata = {
      author: metadata.author ?? this.report.metadata?.author ?? '',
      department: metadata.department ?? this.report.metadata?.department ?? '',
      confidentiality: metadata.confidentiality ?? this.report.metadata?.confidentiality ?? 'internal',
      tags: metadata.tags ?? this.report.metadata?.tags ?? [],
    };
    return this;
  }

  /**
   * Add a section to the report
   */
  addSection(title: string, content: any): ReportBuilder {
    if (!this.report.sections) {
      this.report.sections = [];
    }
    this.report.sections.push({
      title,
      content,
      order: this.report.sections.length + 1,
    });
    return this;
  }

  /**
   * Add multiple sections at once
   */
  addSections(sections: { title: string; content: any }[]): ReportBuilder {
    sections.forEach((section) => {
      this.addSection(section.title, section.content);
    });
    return this;
  }

  /**
   * Set report filters
   */
  setFilters(filters: ReportFilters): ReportBuilder {
    this.report.filters = filters;
    return this;
  }

  /**
   * Set date range filter
   */
  setDateRange(start: Date, end: Date): ReportBuilder {
    if (!this.report.filters) {
      this.report.filters = {};
    }
    this.report.filters.dateRange = { start, end };
    return this;
  }

  /**
   * Set report formatting
   */
  setFormatting(formatting: ReportFormatting): ReportBuilder {
    this.report.formatting = formatting;
    return this;
  }

  /**
   * Apply a predefined theme
   */
  applyTheme(theme: 'light' | 'dark' | 'corporate'): ReportBuilder {
    if (!this.report.formatting) {
      this.report.formatting = {
        theme,
        fontSize: 12,
        includePageNumbers: true,
        includeTableOfContents: false,
      };
    } else {
      this.report.formatting.theme = theme;
    }
    return this;
  }

  /**
   * Add a chart to the report
   */
  addChart(chart: Chart): ReportBuilder {
    if (!this.report.charts) {
      this.report.charts = [];
    }
    this.report.charts.push(chart);
    return this;
  }

  /**
   * Set export options
   */
  setExportOptions(options: ExportOptions): ReportBuilder {
    this.report.exportOptions = options;
    return this;
  }

  /**
   * Build and return the final report
   */
  build(): IReport {
    // Validate required fields
    if (!this.report.title || !this.report.type) {
      throw new Error('Report title and type are required');
    }

    const builtReport = { ...this.report } as IReport;
    
    // Reset builder for next use
    this.reset();
    
    return builtReport;
  }

  /**
   * Build a predefined sales report
   */
  buildSalesReport(dateRange: { start: Date; end: Date }): IReport {
    return this.reset()
      .setBasicInfo('Monthly Sales Report', ReportType.SALES)
      .setMetadata({
        author: 'Sales Department',
        department: 'Sales',
        confidentiality: 'internal',
        tags: ['sales', 'monthly', 'revenue'],
      })
      .setDateRange(dateRange.start, dateRange.end)
      .addSection('Executive Summary', {
        totalSales: 150000,
        growth: '+12%',
        topProducts: ['Product A', 'Product B', 'Product C'],
      })
      .addSection('Detailed Breakdown', {
        byRegion: { US: 80000, EU: 50000, ASIA: 20000 },
        byCategory: { Electronics: 90000, Clothing: 60000 },
      })
      .addChart({
        type: 'bar',
        title: 'Sales by Region',
        data: [
          { region: 'US', amount: 80000 },
          { region: 'EU', amount: 50000 },
          { region: 'ASIA', amount: 20000 },
        ],
      })
      .applyTheme('corporate')
      .setExportOptions({
        formats: ['pdf', 'excel'],
        compression: true,
      })
      .build();
  }

  /**
   * Build a predefined analytics report
   */
  buildAnalyticsReport(): IReport {
    return this.reset()
      .setBasicInfo('User Analytics Dashboard', ReportType.ANALYTICS)
      .setMetadata({
        author: 'Analytics Team',
        department: 'Product',
        confidentiality: 'confidential',
        tags: ['analytics', 'users', 'engagement'],
      })
      .addSections([
        {
          title: 'User Metrics',
          content: {
            totalUsers: 50000,
            activeUsers: 35000,
            newUsers: 5000,
          },
        },
        {
          title: 'Engagement Metrics',
          content: {
            avgSessionDuration: '12 minutes',
            bounceRate: '35%',
            pagesPerSession: 4.5,
          },
        },
      ])
      .addChart({
        type: 'line',
        title: 'Daily Active Users',
        data: Array.from({ length: 30 }, (_, i) => ({
          day: i + 1,
          users: 30000 + Math.random() * 10000,
        })),
      })
      .applyTheme('dark')
      .build();
  }
}
