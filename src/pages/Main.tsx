import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './output.css';
import Categories from './ServiceCategoryPage';


ReactDOM.render(
  <React.StrictMode>
    <main>
            <Categories />
        </main> 
  </React.StrictMode>,
  document.getElementById('root')
);


export default ReactDOM;



