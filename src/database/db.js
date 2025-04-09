import Sequelize from 'sequelize';

import { DB_URI } from '../config/config.js';

// Create a new instance of Sequelize
// The first argument is the URI of the database. This create the connection to the database using the URI
const sequelize = new Sequelize(DB_URI)

export default sequelize;