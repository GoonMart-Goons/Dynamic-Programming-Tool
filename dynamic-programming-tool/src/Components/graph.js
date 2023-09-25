import React, { useState } from "react";
import Graph from "react-vis-network-graph";
import VisGraph, {
    GraphData,
    GraphEvents,
    Options,
  } from 'react-vis-graph-wrapper';

import { Formik, Field, Form, ErrorMessage } from 'formik'

function GraphView(){

    const [nodeToAdd, setNodeToAdd] = useState();
    const [edgeToAdd, edgeNodeToAdd] = useState();
    const [nodeContainer, setNodes] = useState([]);
    const [edgeContainer, setEdges] = useState([]);


    

    const addNode = (e) => {
        const newNode = {
          id: nodeContainer.length + 1,
          label: e.nodeToAdd,
        };

        console.log(e.edgeToAdd);

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
    };
    

    const graph = {
        nodes: nodeContainer,
        edges: edgeContainer/*[
            {from:1, to:1},
            {from:1, to:7},
        ]*/
    }

    var option = {
        physics: {
            enabled: false
        },
        edges: {
            color:"green"
        },
        height: "500px"
    }

    const handleSubmit = (e) => {
        console.log("Hi");
        addNode(e);
        console.log(graph.edges);
        console.log(graph.nodes);
    }

    return(
        <div>
            <VisGraph
                graph={graph}
                options={option}
            />
            <Formik
                initialValues={{nodeToAdd: "", edgeToAdd: "" }}
                /*validationSchema={validationSchema}*/
                onSubmit={handleSubmit}
                >
                <Form>
                    <label htmlFor="node">Node Name:</label>
                    <div>
                        <Field type="text" id="node" name="nodeToAdd" placeholder="eg. Node 57"/>
                    </div>
                    <label htmlFor="edge">Child Of:</label>
                    <div>
                        <Field type="text" id="edge" name="edgeToAdd" placeholder="0"/>
                    </div>
                    <button type = "submit" className = "add-node-button">Add Node</button>
                </Form>
            </Formik>
        </div>
    );
}

export default GraphView;