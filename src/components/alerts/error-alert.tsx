import React from 'react';

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"

interface ErrorAlertProps {
  msg: string
}

const ErrorAlert: React.FC<ErrorAlertProps> = (props) => {
  return (
    <Alert status="error" >
      <AlertIcon />
      <AlertDescription>{props.msg}</AlertDescription>
    </Alert>
  );
}

const MemoErrorAlert = React.memo(ErrorAlert);
export { MemoErrorAlert as ErrorAlert };
export default MemoErrorAlert;
