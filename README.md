# Mock Exam App

This project is a [Next.js](https://nextjs.org) application that provides a platform for generating mock exams, PDFs, and intelligent answer suggestions using OpenAI's API.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [API Routes](#api-routes)
- [Installation](#installation)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Getting Started

To get started, first clone the repository:

```bash
git clone https://github.com/yourusername/mock-exam-app.git
cd mock-exam-app
```

Install the required dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app running in your browser.

## Features

- **Generate Mock Exams**: Create mock exam questions by specifying a topic, level, and number of questions.
- **Generate PDFs**: Download a PDF of the generated exam questions.
- **Answer Suggestions**: Generate intelligent options for answers using OpenAI's API.

## API Routes

### `/api/generateQuestions`

- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "topic": "string",
    "level": "string",
    "numberOfQuestions": "number"
  }
  ```
- **Description**: Generates a set of questions based on the topic and level.

### `/api/generateOptions`

- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "topic": "string",
    "question": "string",
    "level": "string",
    "numberOfOptions": "number"
  }
  ```
- **Description**: Generates multiple-choice answers for the provided question.

### `/api/convertExamToPDF`

- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "title": "string",
    "topic": "string",
    "instructions": "string",
    "level": "string",
    "numberOfQuestions": "number",
    "questions": ["array of questions"]
  }
  ```
- **Description**: Generates a PDF with the provided questions and instructions.

## Installation

Make sure Node.js 22.6.0 or above is installed. Install the required dependencies using npm:

```bash
npm install
```

## Scripts

- **`dev`**: Runs the development server at [http://localhost:3000](http://localhost:3000).
- **`build`**: Builds the application for production.
- **`start`**: Starts the production server.
- **`lint`**: Lints the codebase.
- **`lint:fix`**: Automatically fixes linting errors.

  **Note**: The `lint:fix` script is added in the `package.json` file at the project root.

## Environment Variables

You need to set up the following environment variables in a `.env` file:

```dotenv
OPENAI_API_KEY=your-openai-api-key
NEXT_PUBLIC_API_BASE_URL=your-api-url
```

Ensure that these variables are available for proper API operation.

## Technologies Used

- **Next.js**: React framework for building server-rendered applications.
- **React**: JavaScript library for building user interfaces.
- **OpenAI**: API used for generating intelligent responses.
- **pdf-lib**: For creating PDFs.
- **Emotion**: CSS-in-JS library for styling components.

## Deployment

To deploy on Vercel, run:

```bash
vercel
```

For other deployment methods, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Troubleshooting

- **Common Errors**:
  - **OpenAI API Key missing**: Make sure you have set the `OPENAI_API_KEY` in your environment variables.
  - **Node version mismatch**: Use Node 22.6.0, as specified in the `.nvmrc` file, for best compatibility.
