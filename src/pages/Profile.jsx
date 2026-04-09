import Sidebar from '../components/Sidebar';

export default function Profile() {
  return (
    <div className="flex bg-bg min-h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-8">
        <h1 className="text-3xl font-serif mb-8">Profile Settings</h1>
        <div className="bg-white p-8 rounded-2xl text-center border border-border shadow-sm">
          <p className="text-muted">Profile and Billing settings placeholder.</p>
        </div>
      </div>
    </div>
  );
}
