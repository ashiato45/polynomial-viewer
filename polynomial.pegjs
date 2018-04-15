// Simple Arithmetics Grammar

Polynomial = Term* _

Term = c:SignedNumber "*" m:Monomial{
	return {coeff: c, monomial: m}
}
/ c:SignedNumber{
	return {coeff: c, monomial: []}
}

Monomial = h:Exponential t:("*" Exponential)*{
	var temp = [h];
	t.reduce(function(result, element){
    	temp.push(element[1])
    }, temp);
    return temp;
}

Exponential = v:Variable "^" sup:Integer{
	return {variable: v, sup: sup}
}
/ v:Variable{
	return {variable: v, sup: 1}
}

Variable = n:VariableMain sub:Integer{ 
	return {name: n, sub: sub}
}
/ VariableMain{ return {name: text()}}

VariableMain = [a-z,A-Z]+{return text()}

SignedNumber = _ sign:("+"/"-"/"") n:NumberE{
    if (sign === "-"){return -n}
    return n;
    }

NumberE = 
n:Number ("e"/"E") b:SignedInteger {
return parseFloat(n + "e" + b);
}/Number

Number = 
intp:Integer "." fracp:Integer{return parseFloat(intp.toString() + "." + fracp.toString())}
/signif:Integer{return parseFloat(signif)}


SignedInteger "signedinteger"
  = s:("+"/"-"/"") n:[0-9]+ { 
  var num = parseInt(n.join(""), 10); 
  if (s==="-"){return -num;}
  return num;
  }

Integer "integer"
  = [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r]*
