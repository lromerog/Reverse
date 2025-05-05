import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel, User } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class AuthController {
  // Registro de usuario
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      // Validar datos
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }

      // Verificar si el email ya existe
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'El email ya está registrado' });
      }

      // Crear usuario
      const user = await UserModel.create({ name, email, password });

      // Generar token
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          points: user.points,
          level: user.level
        }
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  }

  // Login de usuario
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validar datos
      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
      }

      // Buscar usuario
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Verificar contraseña
      const isValidPassword = await UserModel.verifyPassword(user, password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Generar token
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });

      res.json({
        message: 'Login exitoso',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          points: user.points,
          level: user.level
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  }

  // Obtener perfil del usuario
  static async getProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          points: user.points,
          level: user.level
        }
      });
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      res.status(500).json({ error: 'Error al obtener perfil' });
    }
  }

  // Actualizar perfil
  static async updateProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const { name, email } = req.body;

      // Validar datos
      if (!name && !email) {
        return res.status(400).json({ error: 'No hay datos para actualizar' });
      }

      // Verificar si el email ya existe
      if (email) {
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser && existingUser.id !== userId) {
          return res.status(400).json({ error: 'El email ya está registrado' });
        }
      }

      // Actualizar usuario
      const updates: Partial<User> = {};
      if (name) updates.name = name;
      if (email) updates.email = email;

      // await UserModel.update(userId, updates);

      res.json({ message: 'Perfil actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      res.status(500).json({ error: 'Error al actualizar perfil' });
    }
  }

  // Cambiar contraseña
  static async changePassword(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const { currentPassword, newPassword } = req.body;

      // Validar datos
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Contraseña actual y nueva contraseña son requeridas' });
      }

      // Verificar contraseña actual
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const isValidPassword = await UserModel.verifyPassword(user, currentPassword);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Contraseña actual incorrecta' });
      }

      // Actualizar contraseña
      // await UserModel.update(userId, { password: newPassword });

      res.json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      res.status(500).json({ error: 'Error al cambiar contraseña' });
    }
  }
} 