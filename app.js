const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
