import React, { ChangeEvent, useState } from 'react';
import { FormHelperText, Box, FormControl, Text, Input } from '@chakra-ui/core';
import { Button } from '@chakra-ui/core/dist';
import useTheme from '../useTheme';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { connectAction, hostAction } from '../store/actions/connect.actions';

export default function Login() {
  const { border, primary } = useTheme();
  const dispatch = useDispatch();
  const [secret, setSecret] = useState(`secret${Math.random() * 100}`);
  const [password, setPassword] = useState('');

  const isElectron = useSelector<RootState, boolean>(state => {
    return state.isElectron;
  });

  const connect = () => {
    dispatch(connectAction(secret, password));
  };

  const host = () => {
    dispatch(hostAction(secret, password));
  };

  return (
    <Box
      d="inline-flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      flex="1"
    >
      <Box
        as="form"
        maxW="lg"
        borderColor={border}
        borderWidth="1px"
        padding={10}
      >
        <Text fontSize="xl">
          Connection Secret - running in {isElectron ? 'Electron' : 'Browser'}
        </Text>
        <FormControl>
          <FormHelperText id="connection-secret-helper-text">
            Secret:
          </FormHelperText>
          <Input
            type="text"
            id="connection-secret"
            aria-describedby="connection-secret-helper-text"
            value={secret}
            onChange={(e: ChangeEvent) =>
              setSecret((e.target as HTMLInputElement).value)
            }
          />
        </FormControl>
        <FormControl>
          <FormHelperText id="connection-secret-helper-text">
            Password:
          </FormHelperText>
          <Input
            type="password"
            id="connection-password"
            aria-describedby="connection-secret-helper-text"
            value={password}
            onChange={(e: ChangeEvent) =>
              setPassword((e.target as HTMLInputElement).value)
            }
          />
        </FormControl>
        <FormControl marginTop={5} d="flex" justifyContent="flex-end">
          {isElectron && (
            <Button
              marginLeft={1}
              variant="outline"
              variantColor={primary}
              onClick={host}
            >
              Host
            </Button>
          )}
          <Button
            marginLeft={1}
            variant="solid"
            variantColor={primary}
            onClick={connect}
          >
            Connect
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
}
