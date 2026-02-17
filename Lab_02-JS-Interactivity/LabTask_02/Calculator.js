function calculate()
{
    let n1=parseFloat(document.getElementById("num1").value);
    let n2=parseFloat(document.getElementById("num2").value);
    let op=document.getElementById("operation").value;
    let box=document.getElementById("result");

    if(isNaN(n1)||isNaN(n2)){
        box.innerHTML="⚠ Please enter valid numbers!";
        box.style.background="#f8d7da";
        box.style.color="#721c24";
        return;
    }

    if(op==="/" && n2===0){
        box.innerHTML="❌ Division by zero is not allowed!";
        box.style.background="#f8d7da";
        box.style.color="#721c24";
        return;
    }

    let result;
    switch(op){
        case "+": result=n1+n2; break;
        case "-": result=n1-n2; break;
        case "*": result=n1*n2; break;
        case "/": result=n1/n2; break;
    }

    box.innerHTML="Result: "+result;

    // Background color change
    if(result>=0){
        box.style.background="#d4edda";
        box.style.color="#155724";
    }else{
        box.style.background="#f8d7da";
        box.style.color="#721c24";
    }
}
