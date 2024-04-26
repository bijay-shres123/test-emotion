import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.text}>Sorry, the page you are looking for could not be found.</p>
      <Link to="/" style={styles.link}>
        <Button type="primary">Go Back to Home Page</Button>
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
  },
  heading: {
    fontSize: '36px',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  link: {
    textDecoration: 'none',
  },
};

export default NotFound;
