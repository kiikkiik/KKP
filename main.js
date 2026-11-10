document.addEventListener('DOMContentLoaded', () => {
    
    const analyzeBtn = document.querySelector('.btn-primary');
    const textInput = document.querySelector('.text-input');
    const errorMsg = document.querySelector('.error-message');
    const resultsSection = document.getElementById('results-section');

    // Тестовые данные (как будто их прислал сервер)
    const mockData = {
        level: 'B1',
        levelName: 'Intermediate',
        levelDescription: 'The text demonstrates intermediate lexical structures.',
        complexity: { a1a2: 78, b1b2: 16, c1c2: 6 },
        complexWords: ['sustainable', 'controversial', 'implementation', 'predominantly']
    };

    // Функция отрисовки результатов
    function renderResults(data) {
        // 1. Показываем блок результатов
        resultsSection.style.display = 'block';

        // 2. Заполняем уровень
        document.getElementById('level-badge').textContent = data.level;
        document.getElementById('level-name').textContent = data.levelName;
        document.getElementById('level-description').textContent = data.levelDescription;

        // 3. Заполняем прогресс-бары
        document.getElementById('bar-a1a2').style.width = data.complexity.a1a2 + '%';
        document.getElementById('percent-a1a2').textContent = data.complexity.a1a2 + '%';

        document.getElementById('bar-b1b2').style.width = data.complexity.b1b2 + '%';
        document.getElementById('percent-b1b2').textContent = data.complexity.b1b2 + '%';

        document.getElementById('bar-c1c2').style.width = data.complexity.c1c2 + '%';
        document.getElementById('percent-c1c2').textContent = data.complexity.c1c2 + '%';

        // 4. Создаём теги сложных слов
        const tagsContainer = document.getElementById('complex-words');
        tagsContainer.innerHTML = ''; // Очищаем старые теги
        data.complexWords.forEach(word => {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = word;
            tagsContainer.appendChild(tag);
        });
    }

    // Обработчик клика по кнопке
    analyzeBtn.addEventListener('click', () => {
        const text = textInput.value.trim();

        // Сбрасываем ошибку
        errorMsg.textContent = '';
        errorMsg.style.display = 'none';

        // Проверка: пустое ли поле
        if (text.length === 0) {
            errorMsg.textContent = 'Пожалуйста, введите текст для анализа.';
            errorMsg.style.display = 'block';
            return;
        }

        // Проверка: хватает ли слов
        const wordCount = text.split(/\s+/).length;
        if (wordCount < 50) {
            errorMsg.textContent = `Текст слишком короткий. Введите минимум 50 слов (сейчас: ${wordCount}).`;
            errorMsg.style.display = 'block';
            return;
        }

        // Если всё ок — рисуем результаты
        renderResults(mockData);
    });
});
