import { AdminLayout } from '@/components/admin/layout/admin-layout';

export const metadata = {
  title: 'BASTA Admin - Management API Console',
  description: 'Admin panel for BASTA GraphQL Management API',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
