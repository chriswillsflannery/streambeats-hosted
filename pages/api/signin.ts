import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.headers;

  const user = await prisma.user.findUnique({
    where: {
      email: Array.isArray(email) ? email[0] : email,
    },
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    // create jwt, set jwt to cookie, send cookie
    const token = jwt.sign({
      id: user.id,
      email: user.email,
      time: Date.now(),
    }, 'hello', {
      expiresIn: '8h',
    });

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('TRAX_ACCESS_TOKEN', token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      }),
    );

    res.json(user);
  } else {
    res.status(401);
    res.json({ error: 'Email or password is wrong' });
  }
}