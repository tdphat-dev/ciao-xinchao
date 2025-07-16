export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <header className="bg-white shadow-md p-4 sticky top-0 z-10">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </header>
        <main className="p-4">{children}</main>
      </div>
    );
  }