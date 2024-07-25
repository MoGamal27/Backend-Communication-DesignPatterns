import { EventEmitter } from 'events';
import  sendEmail  from '../services/emailServices';

const eventEmitter = new EventEmitter();

eventEmitter.on('userRegistered', (data) => {
  console.log(`User registered with email: ${data.email}`);
  sendEmail(data);
});

export default eventEmitter;