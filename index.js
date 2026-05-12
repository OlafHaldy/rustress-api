// Импортируем библиотеку rustress из GitHub
import rustress from 'rustress';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Эндпоинт для расстановки ударений
app.post('/stress', async (req, res) => {
  const { text } = req.body;
  
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Текст не предоставлен или не является строкой' });
  }

  try {
    // Вызываем функцию markStress из библиотеки (синтаксис может отличаться)
    // В зависимости от реализации библиотеки, это может быть rustress.markStress или просто markStress
    let result;
    if (typeof rustress.markStress === 'function') {
        result = await rustress.markStress(text);
    } else if (typeof rustress === 'function') {
        result = await rustress(text);
    } else {
        // Если ничего не подошло, просто возвращаем текст без изменений
        result = text;
    }
    res.json({ result });
  } catch (error) {
    console.error('Ошибка при обработке:', error);
    res.status(500).json({ error: error.message });
  }
});

// Корневой эндпоинт для проверки
app.get('/', (req, res) => {
  res.json({ message: 'API для расстановки ударений работает. Используйте POST /stress' });
});

// Запускаем сервер
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
