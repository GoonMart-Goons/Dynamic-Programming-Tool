import React, { useState } from "react";
import VisGraph, {
    GraphData,
    GraphEvents,
    Options,
  } from 'react-vis-graph-wrapper';
import "../Styles/graph.css";
import { Formik, Field, Form, ErrorMessage, setIn } from 'formik';
import * as Yup from 'yup';
import Popup from "./NodePopup";
import 'reactjs-popup/dist/index.css';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import "../Styles/Popup.css"

var identity = -1;

const nodeArray = [];
const edgeArray = [];

function GraphView(){

    const vis = document.getElementById("myVisGraph");

    const [namePopupComponent, setNamePopupComponent] = useState(false);
    const [namePopupEditText, setNamePopupEditText] = useState("");
    const [nodeContainer, setNodes] = useState([]);
    const [edgeContainer, setEdges] = useState([]);

    const editValidationSchema = Yup.object().shape({
        nodeToEdit: Yup.number()
            .required('You must enter the ID of a node to edit.')
            .typeError('Node ID must be a number'),
        newLabel: Yup.number()
            .required('You must enter a label.')
            .typeError('Node label must be a number')
    });

    const addValidationSchema = Yup.object().shape({
        nodeToAdd: Yup.number()
            .required('Node must have a label.')
            .typeError('Node label must be a number'),
        edgeToAdd: Yup.number()
            .required('Node must have parent.')
            .typeError('Node parent must have a label that is a number'),
    });

    const createLabel = (identity, label) => {
        //await setNamePopupComponent(true);
        return "id: " + identity + "\nlabel: " + label;;
    }

    const graph = {
        nodes: nodeArray,
        edges: edgeArray
    }

    var option = {
        /*configure: {
            enabled: true,
            filter: 'nodes,edges',
            container: undefined,
            showButton: true
        },*/
        edges: {
            color:"black"
        },

        height: "500px",

        interaction: {
            dragNodes:true,
        },

        /*layout: {
            randomSeed: undefined,
            improvedLayout:true,
            clusterThreshold: 150,
            hierarchical: {
              enabled:true,
              levelSeparation: 100,
              nodeSpacing: 100,
              treeSpacing: 200,
              blockShifting: true,
              edgeMinimization: true,
              parentCentralization: true,
              direction: 'LR',        // UD, DU, LR, RL
              sortMethod: 'hubsize',  // hubsize, directed
              shakeTowards: 'roots'  // roots, leaves
            }
        },*/

        manipulation: {
            addNode: function(nodeData,callback) {
                identity++;
                setNamePopupComponent(true);
                while(namePopupComponent === true){}
                nodeData.id = identity;
                nodeData.label = createLabel(identity, namePopupEditText);
                callback(nodeData);
                console.log(namePopupEditText);
            },
            addEdge: function(edgeData,callback) {
                if (edgeData.from === edgeData.to) {
                  var r = window.confirm("Do you want to connect the node to itself?");
                  if (r === true) {
                    callback(edgeData);
                  }
                }
                else {
                  callback(edgeData);
                }
            },
            /*editNode: function(nodeData,callback) {
                nodeData.label = createLabel(identity, "fff");
                callback(nodeData);
                console.log(namePopupEditText);
            },*/
            editEdge: true,
            deleteNode: true,
            deleteEdge: true
        },

        physics: {
            enabled: false
        }
        /**/
    }

    const handleAdd = (e, setFn) => {
        setFn(e.target.value);
        //addNode(e);
        //graph.addNode();
    }

    return(
        <div>
            <VisGraph id="myVisGraph"
                graph={graph}
                options={option}
            />
            <h3>Node Label</h3>
            <div className="edit-container">
            <EditText className="edit-text" defaultValue="" 
                        onChange={(props) => handleAdd(props, setNamePopupEditText)}
                        value={namePopupEditText}
                    />
            </div>
            <Popup trigger={namePopupComponent} setTrigger={setNamePopupComponent}>
                <h3>My Popup</h3>
                <div>
                    <EditText defaultValue="" 
                        onChange={(props) => handleAdd(props, setNamePopupEditText)}
                        value={namePopupEditText}
                    />
                </div>
            </Popup>
        </div>
    );
}

export default GraphView;