import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { API_BASE_URL } from './app/utils/contants';
import axios from 'axios';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account }) {
      console.log('callback signIn user', user);
      console.log('callback signIn account', account);
      try {
        // const response = await axios.post(`${API_BASE_URL}/users`, user);
        // console.log('response', response);
      } catch (error) {
        console.error(error);
        // signOut();
        return false;
      }
      return true;
    },
  },
});
