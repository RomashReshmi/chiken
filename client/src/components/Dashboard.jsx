import { Activity, Egg, LayoutGrid } from 'lucide-react';

export default function Dashboard({ loading, chickens }) {
  if (loading) {
    return (
      <div className="loader-container animate-fade-in">
        <div className="loader"></div>
      </div>
    );
  }

  const total = chickens.length;
  const healthy = chickens.filter(c => c.health_status === 'Healthy').length;
  const totalEggs = chickens.reduce((sum, c) => sum + (c.egg_production_rate || 0), 0);

  return (
    <div className="dashboard-grid animate-fade-in">
      <div className="stats-grid">
        <div className="stat-card glass-panel stagger-1 animate-slide-up">
          <div className="stat-header">
            <h3 className="stat-title">Total Population</h3>
            <LayoutGrid className="stat-icon" size={20} />
          </div>
          <p className="stat-value">{total}</p>
        </div>

        <div className="stat-card glass-panel stagger-2 animate-slide-up">
          <div className="stat-header">
            <h3 className="stat-title">Healthy Check</h3>
            <Activity className="stat-icon" style={{ color: 'var(--success)', background: 'var(--success-bg)' }} size={20} />
          </div>
          <p className="stat-value">{healthy}</p>
        </div>

        <div className="stat-card glass-panel stagger-3 animate-slide-up">
          <div className="stat-header">
            <h3 className="stat-title">Weekly Egg Prod.</h3>
            <Egg className="stat-icon" style={{ color: 'var(--warning)', background: 'var(--warning-bg)' }} size={20} />
          </div>
          <p className="stat-value">{totalEggs}</p>
        </div>
      </div>
    </div>
  );
}
