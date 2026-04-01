import { Trash2, FileWarning } from 'lucide-react';

export default function ChickensList({ loading, chickens, onDelete }) {
  if (loading) {
    return (
      <div className="loader-container animate-fade-in">
        <div className="loader"></div>
      </div>
    );
  }

  if (chickens.length === 0) {
    return (
      <div className="empty-state animate-fade-in">
        <FileWarning />
        <h3>No records found</h3>
        <p>Your inventory is currently empty. Add a chicken to get started.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper animate-slide-up">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Breed</th>
            <th>Age (wks)</th>
            <th>Health Status</th>
            <th>Egg Prod.</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {chickens.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{c.breed}</td>
              <td>{c.age}</td>
              <td>
                <span className={`badge ${c.health_status.toLowerCase()}`}>
                  {c.health_status}
                </span>
              </td>
              <td>{c.egg_production_rate}</td>
              <td>
                <button 
                  className="btn-icon-only" 
                  onClick={() => onDelete(c.id)}
                  title="Delete Record"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
