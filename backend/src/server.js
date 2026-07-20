require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const seedUsers = require('./config/seedData');
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
const {errorHandler} = require('./middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const app = express();

const allowedOrigins = [
	process.env.FRONTEND_URL,
	process.env.CORS_ORIGIN,
	'https://desk-flow-ommy0eywu-tshegofatsoselahle.vercel.app',
	'http://localhost:3000',
	'http://127.0.0.1:3000'
].filter(Boolean);

// Connect DB, then seed users, then start server
const start = async () => {
	await connectDB();
	await seedUsers();

	// Middleware
	app.use(helmet());
	app.use(express.json());
	app.use(cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin) || /^https:\/\/.*\.vercel\.app$/i.test(origin)) {
				callback(null, true);
			} else {
				callback(null, false);
			}
		},
		credentials: true
	}));
	app.use(morgan('dev'));

	// Routes
	app.use('/api/auth', authRoutes);
	app.use('/api/tickets', ticketRoutes);
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	// Root landing page
	app.get('/', (req, res) => {
		res.status(200).json({
			message: 'DeskFlow backend is running. Use /api/auth, /api/tickets, /api-docs, or /health.'
		});
	});

	// Health
	app.get('/health', (req, res) => res.status(200).json({status: 'ok'}));

	// Error handler
	app.use(errorHandler);

	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start().catch(err => {
	console.error('Failed to start server:', err);
	process.exit(1);
});

// (startup executed by start())
