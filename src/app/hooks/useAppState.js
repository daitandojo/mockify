import { useState } from 'react';
import { initialAppState } from '../defaults';

export default function useAppState() {
  const [appState, setAppState] = useState(initialAppState);

  const updateAppState = (key, value) => {
    setAppState((prevState) => ({ ...prevState, [key]: value }));
  };

  function showModal(which) {
    updateAppState('showingModal', which);
  }

  function setTree(tree) {
    updateAppState('tree', tree);
  }

  function setBusy(withWhat) {
    updateAppState('busy', withWhat);
  }

  function setProgressGeneration(newValue) {
    updateAppState('progressGeneration', newValue);
  }

  function setUserTopic(newValue) {
    updateAppState('userTopic', newValue);
  }

  function setUserLevel(newValue) {
    updateAppState('userLevel', newValue);
  }

  function setError(error) {
    updateAppState('error', error);
  }

  function clearError() {
    updateAppState('error', null);
  }

  function setSlideDirection(direction) {
    updateAppState('slideDirection', direction);
  }

  function setActiveExamIndex(index) {
    if (index >= 0 && index < appState.exams.length) {
      updateAppState('activeExamIndex', index);
    }
  }

  function addExam(newExam) {
    setAppState((prevState) => ({
      ...prevState,
      exams: [...prevState.exams, newExam],
    }));
    setActiveExamIndex((prevState) => prevState.exams.length - 1);
  }

  function removeExam(index) {
    setAppState((prevState) => ({
      ...prevState,
      exams: prevState.exams.filter((_, i) => i !== index),
    }));
    showModal(null);
  }

  return {
    appState,
    updateAppState,
    showModal,
    setTree,
    setUserTopic,
    setUserLevel,
    setBusy,
    setProgressGeneration,
    setError,
    clearError,
    setSlideDirection,
    setActiveExamIndex,
    addExam,
    removeExam,
  };
}
