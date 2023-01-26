import React from 'react';
import { Button } from '@material-ui/core';

const CustomButton = ({ label, onClick, color, className  }) => {
  return (
    <Button variant="contained" color={color} onClick={onClick} className={className}>
      {label}
    </Button>
  );
};

export default CustomButton;
