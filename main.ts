import { SyntaxError, parse } from "./polynomial"
declare var MathJax: any;


interface Variable {
    name: string;
    sub: number | null;
}

interface Exponential {
    variable: Variable;
    sup: number;
}



interface Term {
    coeff: number;
    monomial: Exponential[];
}

function variableToString(v: Variable): string {
    if (v.sub != undefined) {
        return `${v.name}_{${v.sub}}`;
    } else {
        return v.name;
    }

}

function exponentialToString(e: Exponential): string {
    return `${variableToString(e.variable)}^{${e.sup}}`;
}

function monomialToString(m: Exponential[]): string {
    return m.map(exponentialToString).join("");
}

function showFloat(f: number): string {
    var s: string = f.toString();
    if (s.search("e") == -1) {
        return s;
    } else {
        var a = s.split("e");
        return `${a[0]}\\times 10^{${a[1]}}`;
    }
}

function termToString(t: Term): string {
    return `(${showFloat(t.coeff)})${monomialToString(t.monomial)}`;
}

function toTeX(ts: Term[]): string {
    function reduceTerms(ac: string, v: Term): string {
        if (ac != "") {
            ac = ac.concat("+");
        }
        ac = ac.concat(termToString(v));
        return ac;
    }

    return ts.reduce(reduceTerms, "");
}

function go(): void {
    var input: string = (document.getElementById("txaInput") as HTMLTextAreaElement).value;
    try {
        const sampleOutput: Term[] = parse(input, undefined)[0];
        (document.getElementById("txaOutput") as HTMLTextAreaElement).value =
            JSON.stringify(sampleOutput);
        var math = MathJax.Hub.getAllJax("divOutput")[0];
        MathJax.Hub.Queue(["Text", math, toTeX(sampleOutput)]);

    }
    catch (ex) {
        (document.getElementById("txaOutput") as HTMLTextAreaElement).value =
            ex.toString()
    }
}



(document.getElementById("btnGo") as HTMLButtonElement).onclick = go
