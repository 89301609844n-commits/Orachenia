# CitizenConnect - Система работы с обращениями граждан

Приложение для автоматического сбора писем из Gmail (через IMAP) и их категоризации с помощью ИИ Gemini.

## 🛠 Настройка

Для работы приложения необходимо создать файл `.env` в корневом каталоге и добавить туда следующие переменные:

```env
# Параметры почты (Gmail)
EMAIL_USER=vash_email@gmail.com
EMAIL_PASS=vash_app_password_16_simvolov
EMAIL_HOST=imap.gmail.com
EMAIL_PORT=993

# Параметры ИИ
GEMINI_API_KEY=vash_kluch_iz_google_ai_studio
```

> **Важно:** Для `EMAIL_PASS` используйте "Пароль приложения" (App Password) из настроек безопасности вашего Google-аккаунта. Обычный пароль от почты не подойдет.

## 🚀 Запуск в разработке

1. Установите зависимости:
   ```bash
   npm install
   ```
2. Запустите сервер разработки:
   ```bash
   npm run dev
   ```

## 📦 Сборка и деплой

Для запуска в контейнере или на сервере:
```bash
npm run build
npm start
```

## 🛠 Ошибки деплоя в Google Cloud
Если вы видите ошибку `Custom Org Policy CloudCheck (run.managed.requireInvokerIam)`, это означает, что в вашей организации Google Cloud запрещен публичный (unauthenticated) доступ к сервисам Cloud Run. 
Чтобы исправить это:
1. Зайдите в Google Cloud Console.
2. Перейдите в раздел **IAM & Admin > Organization Policies**.
3. Найдите политику **"Allowed invoker check for Cloud Run"** или **"Domain Restricted Sharing"**.
4. Проверьте настройки прав доступа `allUsers` для роли `Cloud Run Invoker`.

## ⚙️ Структура проекта
- `server.ts` — Express сервер, проксирующий запросы и отдающий статику.
- `src/emailService.ts` — логика работы с IMAP.
- `src/geminiService.ts` — интеграция с Google Gemini AI.
- `src/App.tsx` — фронтенд на React + Tailwind CSS.

## 🤖 Функции
- **Синхронизация IMAP:** Загрузка последних писем из папки "Входящие".
- **Gemini AI:** Автоматическое определение категории (ЖКХ, Транспорт, Здравоохранение и др.).
- **Интерфейс:** Удобный дашборд для управления статусами обращений.
