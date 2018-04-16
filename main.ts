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


class Options {
    longname: boolean;
    cutoff: number | null;
    constructor(ln: boolean, c: number | null) {
        this.longname = ln;
        this.cutoff = c;
    }
}

function variableToString(v: Variable, opt: Options): string {
    var n = v.name;
    if (opt.longname) {
        n = `(\\texttt{${n}})`;
    }
    if (v.sub != undefined) {
        return `${n}_{${v.sub}}`;
    } else {
        return n;
    }

}

function exponentialToString(e: Exponential, opt: Options): string {
    return `${variableToString(e.variable, opt)}^{${e.sup}}`;
}

function monomialToString(m: Exponential[], opt: Options): string {
    return m.map(x => exponentialToString(x, opt)).join("");
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

function termToString(t: Term, opt: Options): string {
    return `(${showFloat(t.coeff)})${monomialToString(t.monomial, opt)}`;
}

function toTeX(ts: Term[], opt: Options): string {
    function reduceTerms(ac: string, v: Term): string {
        if (opt.cutoff != null && Math.abs(v.coeff) < 10 ** (opt.cutoff)) {
            return ac;
        }
        if (ac != "") {
            ac = ac.concat("+");
        }
        ac = ac.concat(termToString(v, opt));
        return ac;
    }

    return ts.reduce(reduceTerms, "");
}

function go(): void {
    var input: string = (document.getElementById("txaInput") as HTMLTextAreaElement).value;
    try {
        var cutoff: number | null = null;
        if ((document.getElementById("chkCutoff") as HTMLInputElement).checked) {
            cutoff = parseInt((document.getElementById("txtCutoff") as HTMLInputElement).value);
        }

        var opt: Options = new Options(
            (document.getElementById("chkLongName") as HTMLInputElement).checked,
            cutoff);
        const sampleOutput: Term[] = parse(input, undefined)[0];
        (document.getElementById("txaOutput") as HTMLTextAreaElement).value =
            JSON.stringify(sampleOutput);
        var math = MathJax.Hub.getAllJax("divOutput")[0];

        var linebreak: boolean = (document.getElementById("chkLinebreak") as HTMLInputElement).checked;
        MathJax.Hub.Config({
            CommonHTML: { linebreaks: { automatic: linebreak } },
            "HTML-CSS": { linebreaks: { automatic: linebreak } },
            SVG: { linebreaks: { automatic: linebreak } }
        });
        MathJax.Hub.Queue(["Text", math, "hoge"]);
        MathJax.Hub.Queue(["Text", math, toTeX(sampleOutput, opt)]);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

    }
    catch (ex) {
        (document.getElementById("txaOutput") as HTMLTextAreaElement).value =
            ex.toString()
    }
}



(document.getElementById("btnGo") as HTMLButtonElement).onclick = go
