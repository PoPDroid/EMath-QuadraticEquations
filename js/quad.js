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
var quadformulapartial;
var factoringpartial;
var gcf;
var factorspartial = "";

$(document).ready(function() {
	$("#method").change(function() {
		$("#quadformula").hide();
		$("#factoring").hide();
		$("#squares").hide();
		if ($(this).val() == "quadformula") {
			$("#quadformula").show();
			resetQuadFormula();
			$('#quadformula1container').show();
		}
		if ($(this).val() == "squares") {
			if (isSquare(c) && isSquare(a) && b == 0) {
				$("#squares").show();
			} else {
				$("#method").val("quadformula").selectmenu('refresh');
				alert("Not a difference of 2 squares!");
				$("#quadformula").show();
				resetQuadFormula();
			}
		}
		if ($(this).val() == "factoring") {

			// we must get a into a positivE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			// we must simplify equation after generating or inserting it (removing common factor and bringing x to +ve)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			//will not work if a is -ve

			var hasfactors = false;

			if (bsqrmfac >= 0) {
				$("#factoring").show();
				$('#factoring1container').show();
			} else {
				$("#method").val("quadformula").selectmenu('refresh');
				alert("no real roots");
				$("#quadformula").show();
				resetQuadFormula();
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
	resetQuadFormula();
	resetFactoring();
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
	resetQuadFormula();
	resetFactoring();
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
	$('#factoring1container').hide();
	$('#factoring1container').hide();
	$('#factoring1container').hide();
	$('#factoring1container').hide();
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
	quadformulapartial = '<font size=\'5px\' color=\'red\' >Solve: ' +stringOut + '<br\><br\> Step 1</font><br\> $a=' + a + ',\\; b=' + b + ',\\; c=' + c + '$';
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
	quadformulapartial += '<br\><br\> <font size="5px" color="red">Step 2 (Consider $\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$) </font><br\>$ -b=-('+b+ ')=' + -b + ',$ <br\>  $\\; b^2=('+b+')^2=' + bsqr + ',$ <br\>  $4ac= (4)('+a+')('+c+')=' + fac + ',$ <br\>  $2a=(2)('+a+')=' + ta + '$';
	document.getElementById('quadFormulaAns').innerHTML = quadformulapartial;
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
	$('#quadformula4container').show();
	$('#quadformula3container').hide();
	quadformulapartial += '<br\><br\> <font size="5px" color="red">Step 2 (cont\'d)</font><br\>$b^2 - 4ac$<br\>$='+ bsqr + '-'+fac + '=' + bsqrmfac + '$';
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
		quadformulapartial += '<br\><br\><font size="5px" color="red">Step 2 (cont\'d) </font><br\>$ \\sqrt{b^2 - 4ac}$<br\>$='+b+ '^2 - (4)('+a+')('+c+')=' + sqrtbsqrfac + '$';
		document.getElementById('quadFormulaAns').innerHTML = quadformulapartial;
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

	if(bsqrmfac<0)
	quadformulapartial += '<br\> $\\implies$ no real roots' ;
	else{
	$('#ans1').val();
	$('#ans2').val(Math.round(quadformulasln2 * 100) / 100);
	$('#quadformula5container').hide();
	if(quadformulasln1!=quadformulasln2)
	quadformulapartial += '<br\><br\><font size="5px" color="red">Step 3 </font><br\> $\\implies  \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a} = \\frac{'+-b+' \\pm '+sqrtbsqrfac+'}{'+ta+'} $<br\><br\>  $x=' + quadformulasln1 + '\\, or\\, x=' + quadformulasln2 + '$';
	else
	quadformulapartial += '<br\> $\\implies  \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a} =$' + quadformulasln1;
<<<<<<< HEAD

=======
		
>>>>>>> 4d98ecd8639bfeebe7a86e5a78bd7192b9e02769
	}
	document.getElementById('quadFormulaAns').innerHTML = quadformulapartial;
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	if (document.body.scrollHeight) { 
	  window.scrollTo(0 , document.body.scrollHeight); 
	} 
	$('#canvascontain').show();
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
		factoringpartial = '<font size="5px" color="red">Step 1 </font><br\>' +stringOut +' <br\>is in its simplest form';
		document.getElementById('factoringAns').innerHTML = factoringpartial;
		document.getElementById('gcf2').innerHTML = '';
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	} else {
		factoringpartial = 's<font size="5px" color="red">Step 1 </font><br\>' +stringOut + '<br\> $\\implies (' + gcf + ')($' + stringOut2 + '$)$';
<<<<<<< HEAD

=======
		
>>>>>>> 4d98ecd8639bfeebe7a86e5a78bd7192b9e02769
		document.getElementById('gcf2').innerHTML = '$('+gcf+')$';
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
		document.getElementById('factoringAns').innerHTML = factoringpartial;
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
<<<<<<< HEAD

=======
		
>>>>>>> 4d98ecd8639bfeebe7a86e5a78bd7192b9e02769
	}

}


function checkfactoring2() {
	var faca1 = $('#faca1').val();
	var facc1 = $('#facc1').val();
	var faca2 = $('#faca2').val();
	var facc2 = $('#facc2').val();
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
<<<<<<< HEAD
}


// rem to hide  $('#gcfcontain').show();

function solvefactoring2() {
	$('#factoring3container').show();
	$('#factoring2container').hide();


	$.each(getFactors(Math.abs(a/gcf)), function() {
		var afactors = this;
		$.each(getFactors(Math.abs(c/gcf)), function() {
			var cfactors = this;

//do this



			//4 cases -> 	1: both +, 		2: both -, 		3 :b+ and c-, 		4: b- and c +
			if (b >= 0 && c >= 0) {
				factorspartial += " (" + afactors[0] + " + " + cfactors[0] + ")(" + afactors[1] + " + " + cfactors[1] + ")\n";
			} else if (b < 0 && c < 0) {
				factorspartial += " (" + afactors[0] + " - " + cfactors[0] + ")(" + afactors[1] + " - " + cfactors[1] + ")\n";
			} else if ((b < 0 && c >= 0) || (b >= 0 && c < 0)) {
				factorspartial += " (" + afactors[0] + " + " + cfactors[0] + ")(" + afactors[1] + " - " + cfactors[1] + ")\n";
				factorspartial += " (" + afactors[0] + " - " + cfactors[0] + ")(" + afactors[1] + " + " + cfactors[1] + ")\n";
			}
		});

	});
	alert(factorspartial);

	var stringOut2 = stringquadratic(a / gcf, b / gcf, c / gcf,false);
	if (gcf == 1) {
		alert("already simplified");
	} else {
		$('#gcfcontain').show();
		factoringpartial = stringOut + '<br\> $\\implies (' + gcf + ')($' + stringOut2 + '$)$';
		document.getElementById('factoringAns').innerHTML = factoringpartial;
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	}

}

=======
}


// rem to hide  $('#gcfcontain').show();

function solvefactoring2() {
	$('#factoring3container').show();
	$('#factoring2container').hide();
	

	$.each(getFactors(Math.abs(a/gcf)), function() {
		var afactors = this;
		$.each(getFactors(Math.abs(c/gcf)), function() {
			var cfactors = this;

//do this



			//4 cases -> 	1: both +, 		2: both -, 		3 :b+ and c-, 		4: b- and c +
			if (b >= 0 && c >= 0) {
				factorspartial += " (" + afactors[0] + " + " + cfactors[0] + ")(" + afactors[1] + " + " + cfactors[1] + ")\n";
			} else if (b < 0 && c < 0) {
				factorspartial += " (" + afactors[0] + " - " + cfactors[0] + ")(" + afactors[1] + " - " + cfactors[1] + ")\n";
			} else if ((b < 0 && c >= 0) || (b >= 0 && c < 0)) {
				factorspartial += " (" + afactors[0] + " + " + cfactors[0] + ")(" + afactors[1] + " - " + cfactors[1] + ")\n";
				factorspartial += " (" + afactors[0] + " - " + cfactors[0] + ")(" + afactors[1] + " + " + cfactors[1] + ")\n";
			}
		});

	});
	alert(factorspartial);

	var stringOut2 = stringquadratic(a / gcf, b / gcf, c / gcf,false);
	if (gcf == 1) {
		alert("already simplified");
	} else {
		$('#gcfcontain').show();
		factoringpartial = stringOut + '<br\> $\\implies (' + gcf + ')($' + stringOut2 + '$)$';
		document.getElementById('factoringAns').innerHTML = factoringpartial;
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	}

}

>>>>>>> 4d98ecd8639bfeebe7a86e5a78bd7192b9e02769
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

function isSquare(n) {
	return isInt(Math.sqrt(n));
}

function isInt(n) {
	return n % 1 === 0;
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

	document.getElementById('quadFormulaAns').innerHTML = "<font size='5px' color='red' >Solve: "+stringquadratic(a, b, c,true)+'</font>';
	document.getElementById('factoringAns').innerHTML = "<font size='5px' color='red' >Solve: "+stringquadratic(a, b, c,true)+'</font>';
	document.getElementById('squaresAns').innerHTML = "<font size='5px' color='red' >Solve: "+stringquadratic(a, b, c,true)+'</font>';
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

}

function stringquadratic(sa, sb, sc,zero) {

	var stringOut = "";

	var sta = sa.toString();
	if (sa == 1) {
		sta = ""
	}
	if (sa == -1) {
		sta = "-"
	}

	var stb = "";
	stb = sb.toString() + "x";
	if (sb > 0) {
		stb = "+" + sb.toString() + "x"
	}
	if (sb == 0) {
		stb = ""
	}
	if (sb == 1) {
		stb = "+" + "x"
	}
	if (sb == -1) {
		stb = "-" + "x"
	}

	var stc = "";
	stc = sc.toString();
	if (sc > 0) {
		stc = "+" + sc.toString()
	}
	if (sc == 0) {
		stc = ""
	}
	if(zero)
	return '$' + sta + 'x^2' + stb + stc + '=0$';
	else
	return '$' + sta + 'x^2' + stb + stc + '$';
<<<<<<< HEAD

=======
	
>>>>>>> 4d98ecd8639bfeebe7a86e5a78bd7192b9e02769
}

onload = function() {
	initialization();
}
