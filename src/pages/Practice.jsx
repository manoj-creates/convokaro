import Sidebar from '../components/Sidebar';

export default function Practice() {
  return (
    <div className="flex bg-bg min-h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-8">
        <h1 className="text-3xl font-serif mb-8">Practice Scenarios</h1>
        <div className="bg-white p-8 rounded-2xl text-center border border-border shadow-sm">
          <p className="text-muted">Chat Interface placeholder. Detailed implementation would go here.</p>
        </div>
      </div>
    </div>
  );
}
