import { getDatabase, ref, push } from 'firebase/database';
import app from '../firebase/firebase.config'; // Import the initialized app from your firebase.js

const database = getDatabase(app);

export { database, ref, push };
