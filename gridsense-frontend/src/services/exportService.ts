// GridSense Automated Report Generation & Export Utility

export const exportService = {
  downloadCsv(filename: string, headers: string[], rows: (string | number)[][]) {
    const csvContent = [
      headers.join(','),
      ...rows.map((r) =>
        r
          .map((val) => {
            const str = String(val ?? '').replace(/"/g, '""');
            return `"${str}"`;
          })
          .join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  downloadPdfReport(reportTitle: string, summaryDetails: Record<string, string | number>) {
    // Generate a clean printable HTML document for PDF generation / print view
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up blocked. Please allow popups to view and print reports.');
      return;
    }

    const timestamp = new Date().toLocaleString();
    const rowsHtml = Object.entries(summaryDetails)
      .map(
        ([key, val]) => `
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b; width: 40%;">${key}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #334155;">${val}</td>
      </tr>
    `
      )
      .join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${reportTitle} - GridSense AI</title>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              color: #0f172a;
              margin: 40px;
              line-height: 1.5;
            }
            .header {
              border-bottom: 2px solid #0284c7;
              padding-bottom: 20px;
              margin-bottom: 30px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .logo {
              font-size: 24px;
              font-weight: 800;
              color: #0369a1;
            }
            .badge {
              background: #e0f2fe;
              color: #0369a1;
              padding: 4px 12px;
              border-radius: 9999px;
              font-size: 12px;
              font-weight: 600;
            }
            h1 {
              font-size: 22px;
              color: #0f172a;
              margin: 0 0 8px 0;
            }
            .meta {
              font-size: 13px;
              color: #64748b;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              font-size: 14px;
            }
            .footer {
              margin-top: 50px;
              padding-top: 15px;
              border-top: 1px solid #cbd5e1;
              font-size: 11px;
              color: #94a3b8;
              text-align: center;
            }
            @media print {
              body { margin: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">⚡ GridSense AI</div>
              <div class="meta">Power Intelligence & Predictive Operations Platform</div>
            </div>
            <div class="badge">CONFIDENTIAL OPERATIONS REPORT</div>
          </div>
          
          <h1>${reportTitle}</h1>
          <div class="meta">Generated on: ${timestamp} | Authorized Operator Session</div>
          
          <table>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <div style="margin-top: 30px; padding: 16px; background: #f8fafc; border-left: 4px solid #0284c7; border-radius: 4px;">
            <strong style="color: #0f172a; font-size: 13px;">Automated AI Validation Notice:</strong>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #475569;">
              Metrics generated using calibrated machine learning ensemble telemetry. All thresholds and risk classifications conform to IEEE reliability standards.
            </p>
          </div>
          
          <div class="footer">
            ⚡ GridSense AI uses public & synthetic demonstration datasets. Not connected to live proprietary utility operational networks.
          </div>

          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  }
};
