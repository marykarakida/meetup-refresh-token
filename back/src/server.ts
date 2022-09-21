import dotenv from 'dotenv';
import app from './app';
dotenv.config();

const PORT: number = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server running on port', PORT);
});
