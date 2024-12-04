import React, { useState } from 'react';
import Sidebar from './Admin/sidebar';
import ContentArea from './Admin/component';

const AdminPanel = () => {
  const [selectedOption, setSelectedOption] = useState('Dashboard');

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar onSelectOption={setSelectedOption} />
      <ContentArea selectedOption={selectedOption} />
    </div>
  );
};

export default AdminPanel;
