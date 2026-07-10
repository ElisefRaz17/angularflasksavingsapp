import { Service } from '@angular/core';

@Service()
export class CsvExportService {
    
  exportToCsv(filename: string, data: any[], headers: string[]): void {
    if (!data || !data.length) return;

    // Add UTF-8 Byte Order Mark (BOM) so Excel handles special characters correctly
    const csvContent = '\uFEFF' + this.convertToCsv(data, headers);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create hidden download link and click it
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private convertToCsv(data: any[], headers: string[]): string {
    const rows = data.map(row => 
      headers.map(header => {
        const value = row[header] === null || row[header] === undefined ? '' : row[header];
        // Escape quotes and commas per RFC 4180 rules
        const escaped = String(value).replace(/"/g, '""');
        return `"${escaped}"`;
      }).join(',')
    );
    return [headers.join(','), ...rows].join('\r\n');
  }
}
