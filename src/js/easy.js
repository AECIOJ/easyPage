/**
 *	easy.fw
 *	módulo: javascript
 *	
 *
 */


class Elemento {

    constructor(tag){
        this.e = document.createElement(tag);        
    }

    setVal(v){
        this.e.value = v ;
    }

    setClasse(c){
        this.e.className = c ;
    }

    setTipo(t){
        this.e.type = t ;
    }

    setTexto(t){
        this.e.innerHTML = t;
    }

    setAtrib(a,v){
        this.e.setAttribute(a, v);
    }

    
    setEvento(e,f){
        this.e.addEventListener(e, f);
    }
    
    setEstilo(k,v){
        this.e.style[k] = v;    
    }
    
    setEstilos(s){
        this.e.style = '';
        for (let k in s)
            this.setEstilo(k,s[k]);
    }

    alinhaTexto(a){
        this.e.style.textAlign  = a;
    }
    
    adEstilos(s){
        for (let k in s)
            this.setEstilo(k,s[k]);
    }
        
    adElemento(o){
        this.e.appendChild(o.e);
    }

    adLink(titulo,destino='#'){
        let a = this.criaElemento('a');
        a.setTexto(titulo);
        a.setAtrib('href', destino);
        this.adElemento(a);
        return a;        
    }
    
    adImagem(arquivo){
        let i = document.createElement('img');
        i.setAttribute('src',arquivo);
        this.adElemento(i);
        return i;
    }

    criaElemento(tag){
        let e = new Elemento(tag);
        this.adElemento(e);
        return e;        
    }
    
    criaBotao(texto,evento){
        let b = new Botao(texto,evento);
        this.adElemento(b);
        return b;
    }

    criaParagrafo(texto){
        let p = new Elemento('p');
        p.setTexto(texto);
        this.adElemento(p);
        return p;  
    }

    show(){
        document.body.appendChild(this.e);
    }
}

class Imagem extends Elemento {    
    constructor(arquivo){
        super('img');
        this.e.setAttribute('src',arquivo)
        this.setClass('Imagem');
    }
}

class Botao extends Elemento {    
    constructor(texto,evento){
        super('button');
        this.setTexto(texto);
        this.setEvento('click',evento);
    }    
}

class Div extends Elemento {    
    constructor(classe = ''){
        super('div');
        this.setClasse(classe);
    }
}

class Cabecalho extends Elemento {
    constructor(texto = ''){
        super('header');
        this.setTexto(texto);
        this.setClasse('cabecalho');
    }
}

class Menu extends Elemento {
    constructor(classe = 'menu'){
        super('nav');
        this.itens = this.criaElemento('ul');
        this.setClasse(classe);
    }
    
    adItem(texto,destino){
        let l = this.itens.criaElemento('li');
        l.adLink(texto,destino);
        return l;
    }
}


class Sessao extends Elemento {    
    constructor(classe = 'sessao'){
        super('section');
        this.setClasse(classe);
    }

    criaCabecalho(texto=''){
        this.cabecalho = new Cabecalho(texto);
        this.adElemento(this.cabecalho);
        return this.cabecalho;
    }

}

class Pagina extends Div {    
    constructor(classe = 'pagina'){
        super();
        this.setClasse(classe);
    }

    criaCabecalho(texto=''){
        let c = new Cabecalho(texto);
        this.adElemento(c);
        return c;
    }

    criaMenu(classe='menu'){
        let m = new Menu(classe);
        this.adElemento(m);
        return m;        
    }

    criaSessao(texto=''){
        let c = new Sessao(texto);
        this.adElemento(c);
        return c;
    }
    
}
