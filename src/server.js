import app from './app.js';
import sequelize from './database/db.js';
import { PORT, DB_URI } from './config/config.js';

// Define a function that will connect to the database and start the server
const startServer = async () => {
	try {
		// Check if DB_URI is defined
		if (!DB_URI) {
			throw new Error('DB_URI is not defined in the environment variables');
		}
		// Connect to the database
		await sequelize.sync();
		console.log('Connection has been established successfully.');

		// Start the server
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

// Call the function to start the server
startServer();