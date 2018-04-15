import {SyntaxError, parse} from "./polynomial"


interface Variable{
    name: string;
    sub: number;
}

interface Exponential{
    variable: Variable;
    sup: number;
}
    

interface Term{
    coeff: number;
    monomial: Exponential[];
}

function go(): void{
    var input: string = (document.getElementById("txaInput") as HTMLTextAreaElement).value;
    try {
	const sampleOutput: Term[] = parse(input, undefined);
	(document.getElementById("txaOutput") as HTMLTextAreaElement).value =
	    JSON.stringify(sampleOutput)
    }
    catch (ex)
    {
	(document.getElementById("txaOutput") as HTMLTextAreaElement).value =
	    ex.toString()
    }
}
    


(document.getElementById("btnGo") as HTMLButtonElement).onclick = go
