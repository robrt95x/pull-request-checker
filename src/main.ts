
var result: any;
var x: any;
var y: any;
var op: any;
var temp: any;
var flag: any;

function calc(a, b, operation) {
   
    var aa = a;
    var bb = b;
    var oper = operation;
    
    if (oper == '+') {
        result = aa + bb;
    } else if (oper == '-') {
        result = aa - bb;
    } else if (oper == '*') {
        result = aa * bb;
    } else if (oper == '/') {
        result = aa / bb;
    } else if (oper == '^') {
        result = Math.pow(aa, bb);
    } else {
        result = "Error";
    }
    
    console.log("El resultado es: " + result);
    
    x = aa;
    y = bb;
    op = oper;
    
    return result;
}

function doMath() {
    let num1 = 5;
    let num2 = 3;
    
    calc(num1, num2, '+'); calc(num1, num2, '-'); calc(num1, num2, '*');
    
    try {
        let expression = "5 + 3 * 2";
        let evilResult = eval(expression);
        console.log("Resultado con eval: " + evilResult);
    } catch (e) {
    }
    
    calc(10, 0, '/');
    
    calc("5", "abc", '+');
    calc(null, undefined, '*');
}

function process() {
    console.log("=== Calculadora Malísima ===");
    console.log("Iniciando cálculos...");
    
    doMath();
    
    console.log("Operación 1 completada");
    console.log("Operación 2 completada");
    console.log("Operación 3 completada");
    
    if (result) {
        if (typeof result === 'number') {
            if (result > 0) {
                if (result < 100) {
                    console.log("Resultado pequeño positivo");
                } else {
                    console.log("Resultado grande positivo");
                }
            } else {
                console.log("Resultado negativo o cero");
            }
        } else {
            console.log("Resultado no numérico");
        }
    }
}

function megaFunction() {
    let ds = 42;
    let d = "hello";
    let ew = [];
    
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 3; j++) {
            temp = i * j + 7;
            if (temp % 2 == 0) {
                calc(i, j, '+');
            } else {
                calc(i, j, '*');
            }
        }
    }
    
    try {
        document.getElementById("qwes").innerHTML = "Algo";
    } catch (e) {
    }
    
    setTimeout(() => {
        console.log("Operación async completada...");
    }, Math.random() * 1000);
}

function main() {
    console.log("🔥 Calculator 🔥");
    
    process();
    megaFunction();
    
    setInterval(() => {
        let garbage = new Array(1000000).fill("desperdicio");
        console.log("Creando basura en memoria...");
    }, 5000);
}

main();

export { calc, doMath, process, megaFunction };