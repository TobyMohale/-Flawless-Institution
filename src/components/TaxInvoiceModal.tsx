import React, { useState, useEffect } from 'react';
import { X, Printer, ShieldCheck, CheckCircle2, Download, Landmark, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../lib/api';

interface TaxInvoiceModalProps {
  referenceNumber: string;
  onClose: () => void;
}

export const TaxInvoiceModal: React.FC<TaxInvoiceModalProps> = ({ referenceNumber, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInvoice() {
      setLoading(true);
      setError(null);
      const res = await api.getInvoice(referenceNumber);
      if (res.success && res.data) {
        setInvoice(res.data);
      } else {
        setError(res.error || 'Failed to retrieve SARS VAT tax invoice.');
      }
      setLoading(false);
    }
    fetchInvoice();
  }, [referenceNumber]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#0e0e13] border border-[#d4af37]/40 rounded-2xl w-full max-w-3xl max-h-[94vh] overflow-y-auto shadow-2xl text-neutral-200 font-sans-body"
        id="tax-invoice-modal"
      >
        {/* Modal Action Header */}
        <div className="sticky top-0 z-20 bg-[#121218]/95 backdrop-blur-md border-b border-neutral-800 p-4 sm:p-6 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37] text-black font-cinzel font-bold flex items-center justify-center text-xs">
              FI
            </div>
            <div>
              <div className="text-[10px] text-[#d4af37] uppercase tracking-wider font-semibold">
                South African Revenue Service (SARS) Compliant
              </div>
              <h2 className="text-base sm:text-lg font-cinzel font-bold text-white leading-tight">
                Official VAT Tax Invoice
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {invoice && (
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-[#d4af37]/40 hover:bg-[#d4af37]/15 text-[#f3e1a9] text-xs font-medium flex items-center gap-1.5 transition-all"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button>
            )}

            <button
              onClick={onClose}
              id="close-invoice-modal-btn"
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-8 md:p-10">
          {loading && (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin mx-auto" />
              <p className="text-xs text-neutral-400 font-medium">Generating official tax invoice from registry...</p>
            </div>
          )}

          {error && (
            <div className="p-6 bg-red-950/40 border border-red-800/60 rounded-xl text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
              <div className="text-sm font-semibold text-white">Invoice Retrieval Notice</div>
              <p className="text-xs text-neutral-300">{error}</p>
              <p className="text-[11px] text-neutral-400">
                Official VAT Tax Invoices are generated once payment is confirmed via PayFast, Ozow, or Standard Bank reconciliation.
              </p>
            </div>
          )}

          {invoice && (
            <div className="bg-[#fcfbf9] text-[#1a1a1f] p-6 sm:p-10 rounded-xl border-2 border-[#d4af37]/30 shadow-lg text-xs leading-relaxed font-sans print:border-none print:shadow-none print:p-0">
              {/* Official Tax Invoice Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b-2 border-neutral-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel text-xl font-bold tracking-wider text-black">
                      FLAWLESS INSTITUTION
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-black text-[#f3e1a9] font-bold">
                      (Pty) Ltd
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-600 mt-1">
                    Registration No: {invoice.supplier.companyRegistration}
                  </div>
                  <div className="text-[11px] text-neutral-600">
                    VAT Registration No: <strong className="text-black font-semibold">{invoice.supplier.vatNumber}</strong>
                  </div>
                  <div className="text-[11px] text-neutral-600">
                    {invoice.supplier.address}
                  </div>
                  <div className="text-[11px] text-neutral-600">
                    Email: {invoice.supplier.contactEmail} • Tel: {invoice.supplier.contactPhone}
                  </div>
                </div>

                <div className="sm:text-right">
                  <div className="font-cinzel text-2xl font-bold tracking-widest text-neutral-900 uppercase">
                    TAX INVOICE
                  </div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
                    (Section 20 VAT Act No 89 of 1991)
                  </div>
                  <div className="mt-2 text-xs">
                    <span className="text-neutral-500">Invoice No: </span>
                    <strong className="font-mono text-sm text-black">{invoice.invoiceNumber}</strong>
                  </div>
                  <div className="text-xs">
                    <span className="text-neutral-500">Issue Date: </span>
                    <strong className="text-black">{new Date(invoice.issueDate).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                  </div>
                  <div className="text-xs">
                    <span className="text-neutral-500">Reference: </span>
                    <strong className="font-mono text-black">{invoice.referenceNumber}</strong>
                  </div>
                </div>
              </div>

              {/* Recipient Details */}
              <div className="py-4 border-b border-neutral-300 flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-bold">
                    Billed To (Student / Client):
                  </span>
                  <div className="font-semibold text-sm text-neutral-900 mt-0.5">
                    {invoice.recipient.name}
                  </div>
                  <div className="text-[11px] text-neutral-600">
                    Email: {invoice.recipient.email}
                  </div>
                  <div className="text-[11px] text-neutral-600">
                    Phone: {invoice.recipient.phone}
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-bold">
                    Payment Gateway & Status:
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>PAID IN FULL • CLEARED</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-1">
                    Gateway Method: {invoice.paymentMethod?.toUpperCase() || 'STANDARD BANK EFT'}
                  </div>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="py-6 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-neutral-800 text-[10px] uppercase tracking-wider text-neutral-600">
                      <th className="py-2 pr-4 font-bold">Item Description</th>
                      <th className="py-2 px-3 text-right font-bold">Excl. VAT (ZAR)</th>
                      <th className="py-2 px-3 text-right font-bold">VAT @ 15%</th>
                      <th className="py-2 pl-3 text-right font-bold">Total (ZAR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {invoice.items.map((item: any, idx: number) => (
                      <tr key={idx} className="text-xs">
                        <td className="py-3 pr-4">
                          <div className="font-semibold text-neutral-900">{item.description}</div>
                          <div className="text-[10px] text-neutral-500">Accredited Flawless Academy Program</div>
                        </td>
                        <td className="py-3 px-3 text-right font-mono">
                          R {item.amountExclVAT.toFixed(2)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono">
                          R {item.vatAmount.toFixed(2)}
                        </td>
                        <td className="py-3 pl-3 text-right font-mono font-bold text-neutral-900">
                          R {item.amountInclVAT.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tax Summary Totals */}
              <div className="pt-4 border-t-2 border-neutral-800 flex flex-col sm:flex-row justify-between items-start gap-6">
                <div className="space-y-2 max-w-sm">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold">
                    Official Banking Details:
                  </div>
                  <div className="bg-neutral-100 p-2.5 rounded border border-neutral-200 text-[11px] space-y-0.5">
                    <div><strong>Bank:</strong> {invoice.bankDetails.bank}</div>
                    <div><strong>Account Name:</strong> {invoice.bankDetails.accountName}</div>
                    <div><strong>Account Number:</strong> {invoice.bankDetails.accountNumber}</div>
                    <div><strong>Branch Code:</strong> {invoice.bankDetails.branchCode}</div>
                  </div>
                  <div className="text-[10px] text-neutral-500 italic">
                    This document is a computer-generated tax invoice pursuant to the Value Added Tax Act, 1991.
                  </div>
                </div>

                <div className="w-full sm:w-64 space-y-1.5 text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>Total Excl. VAT:</span>
                    <span className="font-mono">R {invoice.totals.subtotalExclVAT.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>VAT @ 15%:</span>
                    <span className="font-mono">R {invoice.totals.vatTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-black pt-2 border-t-2 border-neutral-800">
                    <span>Total Paid (ZAR):</span>
                    <span className="font-mono text-[#8a6e27]">R {invoice.totals.totalInclVAT.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
