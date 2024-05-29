// app.ts

import express from 'express';
import userRoutes from '../routes/userRoutes';
import { authMiddleware } from '../middleware/authMiddleware';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import staticRoutes from '../routes/staticRoutes';
import swaggerSpec from '../docs/swagger';

const app = express();


// Serve Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Use the static routes
app.use('/', staticRoutes);


app.use('/api', userRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
