import React, { useState } from "react";
import VisGraph, {
    GraphData,
    GraphEvents,
    Options,
  } from 'react-vis-graph-wrapper';
import "../Styles/graph.css";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

var identity = -1;

function GraphView(){

    const [nodeToAdd, setNodeToAdd] = useState();
    const [edgeToAdd, edgeNodeToAdd] = useState();
    const [nodeContainer, setNodes] = useState([]);
    const [edgeContainer, setEdges] = useState([]);
    
    const validationSchema = Yup.object().shape({
        nodeToAdd: Yup.number()
            .required('Node must have a label.')
            .typeError('Node label must be a number'),
        edgeToAdd: Yup.number()
            .required('Node must have parent.')
            .typeError('Node parent must have a label that is a number')
    });

    const createNode = (e) => {
        identity += 1;
        var newLabel = "id: " + identity + "\nlabel: " + e.nodeToAdd;
        const newNode = {
          id: identity,
          label: newLabel,
        };
        return newNode;
    }

    const addNode = (e) => {
        var foundObject;
        var newEdge;
        var newNode;
        foundObject = nodeContainer.find((item) => item.id == e.edgeToAdd);

        //only creates node if the parent ID exists or if the graph is empty
        if(foundObject != null){
            newNode = createNode(e);
            newEdge = {
                from: foundObject.id,
                to: newNode.id,
            };
        }
        else{
            if(nodeContainer.length == 0){
                newNode = createNode(e);
                newEdge = {
                    from: newNode.id,
                    to: newNode.id,
                };
            }
            else{
                alert("Node not in the tree");
                return;
            }
            
        }
        setNodes([...nodeContainer, newNode]);
        setEdges([...edgeContainer, newEdge]);
    };

    const removeAllNodes = () =>{
        setEdges([]);
        setNodes([]);
    }

    /*const removeNode = (e) => {
        var newEdge;
        if(nodeContainer.length > 0){
            const foundObject = nodeContainer.find((item) => item.label === e.edgeToAdd);
            newEdge = {
                from: foundObject.id,
                to: newNode.id,
            };
        }
        else{
            newEdge = {
                from: newNode.id,
                to: newNode.id,
            };
        }
        
        setNodes([...nodeContainer, newNode]);
        setEdges([...edgeContainer, newEdge]);
    };*/
    

    const graph = {
        nodes: nodeContainer,
        edges: edgeContainer
    }

    var option = {
        physics: {
            enabled: false
        },
        edges: {
            color:"black"
        },
        height: "500px"
    }

    const handleAdd = (e) => {
        addNode(e);
    }

    const handleRemove = (e) => {
        //removeNode(e);
    }

    return(
        <div>
            <VisGraph
                graph={graph}
                options={option}
            />
            <div className="node-editor-container">
                <div className="formik-container">
                    <h3>Add Node</h3>
                    <Formik
                        initialValues={{nodeToAdd: "", edgeToAdd: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleAdd}
                        >
                        <Form>
                            <label htmlFor="node">Node Name:</label>
                            <div>
                                <Field type="text" id="node" name="nodeToAdd" placeholder="eg. 57"/>
                                <ErrorMessage name="nodeToAdd" className="addNode-errMsg" component="div"/>
                            </div>
                            <label htmlFor="edge">Node Parent ID:</label>
                            <div>
                                <Field type="text" id="edge" name="edgeToAdd" placeholder="eg. 0"/>
                                <ErrorMessage name="edgeToAdd" className="addNode-errMsg" component="div"/>
                            </div>
                            <button type = "submit" className = "formik-button">Add Node</button>
                        </Form>
                    </Formik>
                </div>
                {/*<div className="formik-container">
                    <h3>Remove Node</h3>
                    <Formik
                        initialValues={{nodeToRemove: "", edgeToRemove: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleRemove}
                        >
                        <Form>
                            <label htmlFor="node">Node Name:</label>
                            <div>
                                <Field type="text" id="node" name="nodeToRemove" placeholder="eg. 57"/>
                                <ErrorMessage name="nodeToRemove" className="removeNode-errMsg" component="div"/>
                            </div>
                            <label htmlFor="edge">Node Parent:</label>
                            <div>
                                <Field type="text" id="edge" name="edgeToRemove" placeholder="eg. 0"/>
                                <ErrorMessage name="edgeToRemove" className="removeNode-errMsg" component="div"/>
                            </div>
                            <button type = "submit" className = "formik-button">Remove Node</button>
                        </Form>
                    </Formik>
    </div>*/}
            </div>
            <button className = "formik-button"onClick={removeAllNodes}>Remove All</button>
        </div>
    );
}

export default GraphView;