/*A large portion of the code seen in the GraphView function was inspired by code
found here: https://visjs.github.io/vis-network/docs/network/ and
here: https://www.npmjs.com/package/react-vis-graph-wrapper */

import React, { useState } from "react";
import VisGraph, {
    GraphData,
    GraphEvents,
    Options,
  } from 'react-vis-graph-wrapper';
import "../Styles/graph.css";
import 'reactjs-popup/dist/index.css';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

//Used to export the user's answer
import { Tree, TreeNode } from "../Classes/TreeClass";
import WrittenAnswer from "./writtenAnswer";

var identity = -1;

var nodeArray = [];
var edgeArray = [];

let tree

function clearGraph(){
    identity = -1;
    nodeArray = [];
    edgeArray = [];
}

function findNodeByID(nodes, idToFind){
    for(var i = 0; i < nodes.length; i++)
        if(nodes[i].id === idToFind)
            return i

    return -1
}

function getUserAnswer() {
    if(nodeArray.length === 0)
        return  ''
    
    let nodes = []

    for(let i = 0; i < nodeArray.length; i++){
        const node = {
            value: getValueFromLabel(nodeArray[i].label),
            pid: undefined,
            id: nodeArray[i].id
        }
        nodes.push(node)
    }

    for(let i = 0; i < edgeArray.length; i++){
        const fromIndex = edgeArray[i].from
        const toIndex = edgeArray[i].to
        nodes[findNodeByID(nodes, toIndex)].pid = nodes[findNodeByID(nodes, fromIndex)].id
    }

    tree = new Tree(nodes[0].value)
    tree.root.ID = nodes[0].id
    for(var i = 1; i < nodes.length; i++){
        const newNode = new TreeNode(nodes[i].value)
        newNode.ID = nodes[i].id
        tree.insertByID(nodes[i].pid, newNode)
    }

    return tree.root.serializeTree()
}

function getUserDecomposedAnswer(){
    return tree.root.decomposeTree()
}


function getValueFromLabel(label){
    const regex = /label:\s*(.+)/
    const match = label.match(regex)

    if(match && match[1])
        return match[1].trim()

    return ''
}

function GraphView({questionNumber}){

    const [namePopupEditText, setNamePopupEditText] = useState("");

    const createLabel = (identity, label) => {
        return "id: " + identity + "\nlabel: " + label;;
    }

    const graph = {
        nodes: nodeArray,
        edges: edgeArray,
        
    }
    
    var option = {
        edges: {
            color:"black",
            arrows:{
                from:{
                    enabled: false
                },
                to:{
                    enabled: true
                }
            }
        },

        height: "500px",

        interaction: {
            dragNodes:true,
        },
        manipulation: {

            //addNode, addEdge, editNode and deleteNode are custom written functions
            addNode: function(nodeData,callback) {
                identity++;

                //sets node colour to green for the root
                if(nodeArray.length === 0){
                    nodeData.color = "#00ff00"
                    identity = 0
                }
                nodeData.id = identity;
                nodeData.label = createLabel(identity, namePopupEditText);
                nodeArray.push(nodeData);

                //adds nodes to the display
                callback(nodeData);
            },

            addEdge: function(edgeData,callback) {

                //checks to see if user dragged the edge to node of origin
                if (edgeData.from === edgeData.to) {
                  var wantsSelfConnection = window.confirm("Do you want to connect the node to itself?");
                  if (wantsSelfConnection === true) {
                    edgeArray.push(edgeData)
                    callback(edgeData);
                  }
                }
                else {
                    edgeArray.push(edgeData)
                    callback(edgeData);
                }
            },

            editNode: function(nodeData,callback) {
                var currID = nodeData.id
                var newLabel = createLabel(currID, namePopupEditText);
                nodeData.label = newLabel;

                //edits node information in the list of nodes
                var foundNode = nodeArray.findIndex((item) => item.id == currID);
                nodeArray[foundNode].label = newLabel;

                //edits node on display
                callback(nodeData);
            },

            editEdge: false,
            deleteNode: function(nodeData, callback){
                if(nodeData.edges.length != 0){
                    
                    var nodeID = nodeData.nodes[0];
                    var fromExists = false;

                    //looks through the edgeArray to check whether any edge indicates that a node is a parent
                    for(var i = 0; i < edgeArray.length; i++){
                        if(nodeID === edgeArray[i].from){
                            fromExists= true;
                        }
                    }

                    //allows deletion only if node is not a parent
                    if(!fromExists){
                        callback(nodeData);
                        nodeArray = nodeArray.filter(obj => obj.id !== nodeData.nodes[0]);
                        edgeArray = edgeArray.filter(obj => obj.id !== nodeData.edges[0]);
                    }
                    else{
                        alert("Cannot delete node if it is a parent.")
                        callback(null)
                    }
                }
                else{
                    callback(nodeData);
                    nodeArray = nodeArray.filter(obj => obj.id !== nodeData.nodes[0]); 
                }
            },
            deleteEdge: true
        },

        //when enabled, nodes will bounce away from each other we=hen moved closer together
        physics: {
            enabled: false
        }
    }

    const handleAdd = (e, setFn) => {
        setFn(e.target.value);
    }


    return(
        <div className="graphingTool">
            <VisGraph id="myVisGraph"
                graph={graph}
                options={option}
            />
            <div id = "node-answer-box" className="edit-text-container">
                <h4>Add Node</h4>
                <div className="edit-container">
                <EditText className="edit-text" defaultValue="Enter node label" 
                            onChange={(props) => handleAdd(props, setNamePopupEditText)}
                            value={namePopupEditText}
                        />
                </div>
            </div>
            <WrittenAnswer questionNumber={questionNumber}/>
        </div>
    );
}


export default GraphView;

export {getUserAnswer, getUserDecomposedAnswer, clearGraph, getValueFromLabel}