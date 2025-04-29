import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthRequest extends Request {
  user?: {
    id: number;
  };
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Obtener el token del header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No se proporcionó token de autenticación' });
    }

    // Verificar formato del token
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      return res.status(401).json({ error: 'Token mal formateado' });
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ error: 'Token mal formateado' });
    }

    // Verificar token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    
    // Verificar si el usuario existe
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Agregar información del usuario a la request
    req.user = { id: user.id };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    console.error('Error en autenticación:', error);
    res.status(500).json({ error: 'Error en autenticación' });
  }
};

// Middleware para verificar si el usuario es administrador
export const adminMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    const user = await UserModel.findById(req.user.id);
    if (!user || user.level !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    next();
  } catch (error) {
    console.error('Error en verificación de administrador:', error);
    res.status(500).json({ error: 'Error en verificación de administrador' });
  }
}; 