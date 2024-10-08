// index.js
import React, { useState } from 'react';
import {
  modalStyles,
  buttonStyles,
  treeItemStyles,
  headerStyles,
  checkboxStyles,
  expandButtonStyles,
  treeContainerStyles,
} from './styles';

const TreeModal = ({ tree, onSubmit }) => {
  // Initialize the tree with 'selected' and 'expanded' properties
  const initializeTree = (node, level = 0) => ({
    ...node,
    selected: true, // All nodes selected by default
    expanded: level < 2, // Expand main topic and first-level children
    subtopics: node.subtopics
      ? node.subtopics.map((sub) => initializeTree(sub, level + 1))
      : [],
  });

  const [treeState, setTreeState] = useState(initializeTree(tree));

  // Function to handle selection of nodes
  const handleSelect = (path, selected) => {
    const updateNode = (node, currentPath = []) => {
      if (
        path.length === currentPath.length &&
        path.every((v, i) => v === currentPath[i])
      ) {
        // Update the selected state of the current node and its descendants
        return {
          ...node,
          selected,
          subtopics: node.subtopics
            ? node.subtopics.map((sub) => updateSubtree(sub, selected))
            : [],
        };
      }

      // Recursively update the subtopics
      return {
        ...node,
        subtopics: node.subtopics
          ? node.subtopics.map((sub, index) =>
              updateNode(sub, currentPath.concat(index))
            )
          : [],
      };
    };

    const updateSubtree = (node, selected) => ({
      ...node,
      selected,
      subtopics: node.subtopics
        ? node.subtopics.map((sub) => updateSubtree(sub, selected))
        : [],
    });

    setTreeState(updateNode(treeState));
  };

  // Function to handle expand/collapse of nodes
  const handleExpandCollapse = (path) => {
    const updateNode = (node, currentPath = []) => {
      if (
        path.length === currentPath.length &&
        path.every((v, i) => v === currentPath[i])
      ) {
        return { ...node, expanded: !node.expanded };
      }

      return {
        ...node,
        subtopics: node.subtopics
          ? node.subtopics.map((sub, index) =>
              updateNode(sub, currentPath.concat(index))
            )
          : [],
      };
    };

    setTreeState(updateNode(treeState));
  };

  // Recursive function to render the tree
  const renderTree = (node, path = []) => {
    const nodeKey = path.join('-');

    return (
      <div key={nodeKey} style={{ ...treeItemStyles, paddingLeft: path.length * 20 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {node.subtopics && node.subtopics.length > 0 && (
            <button
              style={expandButtonStyles}
              onClick={() => handleExpandCollapse(path)}
            >
              {node.expanded ? '▼' : '►'}
            </button>
          )}
          <input
            type="checkbox"
            checked={!!node.selected}
            onChange={(e) => handleSelect(path, e.target.checked)}
            style={checkboxStyles}
          />
          <span>{node.subtopic || node.topic}</span>
        </div>
        {node.expanded && node.subtopics && (
          <div>
            {node.subtopics.map((sub, index) =>
              renderTree(sub, path.concat(index))
            )}
          </div>
        )}
      </div>
    );
  };

  const handleSubmit = () => {
    const getSelectedTree = (node) => {
      if (!node.selected) return null;

      return {
        subtopic: node.subtopic || node.topic,
        subtopics: node.subtopics
          ? node.subtopics.map(getSelectedTree).filter(Boolean)
          : [],
      };
    };

    const selectedTree = getSelectedTree(treeState);
    onSubmit(selectedTree);
  };

  return (
    <div style={modalStyles}>
      <div style={headerStyles}>
        <h2>Select Subtopics</h2>
      </div>
      <div style={treeContainerStyles}>
        <div style={{ display: 'inline-block', textAlign: 'left' }}>
          {renderTree(treeState)}
        </div>
      </div>
      <button style={buttonStyles} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default TreeModal;
