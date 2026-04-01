import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ChickensList from './components/ChickensList';
import AddChickenForm from './components/AddChickenForm';
import './App.css'; 

const API_URL = 'http://localhost:3000';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chickens, setChickens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChickens = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/chickens`);
      if (!res.ok) throw new Error('Failed to fetch chickens data');
      const data = await res.json();
      setChickens(data);
    } catch (err) {
      setError(err.message || 'API is down or unreachable');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'dashboard' || activeTab === 'list') {
      fetchChickens();
    }
  }, [activeTab]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      const res = await fetch(`${API_URL}/chickens/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setChickens(chickens.filter(c => c.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const pageHeaders = {
    dashboard: { title: 'Farm Overview', subtitle: 'Detailed statistics and insights on your poultry farm.' },
    list: { title: 'Poultry Inventory', subtitle: 'Manage active flocks, sort by health status, and track production.' },
    add: { title: 'Onboard Chicken', subtitle: 'Create a new record in the farm database.' }
  };

  return (
    <div className="app-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        <header className="page-header stagger-1">
          <div>
            <h1 className="page-title">{pageHeaders[activeTab].title}</h1>
            <p className="page-subtitle">{pageHeaders[activeTab].subtitle}</p>
          </div>
        </header>

        {error && (
          <div style={{ 
            background: 'var(--danger-bg)', 
            color: 'var(--danger)', 
            padding: '1rem', 
            borderRadius: 'var(--radius-md)', 
            marginBottom: '1.5rem',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }} className="animate-fade-in stagger-2">
            <AlertTriangle size={20} />
            <div>
              <strong>Connection Error</strong>
              <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>{error}</p>
            </div>
          </div>
        )}

        <div className="page-content stagger-2">
          {activeTab === 'dashboard' && (
            <Dashboard loading={loading} chickens={chickens} />
          )}

          {activeTab === 'list' && (
            <ChickensList loading={loading} chickens={chickens} onDelete={handleDelete} />
          )}

          {activeTab === 'add' && (
            <AddChickenForm API_URL={API_URL} onSuccess={() => setActiveTab('list')} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
