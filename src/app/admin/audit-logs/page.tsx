'use client';

import React, { useState, useEffect } from 'react';
import { ScrollText, ShieldCheck, Clock, User } from 'lucide-react';

interface AuditLogItem {
  id: string;
  actor: string;
  action: string;
  entityType: string;
  entityId: string;
  details?: string;
  timestamp: string;
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/audit-logs')
      .then((res) => res.json())
      .then((json) => {
        if (json.data) setLogs(json.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-2xl font-bold font-serif text-navy-950">
          Security & Mutation Audit Trail
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Immutable operational log recording property updates, investment claim verifications, and lead activities.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-navy-950 uppercase tracking-wider text-[10px] border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-stone-50">
                  <td className="py-3 px-4 text-stone-500 text-[11px] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-bold text-navy-950">
                    <span className="px-2 py-0.5 bg-stone-100 rounded text-stone-700">
                      {log.actor}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-gold-700">{log.action}</span>
                  </td>
                  <td className="py-3 px-4 font-medium text-navy-950">
                    {log.entityType} ({log.entityId})
                  </td>
                  <td className="py-3 px-4 text-stone-600">
                    {log.details || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

