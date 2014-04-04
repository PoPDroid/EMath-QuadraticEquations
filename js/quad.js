var xcenter, ycenter, radius;

var dx;
var dy;

var xticks;
var yticks;

var h2, h, w2, w;

var ctx2;
var canvas2;

var y, z, x;
var a, b, c;
var hco, kco;

var xvertex, yvertex;
var acoef, bcoef, ccoef;

var ycoordR = [];
var xcoordR = [];

var ycoordL = [];
var xcoordL = [];

var xshift;
var yshift;

Dx = 40;
Dy = 40;

dx = 40;
dy = 40;

var xshift;
var yshift;

var L1;

var bsqr;
var fac;
var ta;
var bsqrmfac;
var sqrtbsqrfac;
var hasrealroots;
var quadformulasln1;
var quadformulasln2;
var factoringsln1;
var factoringsln2;
var quadformulapartial;
var factoringpartial;
var squarespartial;
var lhs1;
var lhs2;
var rhs1;
var rhs2;
var lhss;
var rhss;
var gcf;
var factorspartial = "";

$(document).ready(function() {
	$("#method").change(function() {
		$("#quadformula").hide();
		$("#factoring").hide();
		$("#squares").hide();
		if ($(this).val() == "quadformula") {
			$("#quadformula").show();
		}
		if ($(this).val() == "squares") {
			if (checksquares()) {
				$("#squares").show();
			} else {
				$("#method").val("quadformula").selectmenu('refresh');
				alert("Not a difference of 2 squares!");
				$("#quadformula").show();
			}
		}
		if ($(this).val() == "factoring") {
			var hasfactors = false;

			if (bsqrmfac < 0) {
				$("#method").val("quadformula").selectmenu('refresh');
				alert("no real roots");
				$("#quadformula").show();
			} else if(!checkfactoring() || (b == 0 || c==0)){
				$("#method").val("quadformula").selectmenu('refresh');
				alert("can not factor");
				$("#quadformula").show();
			}
			else{
				$("#factoring").show();
			}

		}
	});

	$('input[name=start-radio]').on('change', function() {

		if (this.value == "random") {
			$('#customquadfunction').hide();
		} else if (this.value == "custom") {
			$('#customquadfunction').show();

		}
	});
});

function getFactors(integer) {
	var factors = [], quotient = 0;

	for (var i = 1; i <= integer; i++) {
		var factor = [];
		quotient = integer / i;

		if (quotient === Math.floor(quotient)) {
			factor.push(i);
			factor.push(integer / i);
			factors.push(factor);
		}
	}
	return factors;
}

function plotoption() {

	if ($('input:radio[name=start-radio]:checked').val() == "random") {
		plot();
	} else if ($('input:radio[name=start-radio]:checked').val() == "custom") {
		plotcustom();

	}
	resetSquare();
	resetFactoring();
	resetQuadFormula();
	$("#quadformula").show();
	$("#squares").hide();
	$("#factoring").hide();
}

function plot() {
	$('#equation').show();
	a = Math.floor((Math.random() * 10) - 4);
	if (a == 0) {
		a = 1;
	}
	hco = Math.floor((Math.random() * 10) - 4);
	kco = Math.floor((Math.random() * 10) - 4);

	$('#newDialog').dialog("close");
	initialization();
	draw();
	$("#method").val("quadformula").selectmenu('refresh');
}

function plotcustom() {

	$('#equation').show();
	a = $("#acoeff").val();
	if (a == 0) {
		a = 1;
	}
	hco = $("#bcoeff").val() / (-2 * a);
	kco = $("#ccoeff").val() - (a * hco * hco);

	$('#newDialog').dialog("close");
	initialization();
	draw();
	$("#method").val("quadformula").selectmenu('refresh');
}

function resetQuadFormula() {
	$('#quadformula1container').show();
	$('#canvascontain').hide();
	$('#quadformula2container').hide();
	$('#quadformula3container').hide();
	$('#quadformula4container').hide();
	$('#quadformula5container').hide();
	$('#acoeffans').val("");
	$('#bcoeffans').val("");
	$('#ccoeffans').val("");
	$('#bsqr').val("");
	$('#ta').val("");
	$('#fac').val("");
	$('#mb').val("");
	$('#bsqrmfac').val("");
	$('#ans1').val("");
	$('#ans2').val("");

	//document.getElementById('quadFormulaAns').innerHTML = "";
}

function resetFactoring() {
	$('#factoring1container').show();
	$('#canvascontain').hide();
	$('#factoring2container').hide();
	$('#factoring3container').hide();
	$('#gcf').val("");
	$('#newa').val("");
	$('#newb').val("");
	$('#newc').val("");
	$('#gcf2').val("");
	$('#faca1').val("");
	$('#facc1').val("");
	$('#faca2').val("");
	$('#facc2').val("");

	//document.getElementById('quadFormulaAns').innerHTML = "";
}

function resetSquare() {
	$('#squares1container').show();
	$('#canvascontain').hide();
	$('#squares2container').hide();
	$('#squares3container').hide();
	
	
	$('#squaressln1').val("");
	$('#squaressln2').val("");
	$('#sqra1').val("");
	$('#sqrc1').val("");
	$('#sqra2').val("");
	$('#sqrc2').val("");
	$('#squaresx1').val("");
	$('#squaresx2').val("");
	

	//document.getElementById('quadFormulaAns').innerHTML = "";
}

function showGraph() {

	$("#canvascontain").toggle();
	if ($("#canvascontain").is(":visible")) {
		$('#showgraph').text('Hide Graph').button("refresh");
	} else {
		$('#showgraph').text('Show Graph').button("refresh");
	}

}

function solvequadformula(){
solvequadformula1();
solvequadformula2();
solvequadformula3();
solvequadformula4();
solvequadformula5();	
}

function checkformula1() {

	if ($('#acoeffans').val() == a && $('#bcoeffans').val() == b && $('#ccoeffans').val() == c) {
		solvequadformula1();
	} else {
		alert("wrong");
	}
}

function solvequadformula1() {

	$('#acoeffans').val(a);
	$('#bcoeffans').val(b);
	$('#ccoeffans').val(c);
	$('#quadformula2container').show();
	$('#quadformula1container').hide();
	var stringOut = stringquadratic(a, b, c,true);
	quadformulapartial = '<font  color=\'red\' >Solve: ' +stringOut + '<br\><br\> Step 1</font><br\> $a=' + a + ',\\; b=' + b + ',\\; c=' + c + '$';
	document.getElementById('quadFormulaAns').innerHTML = quadformulapartial;
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
if (document.body.scrollHeight) { 
  window.scrollTo(0 , document.body.scrollHeight); 
} 
}

function checkformula2() {
	if ($('#bsqr').val() == bsqr && $('#ta').val() == ta && $('#fac').val() == fac && $('#mb').val() == -b) {
		solvequadformula2();
	} else {
		alert("wrong");
	}
}

function solvequadformula2() {

	$('#bsqr').val(bsqr);
	$('#ta').val(ta);
	$('#fac').val(fac);
	$('#mb').val(-b);
	$('#quadformula3container').show();
	$('#quadformula2container').hide();
	quadformulapartial += '<br\><br\> <font color="red">Step 2 (Consider $\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$) </font><br\>$ -b=-('+b+ ')=' + -b + ',$ <br\>  $\\; b^2=('+b+')^2=' + bsqr + ',$ <br\>  $4ac= (4)('+a+')('+c+')=' + fac + ',$ <br\>  $2a=(2)('+a+')=' + ta + '$';
	document.getElementById('quadFormulaAns').innerHTML = quadformulapartial;
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	
		document.getElementById('quadformula3help').innerHTML = '$='+ bsqr + '-'+ fac +'= $';
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	if (document.body.scrollHeight) { 
  	window.scrollTo(0 , document.body.scrollHeight); 
} 
}

function checkformula3() {
	if ($('#bsqrmfac').val() == bsqrmfac) {
		solvequadformula3();
	} else {
		alert("wrong");
	}
}

function solvequadformula3() {

	$('#bsqrmfac').val(bsqrmfac);
	$('#quadformula3container').hide();
	if(bsqrmfac>=0){
	$('#quadformula4container').show();
	quadformulapartial += '<br\><br\> <font color="red">Step 3</font><br\>$b^2 - 4ac$<br\>$='+ bsqr + '-'+fac + '=' + bsqrmfac + '$';

		document.getElementById('quadformula4help').innerHTML = '$=\\sqrt{'+bsqrmfac+'} = $';
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	}
	else{
	quadformulapartial += '<br\><br\> <font color="red">Step 3</font><br\>$b^2 - 4ac$<br\>$='+ bsqr + '-'+fac + '=' + bsqrmfac + '$<br\>$ \\implies$ No Real Roots';
		
	}	
	document.getElementById('quadFormulaAns').innerHTML = quadformulapartial;
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	if (document.body.scrollHeight) { 
	  window.scrollTo(0 , document.body.scrollHeight); 
	} 
}

function checkformula4() {
	if ($('#sqrtbsqrfac').val() == sqrtbsqrfac) {
		solvequadformula4();
	} else {
		alert("wrong");
	}
}

function solvequadformula4() {
	if (bsqrmfac >= 0) {
		$('#sqrtbsqrfac').val(sqrtbsqrfac);
		$('#quadformula5container').show();
		$('#quadformula4container').hide();
		quadformulapartial += '<br\><br\><font color="red">Step 4 </font><br\>$ \\sqrt{b^2 - 4ac}$<br\>$='+b+ '^2 - (4)('+a+')('+c+')$<br\>$=' + sqrtbsqrfac + '$<br\>';
		document.getElementById('quadFormulaAns').innerHTML = quadformulapartial;
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
		
		document.getElementById('quadformula5help').innerHTML = '$\\frac{'+-b+' \\pm '+sqrtbsqrfac+'}{'+ta+'}$';
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
		if (document.body.scrollHeight) { 
	  window.scrollTo(0 , document.body.scrollHeight); 
	} 
	} 
	else{
		solvequadformula5();
	}
}

function checkformula5() {
	if ($('#ans1').val() == quadformulasln1 && $('#ans2').val() == quadformulasln2) {
		solvequadformula5();
	} else {
		alert("wrong");
	}
}

function solvequadformula5() {

	if(bsqrmfac>=0){
	$('#ans1').val();
	$('#ans2').val(Math.round(quadformulasln2 * 100) / 100);
	$('#quadformula5container').hide();
	if(quadformulasln1!=quadformulasln2)
	quadformulapartial += '<br\><br\><font color="red">Step 5 </font><br\> $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a} $<br\>$= \\frac{'+-b+' \\pm '+sqrtbsqrfac+'}{'+ta+'} $<br\><br\>  Ans1: $x=' + quadformulasln1 + '\\, $<br\><br\>or<br\><br\>  Ans2: $\\, x=' + quadformulasln2 + '$';
	else
	quadformulapartial += '<br\> Ans: $ x =  \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a} =\\frac{'+-b+'}{'+ta+'}=$' + quadformulasln1;

	}
	document.getElementById('quadFormulaAns').innerHTML = quadformulapartial;
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	if (document.body.scrollHeight) { 
	  window.scrollTo(0 , document.body.scrollHeight); 
	} 
	$('#canvascontain').show();
}


function checkfactoring() {
	var pa = Math.abs(a);
	var pb = Math.abs(b);
	var pc = Math.abs(c);
	var sign = 1;
	if (a < 0)
		sign = -1;
	gcf = sign * getGCF(new Array(pa, pb, pc));
	var isfactorable = false;
	$.each(getFactors(Math.abs(a/gcf)), function() {
		var afactors = this;
		$.each(getFactors(Math.abs(c/gcf)), function() {
			var cfactors = this;
			//x2+x+k => (x+c)(x+d)
			if (b/gcf >= 0 && c/gcf >= 0) {
				if((afactors[0]*cfactors[1]) + (afactors[1]*cfactors[0])==b/gcf )
				 isfactorable = true;
			} 
			//ax2-bx+k => (gx-c)(hx-d)
			else if (b/gcf < 0 && c/gcf >= 0) {
				if((afactors[0]*cfactors[1]) + (afactors[1]*cfactors[0]) == Math.abs(b/gcf) )
				 isfactorable = true;
			} 
			//x2-x-k	=> (x+c)(x-d) or (x-c)(x+d) 
			else if (b/gcf < 0 && c/gcf < 0) {
				if(((afactors[0]*cfactors[1]) + (afactors[1]*(-1)*cfactors[0])) == b/gcf )
				isfactorable = true;
			//x2+x-k => (x+c)(x-d) or (x-c)(x+d) 
			}
			else if(b/gcf >= 0 && c/gcf < 0) {
				if(((afactors[0]*cfactors[1]) + (afactors[1]*(-1)*cfactors[0])) == b/gcf )
				 isfactorable = true;
			}
		});

	});
	
	return(isfactorable);
}


function checkfactoring1() {
	var newa = $('#newa').val();
	var newb = $('#newb').val();
	var newc = $('#newc').val();
	
	gcf = $('#gcf').val();
	var pa = Math.abs(a);
	var pb = Math.abs(b);
	var pc = Math.abs(c);
	var sign = 1;
	if (a < 0)
		sign = -1;

	if (gcf == sign * getGCF(new Array(pa, pb, pc)) && (gcf * newa) == a && (gcf * newb) == b && (gcf * newc) == c) {
		solvefactoring1();
	} else {
		alert("wrong");
	}
}

function solvefactoring() {
solvefactoring1();
solvefactoring2();
solvefactoring3();
}


function solvefactoring1() {
	var pa = Math.abs(a);
	var pb = Math.abs(b);
	var pc = Math.abs(c);
	var sign = 1;
	if (a < 0)
		sign = -1;
	gcf = sign * getGCF(new Array(pa, pb, pc));
	$('#factoring2container').show();
	$('#factoring1container').hide();
	var stringOut = stringquadratic(a, b, c,true);
	var stringOut2 = stringquadratic(a / gcf, b / gcf, c / gcf,false);
	if (gcf == 1) {
		factoringpartial = '<font color="red">Step 1 </font><br\>' +stringOut +' <br\>is in its simplest form';
		document.getElementById('factoringAns').innerHTML = factoringpartial;
		document.getElementById('gcf2').innerHTML = '';
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	} else {
		factoringpartial = '<font color="red">Step 1 </font><br\>' +stringOut + '<br\> $\\implies (' + gcf + ')($' + stringOut2 + '$) = 0$';

		document.getElementById('gcf2').innerHTML = '$('+gcf+')$';
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
		document.getElementById('factoringAns').innerHTML = factoringpartial;
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	}
}


function checkfactoring2() {
	var faca1 = $('#faca1').val();
	var facc1 = $('#facc1').val();
	var faca2 = $('#faca2').val();
	var facc2 = $('#facc2').val();
	var facs1 = $('#facs1').val();
	var facs2 = $('#facs2').val();
	
	
	var result = true;
	var mult1 = 1;
	var mult2 = 1;
	if(faca1*faca2 != a/gcf)result=false;
	if(facc1*facc2 != c/gcf)result=false;
	if(facs1=='minus')mult1=-1;
	if(facs2=='minus')mult2=-1;
	if(facc2*faca1*mult2 + facc1*faca2*mult2 != b/gcf)result=false;
	if (result)solvefactoring2();
	else{
		alert(result);
	}
}

function solvefactoring2() {
	$('#factoring3container').show();
	$('#factoring2container').hide();

	var xcoeff1 = ""; 
	var xcoeff2 = ""; 
	$.each(getFactors(Math.abs(a/gcf)), function() {
		var afactors = this;
		$.each(getFactors(Math.abs(c/gcf)), function() {
			var cfactors = this;
			//x2+x+k => (x+c)(x+d)
			if (b/gcf >= 0 && c/gcf >= 0) {
				if((afactors[0]*cfactors[1]) + (afactors[1]*cfactors[0])==b/gcf )
				{
					lhss = '+';
					rhss = '+';
					lhs1 = afactors[0];
					lhs2 = afactors[1];
					rhs1 = cfactors[0];
					rhs2 = cfactors[1];
					if(afactors[0] >1)xcoeff1=afactors[0];
					if(afactors[1] >1)xcoeff2=afactors[1];
					factorspartial = " (" + xcoeff1 + "x + " + cfactors[0] + ")(" + xcoeff2 + "x + " + cfactors[1] + ")\n";
				}
			} 
			//ax2-bx+k => (gx-c)(hx-d)
			else if (b/gcf < 0 && c/gcf >= 0) {
				if((afactors[0]*cfactors[1]) + (afactors[1]*cfactors[0]) == Math.abs(b/gcf) )
				{
					lhss = '-';
					rhss = '-';
					lhs1 = afactors[0];
					lhs2 = afactors[1];
					rhs1 = cfactors[0];
					rhs2 = cfactors[1];
					if(afactors[0] >1)xcoeff1=afactors[0];
					if(afactors[1] >1)xcoeff2=afactors[1];
					factorspartial = " (" + xcoeff1 + "x - " + cfactors[0] + ")(" + xcoeff2 + "x - " + cfactors[1] + ")\n";
				}
			} 
			//x2-x-k	=> (x+c)(x-d) or (x-c)(x+d) 
			else if (b/gcf < 0 && c/gcf < 0) {
				if(((afactors[0]*cfactors[1]) + (afactors[1]*(-1)*cfactors[0])) == b/gcf )
				{
					lhss = '-';
					rhss = '+';
					lhs1 = afactors[0];
					lhs2 = afactors[1];
					rhs1 = cfactors[0];
					rhs2 = cfactors[1];
					if(afactors[0] >1)xcoeff1=afactors[0];
					if(afactors[1] >1)xcoeff2=afactors[1];
					factorspartial = " (" + xcoeff1 + "x - " + cfactors[0] + ")(" + xcoeff2 + "x + " + cfactors[1] + ")\n";
				}
			//x2+x-k => (x+c)(x-d) or (x-c)(x+d) 
			}
			else if(b/gcf >= 0 && c/gcf < 0) {
				if(((afactors[0]*cfactors[1]) + (afactors[1]*(-1)*cfactors[0])) == b/gcf )
				{
					lhss = '-';
					rhss = '+';
					lhs1 = afactors[0];
					lhs2 = afactors[1];
					rhs1 = cfactors[0];
					rhs2 = cfactors[1];
					if(afactors[0] >1)xcoeff1=afactors[0];
					if(afactors[1] >1)xcoeff2=afactors[1];
					factorspartial = " (" + xcoeff1 + "x - " + cfactors[0] + ")(" + xcoeff2 + "x + " + cfactors[1] + ")\n";
				}
			}
		});

	});
	
		factoringpartial += '<br\><br\><font  color="red">Step 2 </font><br\>$' +'('+gcf+')'+factorspartial +'=0$ <br\>';
		document.getElementById('factoringAns').innerHTML = factoringpartial;
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	
		document.getElementById('factoringsln1').innerHTML = 'Solution 1:<br\> $(' + xcoeff1 + 'x'+lhss +' ' +rhs1 + ') = 0$';
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
		document.getElementById('factoringsln2').innerHTML = 'Solution 2:<br\> $(' + xcoeff2 + 'x'+rhss +' ' +rhs2 + ') = 0$';
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

}


function checkfactoring3() {
	var factoringx1 = $('#factoringx1').val();
	var factoringx2 = $('#factoringx2').val();
	
	
	
	var result = true;
	var mult1 = 1;
	var mult2 = 1;
	if (lhss =='-') mult1=-1;	
	if(factoringx1 != ((-1*mult1)*(rhs1/lhs1)))
	result= false;
	if (rhss =='-') mult2=-1;	
	if(factoringx2 != ((-1*mult2)*(rhs2/lhs2)))
	result= false;
	
	if(result)
	solvefactoring3() ;
	else
	alert("wrong");
}

function solvefactoring3() {

	var mult1 = 1;
	var mult2 = 1;
	if (lhss =='-') mult1=-1;	
	factoringsln1 = ((-1*mult1)*(rhs1/lhs1));
	if (rhss =='-') mult2=-1;	
	factoringsln2= ((-1*mult2)*(rhs2/lhs2));
	$('#factoring3container').hide();
		factoringpartial += '<br\><br\><font  color="red">Step 3 </font><br\>Ans1: $\\implies x = ' +factoringsln1+'$ <br\><br\>or<br\><br\> Ans2: $x ='+ factoringsln2+ ' $  <br\>';
		document.getElementById('factoringAns').innerHTML = factoringpartial;
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

	if (document.body.scrollHeight) { 
	  window.scrollTo(0 , document.body.scrollHeight); 
	} 
	$('#canvascontain').show();
}


function checksquares() {
	var result = false;
	if (b==0 && isSquare(a) && (c<0) && (a>0) && isSquare(Math.abs(c))){
		result = true;
	}
	
	if (result){
		
		var squarespartial1 = '$\\sqrt{a} =\\sqrt{'+a+'} = $';
		document.getElementById('squaresroot1').innerHTML = squarespartial1;
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

		var squarespartial2 = '$\\sqrt{-c} =\\sqrt{'+-c+'} = $';
		document.getElementById('squaresroot2').innerHTML = squarespartial2;
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

	}
	return result;
}

function solvesquares() {
solvesquares1();
solvesquares2();
solvesquares3();
}

function checksquares1() {
	var sqrx1 = $('#squaresx1').val();
	var sqrx2 = $('#squaresx2').val();
	if (sqrx1==Math.sqrt(a) && sqrx2==Math.sqrt(-c)) {
		solvesquares1();
	} else {
		alert("wrong");
	}

}

function solvesquares1() {
		$('#squares1container').hide();
		$('#squares2container').show();
		var stringOut = stringquadratic(a, b, c,true);
		squarespartial = '<font  color=\'red\' >Solve: ' +stringOut + '<br\><br\> Step 1</font><br\> $\\sqrt{a} =\\sqrt{'+a+'} = '+Math.sqrt(a)+'  $  <br\>$\\sqrt{-c} =\\sqrt{'+-c+'} = '+Math.sqrt(-c)+'  $';
		document.getElementById('squaresAns').innerHTML = squarespartial;
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

	if (document.body.scrollHeight) { 
	  window.scrollTo(0 , document.body.scrollHeight); 
	} 
}

function checksquares2() {

	var sqra1 = $('#sqra1').val();
	var sqrc1 = $('#sqrc1').val();
	var sqra2 = $('#sqra2').val();
	var sqrc2 = $('#sqrc2').val();
	
	
	if (sqra1==Math.sqrt(a) &&sqra2==Math.sqrt(a) &&sqrc1==Math.sqrt(-c) && sqrc2==Math.sqrt(-c)) {
		solvesquares2();
	} else {
		alert("wrong");
	}
}

function solvesquares2() {
		$('#squares2container').hide();
		$('#squares3container').show();
		squarespartial += '<font  color=\'red\' ><br\> Step 2</font><br\> $\\implies ('+Math.sqrt(a)+'x^2 +  '+Math.sqrt(-c)+')('+Math.sqrt(a)+'x^2 -  '+Math.sqrt(-c)+')   =0$  <br\>';
		document.getElementById('squaresAns').innerHTML = squarespartial;
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
		document.getElementById('squaresslnhelp1').innerHTML = '$ \\frac{'+Math.sqrt(a)+'}{-'+Math.sqrt(-c)+'} =$';
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
		document.getElementById('squaresslnhelp2').innerHTML = '$ \\frac{'+Math.sqrt(a)+'}{'+Math.sqrt(-c)+'} =$';
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);


	if (document.body.scrollHeight) { 
	  window.scrollTo(0 , document.body.scrollHeight); 
	} 
}

function checksquares3() {

	var squaressln1in = $('#squaressln1').val();
	var squaressln2in = $('#squaressln2').val();
	
	
	var squaressln1 = Math.round(((-1)*(Math.sqrt(a)/Math.sqrt(-c))) * 100) / 100;
	var squaressln2 = Math.round(((Math.sqrt(a)/Math.sqrt(-c))) * 100) / 100;
	if (squaressln1in==squaressln1&& squaressln2in==squaressln2) {
		solvesquares3();
	} else {
		alert("wrong");
	}
}

function solvesquares3() {
		$('#squares3container').hide();
		var squaressln1 = Math.round(((-1)*(Math.sqrt(a)/Math.sqrt(-c))) * 100) / 100;
		var squaressln2 = Math.round(((Math.sqrt(a)/Math.sqrt(-c))) * 100) / 100;
		squarespartial += '<br\><br\><font  color="red">Step 3 </font><br\> $  ('+Math.sqrt(a)+'x^2 +  '+Math.sqrt(-c)+')=0$<br\> $\\implies$ Ans1: $x = \\frac{'+Math.sqrt(a)+'}{ -'+Math.sqrt(-c)+'} = ' +squaressln1+'$ <br\>  <br\> or <br\>  <br\> $('+Math.sqrt(a)+'x^2 -  '+Math.sqrt(-c)+') = 0$<br\> $\\implies$ Ans2: $ x = \\frac{'+Math.sqrt(a)+'} {'+Math.sqrt(-c)+'} = '+ squaressln2+ ' $  <br\>';
		document.getElementById('squaresAns').innerHTML = squarespartial;
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

	if (document.body.scrollHeight) { 
	  window.scrollTo(0 , document.body.scrollHeight); 
	} 
	$('#canvascontain').show();
}

function isSquare(number){
	var result = Math.sqrt(number);
	var isSquare = (result%1 == 0);
	return isSquare;	
}

function getGCF(numbers) {
	var result = numbers[0];
	for (var i = 1; i < numbers.length; i++) {
		result = gcd(result, numbers[i]);
	}
	return result;
}

function gcd(x, y) {
	while (y != 0) {
		var z = x % y;
		x = y;
		y = z;
	}
	return x;
}

function updateSlidera(x) {
	a = x;

	document.mainform.acoef.value = a.toString();

	readData();

}

function updateSliderb(x) {

	b = x;
	document.mainform.bcoef.value = b.toString();
	readData();
}

function updateSliderc(x) {

	c = x;
	document.mainform.ccoef.value = c.toString();
	readData();
}

function readData() {

	var astring = document.mainform.acoef.value;
	var bstring = document.mainform.bcoef.value;
	var cstring = document.mainform.ccoef.value;

	a = parseFloat(astring);
	hco = parseFloat(bstring);
	kco = parseFloat(cstring);

	if (isNaN(a)) {
		alert("Enter a number for coefficient a");
	}
	if (isNaN(hco)) {
		alert("Enter a number for coefficient h");
	}
	if (isNaN(kco)) {
		alert("Enter a number for coefficient k");
	}

	if (a == 0) {
		alert("Coefficient a cannot be zero");
	}

	initialization();
	draw();
}

function initialization() {

	canvas2 = document.getElementById('canvas2');
	ctx2 = canvas2.getContext('2d');
	w2 = canvas2.width;
	h2 = canvas2.height;

$('#bcoeff').on('input',function(e){
 if($(this).val()<0 ) document.getElementById('sign1').innerHTML = '';
 else   document.getElementById('sign1').innerHTML = ' + ';
});
$('#ccoeff').on('input',function(e){
 if($(this).val()<0 ) document.getElementById('sign2').innerHTML = '';
 else   document.getElementById('sign2').innerHTML = ' + ';
});
$('#newb').on('input',function(e){
 if($(this).val()<0 ) document.getElementById('newsign1').innerHTML = '';
 else   document.getElementById('newsign1').innerHTML = ' + ';
});
$('#newc').on('input',function(e){
 if($(this).val()<0 ) document.getElementById('newsign2').innerHTML = '';
 else   document.getElementById('newsign2').innerHTML = ' + ';
});
	ctx2.save();
	ctx2.clearRect(0, 0, w2, h2);

	xshift = w2 / 2;
	yshift = h2 / 2;

	// draw axes

	ctx2.lineWidth = 2;
	ctx2.strokeStyle = "black";
	ctx2.beginPath();

	ctx2.moveTo(xshift, 0);
	ctx2.lineTo(xshift, h2);

	ctx2.moveTo(0, h2 - yshift);
	ctx2.lineTo(w2, h2 - yshift);

	ctx2.stroke();

	Kx = w2 / Dx + 1;

	Ky = h2 / Dy + 1;

	// ticks and labels on x axis

	ctx2.lineWidth = 0.2;

	for ( j = 0; j <= Kx; j++) {

		ctx2.strokeStyle = "grey";

		ctx2.beginPath();
		ctx2.moveTo(j * Dx + xshift, 0);
		ctx2.lineTo(j * Dx + xshift, h2);
		ctx2.stroke()

		ctx2.strokeStyle = "blue";
		ctx2.beginPath();
		ctx2.moveTo(j * Dx + xshift, h2 - yshift);
		ctx2.lineTo(j * Dx + xshift, h2 - 10 - yshift);
		ctx2.stroke()

		// labels
		ctx2.fillStyle = "blue";
		ctx2.fillText((j * dx / Dx).toString(), j * Dx + xshift, h2 + 20 - yshift);

	}

	for ( j = 0; j <= Kx; j++) {

		ctx2.strokeStyle = "grey";

		ctx2.beginPath();
		ctx2.moveTo(-j * Dx + xshift, 0);
		ctx2.lineTo(-j * Dx + xshift, h2);
		ctx2.stroke();

		ctx2.strokeStyle = "blue";
		ctx2.beginPath();
		ctx2.moveTo(-j * Dx + xshift, h2 - yshift);
		ctx2.lineTo(-j * Dx + xshift, h2 - 10 - yshift);
		ctx2.stroke();

		// labels
		ctx2.fillStyle = "blue";
		//    ctx2.moveTo(j*dx+xshift, 0);
		ctx2.fillText((-j * dx / Dx).toString(), -j * Dx + xshift, h2 + 20 - yshift);

	}

	// Ticks on y - axis

	for ( k = 0; k <= Ky; k++) {
		ctx2.strokeStyle = "black";
		ctx2.beginPath();
		ctx2.moveTo(0 + xshift, h2 - k * Dy - yshift);
		ctx2.lineTo(10 + xshift, h2 - k * Dy - yshift);

		ctx2.strokeStyle = "grey";

		ctx2.beginPath();
		ctx2.moveTo(0, h2 - k * Dy - yshift);
		ctx2.lineTo(w2, h2 - k * Dy - yshift);

		ctx2.stroke();

		// labels
		ctx2.fillStyle = "blue";
		ctx2.fillText((k * dy / Dy).toString(), xshift - 20, yshift - k * Dy);

	}

	for ( k = 0; k <= Ky; k++) {
		ctx2.strokeStyle = "blue";
		ctx2.beginPath();
		ctx2.moveTo(0 + xshift, h2 + k * Dy - yshift);
		ctx2.lineTo(10 + xshift, h2 + k * Dy - yshift);

		ctx2.strokeStyle = "grey";

		ctx2.beginPath();
		ctx2.moveTo(0, h2 + k * Dy - yshift);
		ctx2.lineTo(w2, h2 + k * Dy - yshift);

		ctx2.stroke();

		// labels
		ctx2.fillStyle = "blue";
		ctx2.fillText((-k * dy / Dy).toString(), xshift - 20, yshift + k * Dy);

	}

	// ------------- drawing arrows on x axis-------------

	ctx2.fillStyle = "black";
	ctx2.beginPath();
	ctx2.moveTo(w2, yshift);
	ctx2.lineTo(w2 - 15, yshift - 10);
	ctx2.lineTo(w2 - 10, yshift);
	ctx2.lineTo(w2 - 15, yshift + 10);
	ctx2.lineTo(w2, yshift);

	ctx2.closePath();
	ctx2.fill();

	// ---------------- drawing arrows on y axis---------------

	ctx2.fillStyle = "black";
	ctx2.beginPath();

	ctx2.moveTo(xshift, 0);
	ctx2.lineTo(xshift - 10, 15);

	ctx2.lineTo(xshift, 10);
	ctx2.lineTo(xshift + 10, 15);
	ctx2.moveTo(xshift, 0);

	ctx2.closePath();
	ctx2.fill();

	// --------------------------------------

	var k1 = Dx / dx;
	var k2 = Dy / dy;

	L1 = 2 * w2;

	b = -2 * a * hco;
	c = a * hco * hco + kco;

	bsqr = b * b;
	fac = 4 * a * c;
	ta = 2 * a;
	bsqrmfac = bsqr - fac;
	sqrtbsqrfac = 0;
	if (bsqrmfac >= 0) {
		hasrealroots = true;
		sqrtbsqrfac = Math.round(Math.sqrt(bsqrmfac) * 100) / 100;
		quadformulasln1 = Math.round(((-1 * b) + sqrtbsqrfac) / ta * 100) / 100;
		quadformulasln2 = Math.round(((-1 * b) - sqrtbsqrfac) / ta * 100) / 100;
	} else if (bsqrmfac < 0) {
		hasrealroots = false;
	}

	xvertex = -b / (2 * a);
	yvertex = a * (xvertex) * (xvertex) + b * (xvertex) + c;

	delta = b * b - 4 * a * c;

	if (delta >= 0) {
		x1 = (-b + Math.sqrt(delta)) / (2 * a);
		x2 = (-b - Math.sqrt(delta)) / (2 * a);
	}

	yint = c;

	for ( i = 0; i <= L1; i++) {

		xcoordR[i] = xshift + Dx * k1 * (xvertex) + i;

		x = xvertex + i / (k1 * Dx);

		ycoordR[i] = yshift - (Dy * k2) * (a * x * x + b * x + c);

	}

	for ( i = 0; i <= L1; i++) {
		xcoordL[i] = xshift + Dx * k1 * (xvertex) - i;

		x = xvertex - i / (k1 * Dx);
		ycoordL[i] = yshift - (Dy * k2) * (a * x * x + b * x + c);

	}

}

// ------------------- Draw graph  -------------------------------

function draw(x) {

	ctx2.strokeStyle = "#000000";
	ctx2.beginPath();
	ctx2.lineWidth = 2;
	ctx2.moveTo(xcoordR[0], ycoordR[0]);

	// draw right side

	for ( i = 0; i <= L1; i++) {

		ctx2.bezierCurveTo(xcoordR[i], ycoordR[i], xcoordR[i + 1], ycoordR[i + 1], xcoordR[i + 2], ycoordR[i + 2]);

		i = i + 2;

	}
	ctx2.stroke();

	// draw left side

	ctx2.moveTo(xcoordL[0], ycoordL[0]);

	for ( i = 0; i <= L1; i++) {

		ctx2.bezierCurveTo(xcoordL[i], ycoordL[i], xcoordL[i + 1], ycoordL[i + 1], xcoordL[i + 2], ycoordL[i + 2]);

		i = i + 2;

	}
	ctx2.stroke();

	// ---------- draw vertex ------------------------------------

	ctx2.fillStyle = "blue";
	ctx2.beginPath();
	ctx2.arc(xcoordL[0], ycoordL[0], 4, 0, 2 * Math.PI);
	ctx2.fill();

	// ------------- display vertex, x and y intercepts ----------

	ctx2.fillStyle = "blue";
	ctx2.font = "12px Arial";

	textOut();

}

function textOut() {

	document.getElementById('quadFormulaAns').innerHTML = "<font color='red' >Solve: "+stringquadratic(a, b, c,true)+'</font>';
	document.getElementById('factoringAns').innerHTML = "<font color='red' >Solve: "+stringquadratic(a, b, c,true)+'</font>';
	document.getElementById('squaresAns').innerHTML = "<font color='red' >Solve: "+stringquadratic(a, b, c,true)+'</font>';
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

}

function stringquadratic(sa, sb, sc,zero) {

	var stringOut = "";

	var sta = sa.toString();
	if (sa == 1) {
		sta = "";
	}
	if (sa == -1) {
		sta = "-";
	}

	var stb = "";
	stb = sb.toString() + "x";
	if (sb > 0) {
		stb = "+" + sb.toString() + "x";
	}
	if (sb == 0) {
		stb = "";
	}
	if (sb == 1) {
		stb = "+" + "x";
	}
	if (sb == -1) {
		stb = "-" + "x";
	}

	var stc = "";
	stc = sc.toString();
	if (sc > 0) {
		stc = "+" + sc.toString();
	}
	if (sc == 0) {
		stc = "";
	}
	if(zero)
	return '$' + sta + 'x^2' + stb + stc + '=0$';
	else
	return '$' + sta + 'x^2' + stb + stc + '$';


}


MathJax.Hub.Queue(
    function () {
			$("#newequationdiv").show();
			$.mobile.loading('hide');
    }
);
  
$(document).ready(function() {
	initialization();
	$.mobile.showPageLoadingMsg();
});

