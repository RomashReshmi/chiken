import { useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';

export default function AddChickenForm({ API_URL, onSuccess }) {
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
        throw new Error(data.errors ? data.errors.map(e => e.msg).join(', ') : (data.error || 'Failed to save'));
      }
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper glass-panel animate-slide-up">
      {error && (
        <div style={{ 
          background: 'var(--danger-bg)', 
          color: 'var(--danger)', 
          padding: '1rem', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem'
        }}>
          <AlertCircle size={18} />
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Breed</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="e.g. Rhode Island Red"
            required
            value={formData.breed}
            onChange={(e) => setFormData({...formData, breed: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Age (in weeks)</label>
          <input 
            type="number" 
            className="form-input" 
            placeholder="e.g. 24"
            required min="0"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Health Status</label>
          <div style={{ position: 'relative' }}>
            <select 
              className="form-select" 
              value={formData.health_status}
              onChange={(e) => setFormData({...formData, health_status: e.target.value})}
            >
              <option value="Healthy">Healthy</option>
              <option value="Sick">Sick</option>
              <option value="Injured">Injured</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Egg Production Rate (per week)</label>
          <input 
            type="number" 
            className="form-input" 
            placeholder="e.g. 5"
            required min="0"
            value={formData.egg_production_rate}
            onChange={(e) => setFormData({...formData, egg_production_rate: e.target.value})}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <Save size={18} />
            {loading ? 'Saving Record...' : 'Save Chicken Record'}
          </button>
        </div>
      </form>
    </div>
  );
}
