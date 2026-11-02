import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { getCurrentSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export const metadata = {
  title: 'Admin CMS Workspace | SG Properties',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();
  const headerList = headers();
  const pathname = headerList.get('x-pathname') || '';

  // Allow login page access without redirect
  return (
    <div className="min-h-screen flex bg-stone-100">
      <AdminSidebar
        userName={session?.name || 'Super Admin'}
        userRole={session?.role || 'SUPER_ADMIN'}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

