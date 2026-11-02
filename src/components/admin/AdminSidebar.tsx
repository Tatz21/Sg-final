'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  TrendingUp,
  Inbox,
  Globe2,
  ScrollText,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  userName?: string;
  userRole?: string;
}

export default function AdminSidebar({
  userName = 'Admin User',
  userRole = 'SUPER_ADMIN',
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') {
    return null;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const navItems = [
    { label: 'Command Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Properties Catalog', href: '/admin/properties', icon: Building2 },
    { label: 'REITs & Offerings', href: '/admin/investments', icon: TrendingUp },
    { label: 'Client Lead Inbox', href: '/admin/leads', icon: Inbox },
    { label: 'Sovereign Territories', href: '/admin/countries', icon: Globe2 },
    { label: 'Audit Security Log', href: '/admin/audit-logs', icon: ScrollText },
    { label: 'Platform Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-navy-950 text-stone-300 border-r border-white/10 flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="h-20 px-6 border-b border-white/10 flex items-center justify-between">
        <Link href="/admin" className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 flex items-center justify-center font-bold text-navy-950 text-xs font-serif shadow-luxury-gold">
            SG
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-[0.15em] text-xs uppercase font-serif">
              Advisory Desk
            </span>
            <span className="text-[9px] text-gold-400 uppercase tracking-widest font-semibold">
              CMS Command
            </span>
          </div>
        </Link>
        <Link
          href="/"
          target="_blank"
          title="Open Public Platform"
          className="p-1.5 rounded text-stone-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Nav Menu */}
      <nav className="flex-grow p-4 space-y-1.5 text-xs font-semibold">
        <div className="text-[10px] uppercase tracking-widest-xl text-stone-500 px-3 py-1 font-bold">
          Workspace Modules
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-sm transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-extrabold shadow-luxury-gold'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-white/10 bg-navy-900/60 space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-navy-950 border border-gold-400/40 text-gold-300 flex items-center justify-center font-bold text-xs uppercase shadow-sm">
            {userName[0]}
          </div>
          <div className="truncate">
            <div className="text-xs font-bold text-white truncate">{userName}</div>
            <div className="text-[10px] text-gold-400 font-mono tracking-wider">{userRole}</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-xs text-stone-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out of Desk</span>
        </button>
      </div>
    </aside>
  );
}
