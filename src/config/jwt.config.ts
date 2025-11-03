import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'defaultSecret', // Definir valor por defecto si no existe
  expiresIn: process.env.JWT_EXPIRES_IN || '15m', // Default '15m'
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d', // Default '30d'
}));
