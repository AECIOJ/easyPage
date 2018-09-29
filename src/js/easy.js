
class Element {

    constructor(tag){
        this.e = document.createElement(tag);        
    }

    setClass(c){
        this.e.className = c ;
    }

    setID(i){
        this.e.id = i ;
    }
   
    setType(t){
        this.e.type = t ;
    }
    
    setVal(v){
        this.e.value = v ;
    }

    setText(t){
        this.e.innerHTML = t;
    }

    setAttrib(a,v){
        this.e.setAttribute(a, v);
    }
    
    setEvent(e,f){
        this.e.addEventListener(e, f);
    }
    
    setStyle(k,v){
        this.e.style[k] = v;    
    }
    
    setStyles(s){
        this.e.style = '';
        for (let k in s)
            this.setStyle(k,s[k]);
    }

    setTextAlign(a){
        this.e.style.textAlign  = a;
    }
    
    adStyle(s){
        for (let k in s)
            this.setStyle(k,s[k]);
    }
        
    adElement(o){
        this.e.appendChild(o.e);
    }

    adLink(title,link='#'){
        let a = this.newElement('a');
        a.setText(title);
        a.setAttrib('href', link);
        this.adElement(a);
        return a;        
    }
    
    adImage(file){
        let i = document.createElement('img');
        i.setAttribute('src',file);
        this.adElement(i);
        return i;
    }

    newElement(tag){
        let e = new Element(tag);
        this.adElement(e);
        return e;        
    }
    
    newButton(text,evento){
        let b = new Button(text,evento);
        this.adElement(b);
        return b;
    }

    show(){
        document.body.appendChild(this.e);
    }
}

class Image extends Element {    
    constructor(file){
        super('img');
        this.e.setAttribute('src',file)
        this.setClass('Image');
    }
}

class Button extends Element {    
    constructor(texto,evento){
        super('button');
        this.setText(texto);
        this.setEvent('click',evento);
    }    
}

class Div extends Element {    
    constructor(classe = ''){
        super('div');
        this.setClass(classe);
    }
}

class Header extends Element {
    constructor(texto = ''){
        super('header');
        this.setText(texto);
    }
}

class Section extends Element {
    constructor(texto = ''){
        super('section');
        this.setText(texto);
    }
}

class Aside extends Element {
    constructor(texto = ''){
        super('aside');
        this.setText(texto);
    }
}

class Article extends Element {
    constructor(texto = ''){
        super('article');
        this.setText(texto);
    }
}

class Footer extends Element {
    constructor(texto = ''){
        super('footer');
        this.setText(texto);
    }
}

class Nav extends Element {
    constructor(classe = 'nav'){
        super('nav');
        this.setClass(classe);
        this.itens = this.newElement('ul');
    }
    
    adItem(text,link){
        let l = this.itens.newElement('li');
        l.adLink(text,link);
        return l;
    }
}

class Panel extends Div {    
    constructor(classe = 'Panel'){
        super();
        this.setClass(classe);
    }

    newHeader(texto=''){
        let c = new Header(texto);
        this.adElement(c);
        return c;
    }


    newNav(classe='nav'){
        let m = new Nav(classe);
        this.adElement(m);
        return m;        
    }

    newSection(texto=''){
        let s = new Section(texto);
        this.adElement(s);
        return s;
    }

    newFooter(texto=''){
        let f = new Footer(texto);
        this.adElement(f);
        return f;
    }
    
}
