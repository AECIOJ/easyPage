function isCnpj(cnpj){
	var valida = new Array(6,5,4,3,2,9,8,7,6,5,4,3,2);
	var dig1= new Number;
	var dig2= new Number;

	exp = /\.|\-|\//g;
	cnpj = cnpj.toString().replace( exp, "" ); 
	if  (cnpj.trim().length == 0)
		return true;
		
	var digito = new Number(eval(cnpj.charAt(12)+cnpj.charAt(13)));

	for(i = 0; i<valida.length; i++){
			dig1 += (i>0? (cnpj.charAt(i-1)*valida[i]):0);  
			dig2 += cnpj.charAt(i)*valida[i];       
	}
	dig1 = (((dig1%11)<2)? 0:(11-(dig1%11)));
	dig2 = (((dig2%11)<2)? 0:(11-(dig2%11)));

	return (((dig1*10)+dig2) == digito);               
}

function isCpf(cpf){
	var Soma;
    var Resto;
    Soma = 0;
	exp = /\.|\-|\//g
	cpf = cpf.toString().replace( exp, "" ); 
	if  (cpf.trim().length == 0)
		return true;
    
	for (i=1; i<=9; i++) 
		Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
	Resto = (Soma * 10) % 11;
	
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10)) ) 
		return false;
	
	Soma = 0;
    for (i = 1; i <= 10; i++)
			Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
	
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11) ) ) 
		return false;
    
	return true;         
}