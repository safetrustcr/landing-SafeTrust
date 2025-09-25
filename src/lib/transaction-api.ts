export interface Transaction {
  id: string;
  hash: string;
  status: 'pending' | 'completed' | 'failed';
  amount: number;
  timestamp: Date;
  fromAddress: string;
  toAddress: string;
}

export interface TransactionFilters {
  status?: 'pending' | 'completed' | 'failed';
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface TransactionStats {
  total: number;
  pending: number;
  completed: number;
  failed: number;
  totalAmount: number;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    hash: '0x1234567890abcdef1234567890abcdef12345678',
    status: 'completed',
    amount: 0.5,
    timestamp: new Date('2024-01-15T10:30:00Z'),
    fromAddress: '0xabcd1234567890abcdef1234567890abcdef1234',
    toAddress: '0xefgh5678901234567890abcdef1234567890abcd'
  },
  {
    id: '2',
    hash: '0x2345678901bcdef2345678901bcdef2345678901',
    status: 'pending',
    amount: 1.2,
    timestamp: new Date('2024-01-15T11:45:00Z'),
    fromAddress: '0xijkl5678901234567890abcdef1234567890efgh',
    toAddress: '0xmnop9012345678901234567890abcdef12345678'
  },
  {
    id: '3',
    hash: '0x3456789012cdef3456789012cdef3456789012',
    status: 'failed',
    amount: 0.8,
    timestamp: new Date('2024-01-15T12:15:00Z'),
    fromAddress: '0xqrst1234567890abcdef1234567890abcdef5678',
    toAddress: '0xuvwx5678901234567890abcdef1234567890abcd'
  },
  {
    id: '4',
    hash: '0x4567890123def4567890123def4567890123',
    status: 'completed',
    amount: 2.1,
    timestamp: new Date('2024-01-15T13:20:00Z'),
    fromAddress: '0xyza1234567890abcdef1234567890abcdef9012',
    toAddress: '0xbcd5678901234567890abcdef1234567890efgh'
  },
  {
    id: '5',
    hash: '0x5678901234ef5678901234ef5678901234',
    status: 'pending',
    amount: 0.3,
    timestamp: new Date('2024-01-15T14:30:00Z'),
    fromAddress: '0xcde1234567890abcdef1234567890abcdef3456',
    toAddress: '0xfgh5678901234567890abcdef1234567890ijkl'
  }
];

export const transactionApi = {
  async getTransactions(filters: TransactionFilters = {}): Promise<Transaction[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filtered = [...mockTransactions];
    
    if (filters.status) {
      filtered = filtered.filter(tx => tx.status === filters.status);
    }
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(tx => 
        tx.hash.toLowerCase().includes(search) ||
        tx.fromAddress.toLowerCase().includes(search) ||
        tx.toAddress.toLowerCase().includes(search)
      );
    }
    
    if (filters.dateFrom) {
      filtered = filtered.filter(tx => tx.timestamp >= filters.dateFrom!);
    }
    
    if (filters.dateTo) {
      filtered = filtered.filter(tx => tx.timestamp <= filters.dateTo!);
    }
    
    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  },

  async getTransactionStats(): Promise<TransactionStats> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const total = mockTransactions.length;
    const pending = mockTransactions.filter(tx => tx.status === 'pending').length;
    const completed = mockTransactions.filter(tx => tx.status === 'completed').length;
    const failed = mockTransactions.filter(tx => tx.status === 'failed').length;
    const totalAmount = mockTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    
    return { total, pending, completed, failed, totalAmount };
  },

  async exportToCSV(transactions: Transaction[]): Promise<string> {
    const headers = ['ID', 'Hash', 'Status', 'Amount', 'Timestamp', 'From Address', 'To Address'];
    const rows = transactions.map(tx => [
      tx.id,
      tx.hash,
      tx.status,
      tx.amount.toString(),
      tx.timestamp.toISOString(),
      tx.fromAddress,
      tx.toAddress
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    return csvContent;
  },

  async exportToPDF(transactions: Transaction[]): Promise<Blob> {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>SafeTrust Transaction Report</title>
          <style>
            @page {
              margin: 0.5in;
              size: A4;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
            body { 
              font-family: Arial, sans-serif; 
              margin: 0;
              padding: 20px;
              background: white;
              color: black;
              line-height: 1.4;
            }
            .header { 
              text-align: center; 
              margin-bottom: 30px;
              border-bottom: 2px solid #1e40af;
              padding-bottom: 10px;
            }
            .title { 
              color: #1e40af; 
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .subtitle {
              color: #666;
              font-size: 14px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              font-size: 11px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #1e40af;
              color: white;
              font-weight: bold;
            }
            tr:nth-child(even) {
              background-color: #f8fafc;
            }
            .status-completed { color: #059669; font-weight: bold; }
            .status-pending { color: #d97706; font-weight: bold; }
            .status-failed { color: #dc2626; font-weight: bold; }
            .hash, .address { 
              font-family: 'Courier New', monospace; 
              font-size: 9px;
              word-break: break-all;
            }
            .amount { font-weight: bold; color: #1e40af; }
            .footer {
              margin-top: 30px;
              text-align: center;
              color: #666;
              font-size: 12px;
              border-top: 1px solid #ddd;
              padding-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">SafeTrust Transaction Report</div>
            <div class="subtitle">Generated on ${new Date().toLocaleString()}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Hash</th>
                <th>Status</th>
                <th>Amount (ETH)</th>
                <th>Timestamp</th>
                <th>From Address</th>
                <th>To Address</th>
              </tr>
            </thead>
            <tbody>
              ${transactions.map(tx => `
                <tr>
                  <td class="hash">${tx.hash}</td>
                  <td class="status-${tx.status}">${tx.status.toUpperCase()}</td>
                  <td class="amount">${tx.amount.toFixed(4)}</td>
                  <td>${tx.timestamp.toLocaleString()}</td>
                  <td class="address">${tx.fromAddress}</td>
                  <td class="address">${tx.toAddress}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="footer">
            <p>Total Transactions: ${transactions.length}</p>
            <p>Report generated by SafeTrust Dashboard</p>
          </div>
        </body>
      </html>
    `;
    
    return new Blob([htmlContent], { type: 'text/html' });
  }
};
