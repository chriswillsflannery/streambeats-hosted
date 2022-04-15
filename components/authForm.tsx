import { Box, Flex, Input, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useSWRConfig } from 'swr';
import { auth } from '../lib/mutations';
import NextImage from 'next/image';

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const user = await auth(mode, { email, password });
    console.log('user', user);
    setIsLoading(false);
    router.push('/');
  }

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <NextImage src="/spotify.svg" height={60} width={120} />
      </Flex>
      <Flex justifyContent="center" alignItems="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="text"
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              bg="green.500"
              sx={{ "&:hover": { bg: 'green.300' } }}
              isLoading={isLoading}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm;