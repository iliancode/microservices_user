const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
