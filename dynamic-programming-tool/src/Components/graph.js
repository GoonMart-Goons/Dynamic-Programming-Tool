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

var identity = -1;

var nodeArray = [];
var edgeArray = [];

function getUserAnswer() {
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

        if(fromIndex < nodes.length && toIndex < nodes.length){
            nodes[toIndex].pid = nodes[fromIndex].id
        }
    }

    const tree = new Tree(nodes[0].value)
    for(var i = 1; i < nodes.length; i++)
        tree.insertByID(nodes[i].pid, new TreeNode(nodes[i].value))

    return tree.root.serializeTree()
}


function getValueFromLabel(label){
    const regex = /label:\s*(.+)/
    const match = label.match(regex)

    if(match && match[1])
        return match[1].trim()

    return ''
}

function GraphView(){

    const [namePopupEditText, setNamePopupEditText] = useState("");

    const createLabel = (identity, label) => {
        return "id: " + identity + "\nlabel: " + label;
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
            addNode: function(nodeData,callback) {
                identity++;
                if(nodeArray.length === 0){
                    nodeData.color = "#00ff00"
                    identity = 0
                }
                nodeData.id = identity;
                nodeData.label = createLabel(identity, namePopupEditText);
                nodeArray.push(nodeData)
                callback(nodeData);
            },
            addEdge: function(edgeData,callback) {
                if (edgeData.from === edgeData.to) {
                  var r = window.confirm("Do you want to connect the node to itself?");
                  if (r === true) {
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
                var foundNode = nodeArray.findIndex((item) => item.id == currID);
                nodeArray[foundNode].label = newLabel;
                callback(nodeData);
            },
            editEdge: true,
            deleteNode: function(nodeData, callback){
                var foundNode, foundEdge;
                foundNode = nodeArray.findIndex((item) => item.id == nodeData.nodes[0]);
                foundEdge = edgeArray.findIndex((item) => item.from == nodeData.nodes[0]);
                if(nodeData.edges.length != 0){
                    var nodeID = nodeData.nodes[0];
                    var fromExists = false;
                    console.log(edgeArray.length)
                    for(var i = 0; i < edgeArray.length; i++){
                        if(nodeID === edgeArray[i].from){
                            fromExists= true;
                        }
                    }
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
            <div className="edit-text-container">
                <h4>Add Node</h4>
                <div className="edit-container">
                <EditText className="edit-text" defaultValue="Enter node label" 
                            onChange={(props) => handleAdd(props, setNamePopupEditText)}
                            value={namePopupEditText}
                        />
                </div>
            </div>
        </div>
    );
}


export default GraphView;

export {getUserAnswer, getValueFromLabel}