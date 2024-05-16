import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ breadcrumb }) => (
  <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
      {breadcrumb.map((breadcrumbItem, index) => (
        <li key={index} className="breadcrumb-item">
          <Link to={breadcrumbItem.link}>{breadcrumbItem.name}</Link>
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumb;
