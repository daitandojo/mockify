"use client";

import { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, Alert } from '@mui/material';
import { generateButton, inputField, headerText, containerStyle } from './styles';
import ClientWrapper from '../components/ClientWrapper';

export default function Home() {
  const [title, setTitle] = useState("CISI Investment Risk and Tax Exam (Mock)");
  const [topic, setTopic] = useState("Investment Risk and UK Tax Exam");
  const [level, setLevel] = useState("University undergraduate");
  const [syllabus, setSyllabus] = useState("Syllabus CISI Investment Risk and Tax");
  const [numberOfQuestions, setNumberOfQuestions] = useState(4);
  const [numberOfAnswers, setNumberOfAnswers] = useState(4);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGeneratePDF = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch('/api/generateExam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          topic,
          level,
          syllabus,
          numberOfQuestions,
          numberOfAnswers,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate the exam.');
      }

      const blob = await response.blob();
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

  return (
    <ClientWrapper>
      <Container sx={containerStyle}>
        <Typography variant="h1" sx={headerText}>
          Mockify
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              sx={inputField}
            />
          </Grid>
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Syllabus"
              value={syllabus}
              onChange={(e) => setSyllabus(e.target.value)}
              variant="outlined"
              sx={inputField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <Box textAlign="center" sx={{ marginTop: '40px' }}>
              <Button
                variant="contained"
                onClick={handleGeneratePDF}
                disabled={loading}
                sx={generateButton}
              >
                {loading ? "Generating..." : "Produce Mock Exam"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ClientWrapper>
  );
}
