import { Box } from '@mui/material';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import ExamModalContent from '../components/ExamModalContent';

const ModalContentWrapper = ({
  currentQuestionIndex,
  examData,
  handleAnswerClick,
  userAnswers,
  submitted,
  handleSubmit,
  score,
  slideDirection,
}) => (
  <Box sx={{ flex: 1, overflowY: 'hidden' }}>
    <SwitchTransition>
      <CSSTransition
        key={currentQuestionIndex}
        timeout={500}
        classNames={slideDirection}
      >
        <Box sx={{ height: '100%' }}>
          <ExamModalContent
            examData={examData}
            currentQuestionIndex={currentQuestionIndex}
            handleAnswerClick={handleAnswerClick}
            userAnswers={userAnswers}
            submitted={submitted}
            handleSubmit={handleSubmit}
            score={score}
          />
        </Box>
      </CSSTransition>
    </SwitchTransition>
  </Box>
);

export default ModalContentWrapper;
