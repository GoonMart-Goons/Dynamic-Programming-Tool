import React from "react";
import { Form, Link } from "react-router-dom";
import "./Styles/Login.css";
import dpLogo from './Images/dp2.png';
import profilePic from './Images/profile.png';
import "./Styles/TopDown.css";
import Navbar from "./Components/Navbar";

function Introduction(){
    return(
        <div className="top-down">
            {/*<div className="top-down-logo-container">*/}
            {/*    <Link to = "/">*/}
            {/*        <img className="top-down-logo" src = {dpLogo} alt = "logo" />*/}
            {/*    </Link>*/}
            {/*    <div className="headerTitles">*/}
            {/*        <h1 className="title">Bottom-Up</h1>*/}
            {/*    </div>*/} 
            {/*</div>*/}
            <Navbar placeholder="" ></Navbar>

            <div className="top-down-container">
                <div className="top-down-main-container">
                    <h1>General Theory</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porttitor pulvinar est, vitae fringilla orci euismod vel. In convallis finibus rutrum. Nam et ante id velit ultrices faucibus sit amet sed odio. Duis dignissim pellentesque justo, nec interdum odio tempor in. Nulla pellentesque lectus id facilisis sollicitudin. Quisque mattis purus quis condimentum lobortis. Fusce fringilla molestie metus vitae commodo. Maecenas tincidunt aliquam semper. In vehicula nulla nibh, nec blandit mi dignissim in.</p>
                    <p>In sit amet varius eros, id blandit nisi. Nulla facilisi. Vestibulum pellentesque aliquet leo, eu lobortis augue hendrerit ut. Nam sit amet fermentum augue. Integer vel aliquet velit. Cras placerat porta purus sit amet cursus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis porttitor consequat velit, vel consectetur est mattis maximus. Maecenas a maximus ligula, vitae cursus ante. Proin sit amet erat ac ante rutrum ultrices non vitae lorem. Nam enim lorem, gravida quis nunc non, cursus mollis massa. Nulla facilisi. Integer varius nisi leo, varius pretium nibh aliquet ac.</p>
                    <p>Nunc sagittis augue dui, quis auctor ligula scelerisque vitae. Donec a mi sed ipsum viverra aliquet. Proin sit amet venenatis nulla, eget volutpat nisi. Maecenas auctor, lacus non laoreet ornare, ipsum neque dapibus urna, eu posuere leo felis ac mauris. Nullam lacinia nulla lobortis, scelerisque felis quis, molestie tellus. Maecenas mi quam, egestas ac rutrum id, auctor vel erat. Donec vitae justo fermentum, scelerisque risus id, mattis orci. Praesent semper posuere porta.
                    </p>
                    <p>Suspendisse vestibulum venenatis libero, sed feugiat mi consequat at. Vivamus elementum ut dui id ornare. Suspendisse aliquet metus sit amet nisl blandit varius. Ut non tempus lectus. Nunc ac nisl placerat, elementum enim ac, ultricies velit. Mauris vel aliquam lectus. Cras facilisis congue sapien, sed vestibulum dolor volutpat sit amet. Suspendisse dui elit, congue et aliquam eu, mattis eget sapien. Sed sed dapibus diam. Praesent vel libero id libero mattis egestas. Nullam efficitur nisl cursus velit pellentesque, ac fermentum leo sagittis. Donec rutrum posuere risus ac faucibus. Nam eget justo pharetra, semper purus eget, gravida leo.</p>
                </div>
            </div>
        </div>
    );
}

export default Introduction;