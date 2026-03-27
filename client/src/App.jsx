import { useState, useEffect } from 'react';

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

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>PoultryFarm</h2>
        <nav>
          <button 
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard Overview
          </button>
          <button 
            className={`nav-link ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            Chickens Inventory
          </button>
          <button 
            className={`nav-link ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            Add New Record
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>
            {activeTab === 'dashboard' && 'Farm Dashboard'}
            {activeTab === 'list' && 'Chickens Inventory'}
            {activeTab === 'add' && 'Add New Chicken'}
          </h1>
        </header>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            Warning: {error}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <Dashboard loading={loading} chickens={chickens} />
        )}

        {activeTab === 'list' && (
          <ChickensList loading={loading} chickens={chickens} onDelete={handleDelete} />
        )}

        {activeTab === 'add' && (
          <AddChickenForm onSuccess={() => setActiveTab('list')} />
        )}
      </main>
    </div>
  );
}

function Dashboard({ loading, chickens }) {
  if (loading) return <p>Loading stats...</p>;

  const total = chickens.length;
  const healthy = chickens.filter(c => c.health_status === 'Healthy').length;
  const totalEggs = chickens.reduce((sum, c) => sum + (c.egg_production_rate || 0), 0);

  return (
    <div className="dashboard-grid">
      <div className="stat-card">
        <h3 className="stat-title">Total Chickens</h3>
        <p className="stat-value">{total}</p>
      </div>
      <div className="stat-card">
        <h3 className="stat-title">Healthy Population</h3>
        <p className="stat-value" style={{ color: 'var(--success)' }}>{healthy}</p>
      </div>
      <div className="stat-card">
        <h3 className="stat-title">Weekly Egg Prod.</h3>
        <p className="stat-value" style={{ color: 'var(--accent-color)' }}>{totalEggs}</p>
      </div>
    </div>
  );
}

function ChickensList({ loading, chickens, onDelete }) {
  if (loading) return <p>Loading data...</p>;
  if (chickens.length === 0) return <p>No chickens found. The inventory is empty.</p>;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Breed</th>
            <th>Age (wks)</th>
            <th>Health Status</th>
            <th>Egg Prod. (wks)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {chickens.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.breed}</td>
              <td>{c.age}</td>
              <td>
                <span className={`status-tag ${c.health_status.toLowerCase()}`}>
                  {c.health_status}
                </span>
              </td>
              <td>{c.egg_production_rate}</td>
              <td>
                <button className="btn btn-danger" onClick={() => onDelete(c.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AddChickenForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    breed: '',
    age: '',
    health_status: 'Healthy',
    egg_production_rate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/chickens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age, 10),
          egg_production_rate: parseInt(formData.egg_production_rate, 10)
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.errors ? data.errors.map(e => e.msg).join(', ') : data.error);
      }
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Breed</label>
          <input 
            type="text" 
            className="form-control" 
            required
            value={formData.breed}
            onChange={(e) => setFormData({...formData, breed: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Age (weeks)</label>
          <input 
            type="number" 
            className="form-control" 
            required min="0"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Health Status</label>
          <select 
            className="form-control" 
            value={formData.health_status}
            onChange={(e) => setFormData({...formData, health_status: e.target.value})}
          >
            <option value="Healthy">Healthy</option>
            <option value="Sick">Sick</option>
            <option value="Injured">Injured</option>
          </select>
        </div>
        <div className="form-group">
          <label>Egg Production Rate (per week)</label>
          <input 
            type="number" 
            className="form-control" 
            required min="0"
            value={formData.egg_production_rate}
            onChange={(e) => setFormData({...formData, egg_production_rate: e.target.value})}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Chicken Record'}
        </button>
      </form>
    </div>
  );
}

export default App;
