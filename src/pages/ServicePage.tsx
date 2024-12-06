import React from 'react';

const ServicePage: React.FC = () => {
  return (
    <div >
      <h1 className='text-xxl text-center'>Available Services</h1>
      <div className="h-56 grid grid-cols-2 gap-4 content-between text-center ">
        <div>Pets hotel</div>
        <div>Pets sitter</div>
      </div>
    </div>
  );
};

export default ServicePage;
