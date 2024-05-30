import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  return {
    secret: 'nosfsdbfhj',
    accessTokenTtl: 3600,
    // secret: process.env.JWT_SECRET || "nosfsdbfhj",
    // accessTokenTtl: process.env.JWT_ACCESS_TOKEN_TTL || 3600,
  };
});
