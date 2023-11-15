// Import getUserAnswer 
import { getUserAnswer, getValueFromLabel } from '../Components/graph';
import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
//import { Tree, TreeNode } from "../Classes/TreeClass";

describe('getUserAnswer', () => {

  it('returns serialized tree', () => {
    // Mock nodeArray and edgeArray
    const nodeArray = [
      {id: 1, value: 'Node 1'}, 
      {id: 2, value: 'Node 2'}, 
    ];
    
    const edgeArray = [
      {from: 1, to: 2},
    ];

    // Call function
    const result = getUserAnswer(nodeArray, edgeArray);

    // Assert result is serialized tree
    expect(result).toEqual({
      value: 'Node 1',
      children: [{
        value: 'Node 2'  
      }]
    });
  });
});

describe('GraphView', () => {

  // Mock data
  const nodeArray = [
    {id: 0, label: 'id: 0\nlabel: Node 1'}, 
    {id: 1, label: 'id: 1\nlabel: Node 2'}
  ];
  
  const edgeArray = [
    {from: 0, to: 1}  
  ];

  it('getValueFromLabel extracts value from label', () => {
    expect(getValueFromLabel('id: 0\nlabel: Node 1')).toBe('Node 1');
    console.log(getValueFromLabel('id: 0\nlabel: Node 1'))
  });

  it('getUserAnswer returns serialized tree', () => {
    const expected = JSON.stringify({
      value: 'Node 1',
      children: [
        {
          value: 'Node 2'
        }
      ]  
    });
    
    expect(getUserAnswer()).toBe(expected);
  });

  it('getUserAnswer handles missing nodes', () => {
    edgeArray[0].to = 2; // Node 2 missing

    const expected = JSON.stringify({
      value: 'Node 1' 
    });

    expect(getUserAnswer()).toBe(expected);
  });

});