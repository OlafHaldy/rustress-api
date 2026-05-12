import express from 'express';
import cors from 'cors';
import { markStresses } from '@roj/rustress';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/stress', async (req, res) => {
  const { text } = req.body;
  
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Текст не предоставлен или не является строкой' });
  }

  try {
    const result = await markStresses(text);
    res.json({ result });
  } catch (error) {
    console.error('Ошибка при обработке:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'API для расстановки ударений работает. Используйте POST /stress' });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
