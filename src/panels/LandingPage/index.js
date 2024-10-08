'use client';

import { Box, Typography, Alert } from '@mui/material';
import {
  mainContentContainerStyle,
  headerTextStyle,
  headerSubTextStyle,
} from './styles';
import InputFields from './components/InputFields';
import MainButtons from './components/MainButtons';
import { useAppContext } from '../../app/contexts/AppContext';
import { useExamContext } from '../../app/contexts/ExamContext';
import handleCreateExam from './handlers/handleCreateExam';
import { generateSubTopics } from '../../app/helpers/helpersExamGeneration';

export default function LandingPage() {
  // Extract appState and currentExamState from the context
  const {
    appState,
    setBusy,
    setError,
    addExam,
    openTreeModal,
    setTree,
  } = useAppContext();
  const { examState, setExamData } = useExamContext();

  // Destructure the necessary properties from appState and currentExamState
  const { userTopic, userLevel, error } = appState;
  const { topic, level, numberOfQuestions, numberOfOptions } = examState?.examData || {};

  const handleCreateExamHandler = async () => {
    // const tree = await generateSubTopics({
    //   topic: userTopic,
    //   level: userLevel
    // });
    // setTree(tree)
    // openTreeModal();
    handleCreateExam({
      topic: userTopic,
      level: userLevel,
      numberOfQuestions: 10,
      numberOfOptions,
      setBusy,
      setError,
      addExam,
    });
  };

  const handleCreateMaterialHandler = async () => {
    // const tree = await generateSubTopics({
    //   topic: userTopic,
    //   level: userLevel
    // });
    // setTree(tree)
    // openTreeModal();
    handleCreateExam({
      topic: userTopic,
      level: userLevel,
      numberOfQuestions: 10,
      numberOfOptions,
      setBusy,
      setError,
      addExam,
    });
  };
  
  return (
    <>
      {/* Main content */}
      <Box sx={mainContentContainerStyle}>
        <Typography variant="h1" sx={headerTextStyle}>
          Mockify
        </Typography>
        <Typography variant="h2" sx={headerSubTextStyle}>
          Materials ● Exams ● Mock Exams ● Classroom Supervision
        </Typography>
        <InputFields />
        {error && (
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        )}
        <MainButtons onClick={handleCreateExamHandler} />
      </Box>
    </>
  );
}
