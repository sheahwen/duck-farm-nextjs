'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { signInWithGoogle } from '../actions/signIn';

interface Props {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const LoginDialog = ({ open, onOpenChange }: Props) => {
  const [hoverOverGoogle, setHoverOverGoogle] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Login / Signup</DialogTitle>
        <DialogHeader>
          <DialogDescription className="pb-4 font-medium text-gray-800">
            Please login to add your own ducks to the farm! <br /> If your
            account does not exist, a new account will be created.
          </DialogDescription>
        </DialogHeader>
        <Image
          src={
            hoverOverGoogle
              ? '/google-auth/google-auth-dark.svg'
              : '/google-auth/google-auth-neutral.svg'
          }
          alt="google-login"
          width={170}
          height={90}
          className="m-auto hover:cursor-pointer"
          onMouseEnter={() => setHoverOverGoogle(true)}
          onMouseLeave={() => setHoverOverGoogle(false)}
          onClick={async () => await signInWithGoogle()}
        />
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
