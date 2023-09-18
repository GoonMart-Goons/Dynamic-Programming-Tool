import React from "react";
import { Form, Link } from "react-router-dom";
import "./Styles/Login.css";
import dpLogo from './Images/dp2.png';
import profilePic from './Images/profile.png';
import "./Styles/TopDown.css";
import Navbar from "./Navbar";

function TopDown(){
    return(
        <div className="top-down">
            {/*<div className="top-down-logo-container">*/}
            {/*    <Link to = "/">*/}
            {/*        <img className="top-down-logo" src = {dpLogo} alt = "logo" />*/}
            {/*    </Link>*/}
            {/*    <div className="headerTitles">*/}
            {/*        <h1 className="title">Top-Down</h1>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <Navbar placeholder=""></Navbar>

            <div className="top-down-container">
                <div className="top-down-side-container">
                        <div className="profile-container">
                            <img className="profile-pic" src = {profilePic} alt="profile pic"/>
                            <div className="profile-details-container">
                                <h1>Tek Seven</h1>
                                <h3>detektiv57@gmail.com</h3>
                            </div>
                        </div>
                    <button type = "submit" className = "top-down-button">Easy</button>
                    <button type = "submit" className = "top-down-button">Medium</button>
                    <button type = "submit" className = "top-down-button">Hard</button>
                    <button type = "submit" className = "top-down-button">Final Test</button>
                </div>
                <div className="top-down-main-container">
                    <h1>General Theory</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porttitor pulvinar est, vitae fringilla orci euismod vel. In convallis finibus rutrum. Nam et ante id velit ultrices faucibus sit amet sed odio. Duis dignissim pellentesque justo, nec interdum odio tempor in. Nulla pellentesque lectus id facilisis sollicitudin. Quisque mattis purus quis condimentum lobortis. Fusce fringilla molestie metus vitae commodo. Maecenas tincidunt aliquam semper. In vehicula nulla nibh, nec blandit mi dignissim in.</p>
                    <h1>Memoisation</h1>
                    <p>In sit amet varius eros, id blandit nisi. Nulla facilisi. Vestibulum pellentesque aliquet leo, eu lobortis augue hendrerit ut. Nam sit amet fermentum augue. Integer vel aliquet velit. Cras placerat porta purus sit amet cursus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis porttitor consequat velit, vel consectetur est mattis maximus. Maecenas a maximus ligula, vitae cursus ante. Proin sit amet erat ac ante rutrum ultrices non vitae lorem. Nam enim lorem, gravida quis nunc non, cursus mollis massa. Nulla facilisi. Integer varius nisi leo, varius pretium nibh aliquet ac.</p>
                </div>
            </div>
        </div>
    );
}

export default TopDown;