import { LayoutDashboard, List, PlusCircle, Sprout } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'list', label: 'Inventory', icon: List },
    { id: 'add', label: 'Add Record', icon: PlusCircle },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <Sprout className="brand-icon" size={28} />
        <span>PoultryTech</span>
      </div>
      
      <nav className="nav-menu">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
