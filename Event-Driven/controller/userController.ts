import { Request, Response } from 'express';
import eventEmitter from '../events/userEvents';
import User from '../model/user';

interface UserData {
  email: string;
  name: string;
}

export async function registerUser(req: Request, res: Response): Promise<void> {
  const userData: UserData = req.body;

  try {
    // Save user data to database
    const user = new User(userData);
    await user.save();

    // Emit event
    eventEmitter.emit('userRegistered', userData);

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
}

