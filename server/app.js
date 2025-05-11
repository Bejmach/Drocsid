import express from 'express';

const app = express();
import userRoutes from './routes/userRoutes.js';

app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});