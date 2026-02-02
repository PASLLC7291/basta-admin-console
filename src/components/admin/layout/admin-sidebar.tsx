'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  Building2,
  Gavel,
  Package,
  TrendingUp,
  Users,
  ClipboardList,
  ShoppingCart,
  Image,
  Webhook,
  Settings,
  Radio,
  Database,
  LayoutDashboard,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

const navigationItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Glossary', href: '/admin/glossary', icon: BookOpen },
  { name: 'Accounts', href: '/admin/accounts', icon: Building2 },
  { name: 'Sales', href: '/admin/sales', icon: Gavel },
  { name: 'Items', href: '/admin/items', icon: Package },
  { name: 'Bids', href: '/admin/bids', icon: TrendingUp },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Registrations', href: '/admin/registrations', icon: ClipboardList },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Media', href: '/admin/media', icon: Image },
  { name: 'Webhooks', href: '/admin/webhooks', icon: Webhook },
  { name: 'Config', href: '/admin/config', icon: Settings },
  { name: 'Live', href: '/admin/live', icon: Radio },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={clsx(
        'fixed left-0 top-0 z-40 h-screen bg-zinc-900 border-r border-zinc-800 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-800">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <Database className="h-6 w-6 text-blue-500" />
            <span className="font-bold text-white text-lg">BASTA</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/admin" className="mx-auto">
            <Database className="h-6 w-6 text-blue-500" />
          </Link>
        )}
        <button
          onClick={onToggle}
          className={clsx(
            'p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors',
            collapsed && 'mx-auto'
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              )}
              title={collapsed ? item.name : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-sm font-medium">{item.name}</span>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-zinc-700 text-zinc-300">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Version */}
      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800">
          <p className="text-xs text-zinc-500">BASTA Management API</p>
          <p className="text-xs text-zinc-600">v1.0.0</p>
        </div>
      )}
    </aside>
  );
}
