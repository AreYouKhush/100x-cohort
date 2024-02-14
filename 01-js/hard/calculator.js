/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(num) {
    this.result += num;
  }

  subtract(num) {
    this.result -= num;
  }

  multiply(num) {
    this.result *= num;
  }

  divide(num) {
    if (num !== 0) {
      this.result /= num;
    } else {
      throw new Error("Cannot divide by zero.");
    }
  }
  
  clear() {
    this.result = 0;
  }
  
  getResult() {
    return this.result;
  }

  calculate(str){
    this.clear();   //resets the result variable

    str = str.replace(/\s/g, "");     //removes all whitespaces

    if (!/^[0-9\s+\-*/().]+$/.test(str) ) {
      throw new Error("Invalid input: Contains non-numeric or invalid characters");
    }           //checkes if non-numeric data is there or not

    try {
      let result = eval(str);
      if (isNaN(result) || !isFinite(result)) {
        throw new Error("Invalid input: Unable to evaluate the expression");
      }     //bad result

      return this.result = result;    //everything was good

    } catch (error) {
      throw new Error("Invalid input: Unable to evaluate the expression");
    } 
    //bad expression
  }

  // calculate(expression) {
  //   if(/[a-z]/i.test(expression)){
  //     throw new Error("Invalid Expression")
  //   }
  //   expression = expression.match(/(?:\d+\.\d+|\d+|[+\-*/()])/g);
  //   let postfixExp = [];
  //   let stack = [];
  //   let parenthesesCount = 0;
  //   expression.forEach((exp) => {
  //     if (!isNaN(exp)) {
  //       postfixExp.push(exp);
  //     } else {
  //       switch (exp) {
  //         case "+":
  //           while (/([+\-\/\*])/.test(stack[stack.length - 1])) {
  //             let lastElement = stack.pop();
  //             postfixExp.push(lastElement);
  //           }
  //           stack.push(exp);
  //           break;
  //         case "-":
  //           while (/([+\-\/\*])/.test(stack[stack.length - 1])) {
  //             let lastElement = stack.pop();
  //             postfixExp.push(lastElement);
  //           }
  //           stack.push(exp);
  //           break;
  //         case "*":
  //           if (/([*\/])/.test(stack[stack.length - 1])) {
  //             let lastElement = stack.pop();
  //             postfixExp.push(lastElement);
  //           }
  //           stack.push(exp);
  //           break;
  //         case "/":
  //           if (/([*\/])/.test(stack[stack.length - 1])) {
  //             let lastElement = stack.pop();
  //             postfixExp.push(lastElement);
  //           }
  //           stack.push(exp);
  //           break;
  //         case "(":
  //           parenthesesCount++;
  //           stack.push(exp);
  //           break;
  //         case ")":
  //           while (stack[stack.length - 1] !== "(") {
  //             let lastElement = stack.pop();
  //             postfixExp.push(lastElement);
  //             if(stack.length == 0){
  //               throw new Error ("Invalid Parenthesis");
  //             }
  //           }
  //           parenthesesCount--;
  //           stack.pop();
  //           break;
  //       }
  //     }
  //   });
  //   while (stack.length > 0) {
  //     postfixExp.push(stack.pop());
  //   }

  //   if(postfixExp.findIndex(item => item === "(") !== -1){
  //     throw new Error("Invalid Parentheses")
  //   }

  //   this.clear();
  //   stack = [];
  //   postfixExp.forEach((item) => {
  //     if (!isNaN(item)) {
  //       stack.push(item);
  //     } else {
  //     let first = Number(stack.pop());
  //       let second = Number(stack.pop());
  //       console.log({first, second})
  //       switch (item) {
  //         case "+":
  //           this.result = second + first;
  //           stack.push(this.result);
  //           break;
  //         case "-":
  //           this.result = second - first;
  //           stack.push(this.result);
  //           break;
  //         case "*":
  //           this.result = second * first;
  //           stack.push(this.result);
  //           break;
  //         case "/":
  //             if(first === 0){
  //             throw new Error("Multiplication with zero!")
  //           }
  //           this.result = second / first;
  //           stack.push(this.result);
  //           break;
  //       }
  //     }
  //   });
  //   return this.result;
  // }
}

module.exports = Calculator;
