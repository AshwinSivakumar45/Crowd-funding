import React, { useState } from 'react';

const Sidebar = ({ onSelectOption }) => {
  const [activeItem, setActiveItem] = useState('Dashboard'); // Track the selected menu item

  const menuItems = [
    { name: 'Dashboard', icon: '🏠' },
    { name: 'Manage Users', icon: '👤' },
    { name: 'Approve Campaigns', icon: '✅' },
    { name: 'Handle Campaigns', icon: '⚙️' },
    { name: 'Verify Withdrawals', icon: '💸' },
    { name: 'Donation Handler', icon: '💰' },
  ];

  const handleClick = (name) => {
    setActiveItem(name);
    onSelectOption(name); 
  };

  return (
    <div className="w-80 bg-gray-800 text-white flex flex-col p-6 shadow-lg pt-8">
      <h2 className="text-3xl font-semibold text-center mb-6 tracking-wide">Admin Panel</h2>
      <nav className="flex flex-col space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleClick(item.name)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ease-in-out duration-150 text-lg font-medium ${
              activeItem === item.name ? 'bg-green-500' : 'hover:bg-green-500'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
