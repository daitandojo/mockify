"use client";

import { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, Alert, CircularProgress } from '@mui/material';
import { generateButton, inputField, headerText, headerSubText, containerStyle } from './styles';
import ClientWrapper from '../components/ClientWrapper';
import ExamModal from '../components/ExamModal';

export default function Home() {
  const [topic, setTopic] = useState("Investment Risk and UK Tax Exam");
  const [level, setLevel] = useState("University undergraduate");
  const [numberOfQuestions, setNumberOfQuestions] = useState(4);
  const [numberOfAnswers, setNumberOfAnswers] = useState(4);
  const [loading, setLoading] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [error, setError] = useState("");
  const [questionsRemaining, setQuestionsRemaining] = useState(numberOfQuestions);
  const [allQuestions, setAllQuestions] = useState([]);
  const [examModalOpen, setExamModalOpen] = useState(false);
  const [examData, setExamData] = useState(null);

  const handleGeneratePDF = async () => {
    setLoading(true);
    setError("");
    setQuestionsRemaining(numberOfQuestions);
  
    try {
      const batchSize = 5;
      const totalBatches = Math.ceil(numberOfQuestions / batchSize);
      let accumulatedQuestions = [];
  
      for (let batchNumber = 0; batchNumber < totalBatches; batchNumber++) {
        const response = await fetch('/api/generateBatch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            topic,
            level,
            batchSize: Math.min(batchSize, numberOfQuestions - batchNumber * batchSize),
            numberOfAnswers,
            batchNumber,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Failed to generate batch ${batchNumber + 1}`);
        }
  
        const batchData = await response.json();
        accumulatedQuestions = [...accumulatedQuestions, ...batchData.questions];
        setQuestionsRemaining((prev) => Math.max(0, prev - batchSize));
      }
  
      setAllQuestions(accumulatedQuestions);
  
      const finalResponse = await fetch('/api/generatePDF', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `${topic} Mock Exam`,
          topic,
          instructions: "Answer all questions. Each question carries equal marks.",
          level,
          numberOfQuestions,
          questions: accumulatedQuestions,
        }),
      });
  
      if (!finalResponse.ok) {
        throw new Error('Failed to generate the PDF.');
      }
  
      const blob = await finalResponse.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'Mock_Exam.pdf';
      link.click();
  
    } catch (err) {
      setError("An error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTestMeNow = async () => {
    setTestLoading(true);
    setError("");
    try {
      const response = await fetch('/api/generateBatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          level,
          batchSize: 10,
          numberOfAnswers,
        }),
      });

      const data = await response.json();
      setExamData(data);
      setExamModalOpen(true);
    } catch (err) {
      setError("An error occurred: " + err.message);
    } finally {
      setTestLoading(false);
    }
  };
  
  return (
    <ClientWrapper>
      <Container sx={containerStyle}>
        <Typography variant="h1" sx={headerText}>
          Mockify
        </Typography>
        <Typography variant="h1" sx={headerSubText}>
          Mock Exams on Any Topic!
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              variant="outlined"
              sx={inputField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              variant="outlined"
              sx={inputField}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Number of Questions"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
              variant="outlined"
              sx={inputField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Number of Answers per Question"
              value={numberOfAnswers}
              onChange={(e) => setNumberOfAnswers(parseInt(e.target.value))}
              variant="outlined"
              sx={inputField}
            />
          </Grid> */}
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <Box textAlign="center" sx={{ marginTop: '40px' }}>
              <Button
                variant="contained"
                onClick={handleTestMeNow}
                disabled={testLoading}
                sx={generateButton}
                startIcon={testLoading ? <CircularProgress size={20} /> : null}
              >
                {testLoading ? "Generating Questions..." : "Test Me Now"}
              </Button>
              <Button
                variant="contained"
                onClick={handleGeneratePDF}
                disabled={loading}
                sx={generateButton}
                startIcon={loading ? <CircularProgress size={20} /> : null}
                style={{ marginLeft: '20px' }}
              >
                {loading
                  ? `Generating... Questions Remaining: ${questionsRemaining}`
                  : "Produce PDF Mock Exam"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <ExamModal
        open={examModalOpen}
        onClose={() => setExamModalOpen(false)}
        examData={examData}
      />
    </ClientWrapper>
  );
}
