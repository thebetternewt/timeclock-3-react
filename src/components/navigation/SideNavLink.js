import React from 'react';
import { Link } from '@reach/router';

export default ({ partial = true, ...props }) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        className: isCurrent ? 'active' : null,
      };
    }}
  />
);
