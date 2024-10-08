'use client';

import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import ExamEditor from '../../modals/ExamEditor';
import Examination from '../../modals/Examination';
import TreeModal from '../../modals/TreeModal';
import MessageModal from '../../modals/MessageModal';

import messageMission from '../../modals/MessageModal/messages/mission.js';
import messageHowItWorks from '../../modals/MessageModal/messages/howitworks.js';
import messageContactUs from '../../modals/MessageModal/messages/contactus.js';

export function ModalWrapper({ children }) {
  const { appState, showModal } = useAppContext();

  const { showingModal, activeExamIndex, exams, tree } = appState;

  const renderModalContent = () => {
    switch (showingModal) {
      case 'exameditor':
        return (
          <ExamEditor
            exam={exams[activeExamIndex]}
            onClose={() => showModal(null)}
          />
        );
      case 'treeview':
        return <TreeModal tree={tree} onClose={closeTreeModal} />;
      case 'examination':
        return <Examination />;
      default:
        if (showingModal && showingModal.startsWith('message')) {
          const messageType = showingModal.split(':')[1];
          const messageContent = getMessageContent(messageType);
          return (
            <MessageModal
              onClose={() => showModal(null)}
              content={messageContent}
            />
          );
        }
        return null;
    }
  };

  const getMessageContent = (messageType) => {
    switch (messageType) {
      case 'mission':
        return messageMission;
      case 'howitworks':
        return messageHowItWorks;
      case 'contactus':
        return messageContactUs;
      // Add other message types here as needed
      default:
        return null;
    }
  };

  return (
    <>
      {children}
      {renderModalContent()}
    </>
  );
}
