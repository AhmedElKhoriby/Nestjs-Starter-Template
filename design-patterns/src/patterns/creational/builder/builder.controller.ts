import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReportBuilder } from './report.builder';
import { ReportType } from './interfaces/report.interface';

/**
 * Builder Pattern Controller
 * 
 * Demonstrates the Builder pattern through complex report generation
 */
@ApiTags('Creational Patterns')
@Controller('patterns/builder')
export class BuilderController {
  constructor(private readonly reportBuilder: ReportBuilder) {}

  @Post('build-custom')
  @ApiOperation({ summary: 'Build a custom report using the builder' })
  @ApiResponse({ status: 200, description: 'Custom report built successfully' })
  buildCustomReport(
    @Body()
    body: {
      title: string;
      type: ReportType;
      author: string;
      sections: { title: string; content: any }[];
      theme?: 'light' | 'dark' | 'corporate';
    },
  ) {
    // Demonstrates fluent interface of Builder pattern
    const report = this.reportBuilder
      .reset()
      .setBasicInfo(body.title, body.type)
      .setMetadata({ author: body.author })
      .addSections(body.sections)
      .applyTheme(body.theme || 'corporate')
      .build();

    return {
      pattern: 'Builder',
      description: 'Builder constructed a complex report step by step',
      builderSteps: [
        'reset()',
        'setBasicInfo()',
        'setMetadata()',
        'addSections()',
        'applyTheme()',
        'build()',
      ],
      report,
    };
  }

  @Get('build-sales-report')
  @ApiOperation({ summary: 'Build a predefined sales report' })
  buildSalesReport() {
    const dateRange = {
      start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      end: new Date(),
    };

    const report = this.reportBuilder.buildSalesReport(dateRange);

    return {
      pattern: 'Builder',
      description: 'Builder used predefined construction logic for sales report',
      report,
    };
  }

  @Get('build-analytics-report')
  @ApiOperation({ summary: 'Build a predefined analytics report' })
  buildAnalyticsReport() {
    const report = this.reportBuilder.buildAnalyticsReport();

    return {
      pattern: 'Builder',
      description: 'Builder created complex analytics report with charts and metrics',
      report,
    };
  }

  @Post('build-complex')
  @ApiOperation({ summary: 'Build a complex report with all features' })
  buildComplexReport() {
    const report = this.reportBuilder
      .reset()
      .setBasicInfo('Comprehensive Business Report', ReportType.FINANCIAL)
      .setMetadata({
        author: 'Executive Team',
        department: 'Finance',
        confidentiality: 'confidential',
        tags: ['financial', 'quarterly', 'comprehensive'],
      })
      .setDateRange(
        new Date('2024-01-01'),
        new Date('2024-03-31')
      )
      .addSection('Revenue Overview', {
        totalRevenue: 5000000,
        growth: '+25%',
        forecast: 6500000,
      })
      .addSection('Expenses', {
        operational: 2000000,
        marketing: 500000,
        rd: 800000,
      })
      .addSection('Profit Analysis', {
        grossProfit: 2700000,
        netProfit: 1700000,
        margins: { gross: '54%', net: '34%' },
      })
      .addChart({
        type: 'line',
        title: 'Quarterly Revenue Trend',
        data: [
          { quarter: 'Q1', revenue: 5000000 },
          { quarter: 'Q2', revenue: 5500000 },
          { quarter: 'Q3', revenue: 6000000 },
          { quarter: 'Q4', revenue: 6500000 },
        ],
      })
      .addChart({
        type: 'pie',
        title: 'Expense Distribution',
        data: [
          { category: 'Operational', amount: 2000000 },
          { category: 'Marketing', amount: 500000 },
          { category: 'R&D', amount: 800000 },
        ],
      })
      .setFormatting({
        theme: 'corporate',
        fontSize: 11,
        includePageNumbers: true,
        includeTableOfContents: true,
        watermark: 'CONFIDENTIAL',
      })
      .setExportOptions({
        formats: ['pdf', 'excel'],
        compression: true,
        password: 'secure123',
      })
      .build();

    return {
      pattern: 'Builder',
      description: 'Builder assembled a comprehensive report with all optional components',
      complexity: {
        sections: report.sections.length,
        charts: report.charts?.length || 0,
        hasFilters: !!report.filters,
        hasFormatting: !!report.formatting,
        hasExportOptions: !!report.exportOptions,
      },
      report,
    };
  }
}
