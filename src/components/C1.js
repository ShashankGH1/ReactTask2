import React,{useState} from "react";
function C1(){
    const[display,setDisplay]=useState("0");
    const[prevChar,setPrevChar]=useState(null);
    const handleNumberClick=(number)=>{
        if(display==="0"){
            setDisplay(number);
        }
        else{
            setDisplay(display+number);
            setPrevChar(number);
        }
    }
    const handleDecimalClick=()=>{
        setPrevChar(".")
        if(prevChar!==".")
        {
            setDisplay(display+".")
        }
    }
    const handleOperatorClick=(operator)=>{
        if(prevChar === "+" || prevChar === "-" || prevChar === "*" || prevChar === "/"){
            setDisplay(display.slice(0, -1)+operator);
            setPrevChar(operator);
        }
        else{
            setDisplay(display+operator);
            setPrevChar(operator);
        }
    }
    const clearDisplay=()=>{
        setDisplay("0");
        setPrevChar(null);
    }
    const calculate = () => {
        try {
            const operators = {
                '+': (a, b) => a + b,
                '-': (a, b) => a - b,
                '*': (a, b) => a * b,
                '/': (a, b) => {
                if (b === 0) {
                    throw new Error("Division by zero");
                }
                return a / b;
                },
            };
            const tokens = display.match(/\d+(\.\d+)?|[\+\-\*\/]/g);
            let result = parseFloat(tokens[0]);
            let currentOperator = null;
        
            for (let i = 1; i < tokens.length; i++) {
                const token = tokens[i];
        
                if (operators[token]) {
                currentOperator = token;
                }
                else{
                    const number = parseFloat(token);
            
                    if(currentOperator){
                        result = operators[currentOperator](result, number);
                        currentOperator = null;
                    }
                }
            }
            setDisplay(result.toString());
            setPrevChar(null);
        }
        catch(error){
            setDisplay("Error");
            setPrevChar(null);
        }
    };   
    return(
        <div align="center">
            <table>
                <tbody>
                    <tr>
                        <td colspan="4"><input type="text" value={display} readOnly></input></td>
                    </tr>
                    <tr>
                        <td><button onClick={()=>handleNumberClick("7")}>7</button></td>
                        <td><button onClick={()=>handleNumberClick("8")}>8</button></td>
                        <td><button onClick={()=>handleNumberClick("9")}>9</button></td>
                        <td><button onClick={()=>handleOperatorClick("/")}>/</button></td>
                    </tr>
                    <tr>
                        <td><button onClick={()=>handleNumberClick("4")}>4</button></td>
                        <td><button onClick={()=>handleNumberClick("5")}>5</button></td>
                        <td><button onClick={()=>handleNumberClick("6")}>6</button></td>
                        <td><button onClick={()=>handleOperatorClick("*")}>X</button></td>
                    </tr>
                    <tr>
                        <td><button onClick={()=>handleNumberClick("1")}>1</button></td>
                        <td><button onClick={()=>handleNumberClick("2")}>2</button></td>
                        <td><button onClick={()=>handleNumberClick("3")}>3</button></td>
                        <td><button onClick={()=>handleOperatorClick("-")}>-</button></td>
                    </tr>
                    <tr>
                        <td><button onClick={()=>handleDecimalClick()}>.</button></td>
                        <td><button onClick={()=>handleNumberClick("0")}>0</button></td>
                        <td><button onClick={()=>calculate()}>=</button></td>
                        <td><button onClick={()=>handleOperatorClick("+")}>+</button></td>
                    </tr>
                    <tr>
                        <td><button onClick={()=>clearDisplay()}>C</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default C1;