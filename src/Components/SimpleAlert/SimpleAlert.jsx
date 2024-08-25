import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function SimpleAlert({ message, severity }) {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity={severity || "success"}>
      {message}
    </Alert>
  );
}
