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
  ChevronDown,
  User,
  Bell,
  Search,
  CreditCard,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

interface NavSection {
  name: string;
  items: NavItem[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

const navigationSections: NavSection[] = [
  {
    name: 'Overview',
    items: [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { name: 'Glossary', href: '/admin/glossary', icon: BookOpen },
    ],
  },
  {
    name: 'Management API',
    collapsible: true,
    defaultExpanded: true,
    items: [
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
    ],
  },
  {
    name: 'Client API',
    collapsible: true,
    defaultExpanded: true,
    items: [
      { name: 'Client Dashboard', href: '/admin/client-api', icon: User },
      { name: 'Subscriptions', href: '/admin/client-api/subscriptions', icon: Bell },
      { name: 'Search', href: '/admin/client-api/search', icon: Search },
      { name: 'Payments', href: '/admin/client-api/payments', icon: CreditCard },
      { name: 'Verification', href: '/admin/client-api/verification', icon: ShieldCheck },
    ],
  },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navigationSections.forEach((section) => {
      if (section.collapsible) {
        initial[section.name] = section.defaultExpanded ?? true;
      }
    });
    return initial;
  });

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
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
      <nav className="p-2 space-y-4 overflow-y-auto h-[calc(100vh-4rem)]">
        {navigationSections.map((section) => {
          const isExpanded = !section.collapsible || expandedSections[section.name];

          return (
            <div key={section.name}>
              {/* Section Header */}
              {!collapsed && section.collapsible ? (
                <button
                  onClick={() => toggleSection(section.name)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider hover:text-zinc-300 transition-colors"
                >
                  <span>{section.name}</span>
                  <ChevronDown
                    className={clsx(
                      'h-4 w-4 transition-transform',
                      isExpanded ? 'rotate-0' : '-rotate-90'
                    )}
                  />
                </button>
              ) : !collapsed ? (
                <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  {section.name}
                </div>
              ) : null}

              {/* Section Items */}
              {isExpanded && (
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={clsx(
                          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                          active
                            ? section.name === 'Client API'
                              ? 'bg-purple-600 text-white'
                              : 'bg-blue-600 text-white'
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
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Version */}
      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800">
          <p className="text-xs text-zinc-500">BASTA APIs</p>
          <p className="text-xs text-zinc-600">Management v1.0 | Client v1.0</p>
        </div>
      )}
    </aside>
  );
}
