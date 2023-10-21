import React from "react";
import { Form, Link } from "react-router-dom";
import "./Styles/Login.css";
import dpLogo from './Images/dp2.png';
import profilePic from './Images/profile.png';
import "./Styles/TopDown.css";
import Navbar from "./Navbar";

function Introduction(){
    const randomN = Math.floor(Math.random() * 10) + 1;
    return(
        <div className="top-down">
            <Navbar placeholder="" ></Navbar>

            <div className="top-down-container">
                <div className="top-down-main-container">
                    <h1>General Theory</h1>
                    <p>
                    Dynamic programming is an algorithmic paradigm that divides broader problems into smaller subproblems and stores the result for later use, eliminating the need for any re-computation. This problem-solving approach is quite similar to the divide and conquer approach. Still, unlike divide and conquer, where subproblems are independent, many dynamic programming problems have overlapping subproblems. So, dynamic programming is mainly used when solutions of the same subproblems are needed again and again. In dynamic programming, computed solutions to subproblems are stored in a table so that these don’t have to be recomputed. So, dynamic programming is not useful when there are no common (overlapping) subproblems because there is no point storing the solutions if they are not needed again. <br/>
                    <br/>This means dynamic programming has different properties than the divide and conquer approach. If the problem abides by properties given below, only then it can be solved using a dynamic programming paradigm:
                    <ul>
                    <li>Optimal Substructure: A problem is said to have an optimal substructure if we can formulate a recurrence relation.</li>
                    <li>Overlapping Subproblem: A problem has an optimal substructure if we can formulate a recurrence relation for it. </li>
                    </ul>
                    </p>

                    <h1>Top-Down Approach</h1>
                    <p> 
                    Top-down approach is the simplest technique to solve dynamic programming problems. In this approach, we try to solve the bigger problem by recursively finding the solution to smaller subproblems. Whenever we solve a subproblem, we cache its result so that we don’t end up solving it repeatedly if it’s called multiple times. Instead, we can just return the saved result. This technique of storing the results of already solved subproblems is called Memoization.
                    <br/><br/>
                    Steps to solve a DP problem using Top-Down approach:
                    <ol>
                    <li>Break the given problem into smaller subproblems.</li>
                    <li>Make a recursive tree diagram of the problem.</li>
                    <li>Check if the problem is solved already.</li>
                    <li>Return the saved answer without further calculation.</li>
                    <li>If the problem is not solved, calculate the answer and save it for future use.</li>
                    <li>Return the answer.</li>
                    </ol></p><br/>

                    <h2>Tutorial</h2>
                    <p>
                    Let’s take the example of the Fibonacci series to understand the top-down approach. The Fibonacci series is a series of numbers where each number is the sum of the two preceding numbers. The first two numbers of the series are 0 and 1. The Fibonacci series is defined as:
                    <br/><br/>
                    F(n) = F(n-1) + F(n-2), for n {">"} 1 <br/>
                    F(n) = n, for n = 0 or 1
                    <br/><br/>
                    The first few numbers of the series are 1, 1, 2, 3, 5, 8, 13, 21, 34,….
                    </p>
            
                    <p> The recursive version of the above function is shown below:</p>
                    
                        <code>
                            def fib(n):
                                if n = 0 or n = 1:
                                    return 1
                                else:
                                    return fib(n-1) + fib(n-2)
                        </code>
                    

                    <p>
                    As we can see, the function is called multiple times for the same value of n. So, we can optimize the above function by storing the results of the already solved subproblems. This technique of storing the results of already solved subproblems is called Memoization. Let’s see how we can optimize the above function using Memoization.
                    We improve the algorithm as shown below:
                    </p>
                    <code>
                    def fib(n, memo={}):
                        if n in memo:
                            return memo[n]
                        
                        if n {'<'}= 2:
                            result = 1
                        else:
                            result = fib(n - 1, memo) + fib(n - 2, memo)
                        
                        memo[n] = result
                        return result
                    </code>
                    <p>
                    As we can see, the function is not called multiple times for the same value of n. So, we have optimized the above function using Memoization.
                    The above approach is called the Top-Down approach because we started solving the problem from the top and reached the base case by dividing the problem into smaller subproblems.
                    </p>
                    <br/><br/>

                    <h2>Question</h2>
                    <p>
                        Illustrate the tree diagram to find Fibonacci number {randomN}.
                    </p>

                    <p>
                    Answer:<br/>
                    <br/>
                    //link to graphing page
                    <br/>
                    <Link to = "/fibchecker" className="home-head2"><h5>Checker</h5></Link>
                    </p>
                    <br/><br/>

                    


                </div>
            </div>
        </div>
    );
}

export default Introduction;