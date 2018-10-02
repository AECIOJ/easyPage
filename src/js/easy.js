window.onload = function() {
    var p = new Panel();
    initPage(p);
    p.show();
};


class Element {

    constructor(vtag){
        this.e = document.createElement(vtag);        
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
    
    addStyle(s){
        for (let k in s)
            this.setStyle(k,s[k]);
    }
        
    addElement(o){
        this.e.appendChild(o.e);
    }

    addLink(title,link='#'){
        let a = this.createElement('a');
        a.setText(title);
        a.setAttrib('href', link);
        this.addElement(a);
        return a;        
    }
    
    addImage(vfile){
        let i = document.createElement('img');
        i.setAttribute('src',vfile);
        this.addElement(i);
        return i;
    }

    createElement(vtag){
        let e = new Element(vtag);
        this.addElement(e);
        return e;        
    }
    
    createButton(title,eclick){
        let b = new Button(title,eclick);
        this.addElement(b);
        return b;
    }

    show(){
        document.body.appendChild(this.e);
    }
}

class Image extends Element {    
    constructor(vfile){
        super('img');
        this.e.setAttribute('src',vfile)
        this.setClass('Image');
    }
}

class Button extends Element {    
    constructor(title,eclick){
        super('button');
        this.setText(title);
        this.setEvent('click',eclick);
    }    
}

class Div extends Element {    
    constructor(nclass = ''){
        super('div');
        this.setClass(nclass);
    }
}

class Header extends Element {
    constructor(text = ''){
        super('header');
        this.setText(text);
    }
}

class Section extends Element {
    constructor(text = ''){
        super('section');
        this.setText(text);
    }
}

class Aside extends Element {
    constructor(text = ''){
        super('aside');
        this.setText(text);
    }
}

class Article extends Element {
    constructor(text = ''){
        super('article');
        this.setText(text);
    }
}

class Footer extends Element {
    constructor(text = ''){
        super('footer');
        this.setText(text);
    }
}


class List extends Element {
    constructor(tag = 'ul'){
        super(tag);
    }
    addItem(text){
        let i = new ListItem(text);
        this.addElement(i);
        return i;
    }
    addItems(items){
        for(var k in items) {
            this.addItem(items[k]);
        }
        return this;
    }
}


class ListItem extends List {
    constructor(text){
        super('li');
        this.setText(text);
    }
}

class Menu extends Element {
    constructor(tag = 'ul'){
        super(tag);
    }
    addItem(title,link='#'){
        let i = new MenuItem(title,link);
        this.addElement(i);
        return i;
    }
    addItems(links){
        for(var k in links) {
            this.addItem(k,links[k]);
         }
         return this;
    }
    createSubMenu(text){
        let i = this.addItem(text);
        this.addElement(i);
        let s = new Menu();
        s.setClass('sub-menu');
        i.addElement(s);
        return s;        
    }
}

class MenuItem extends Menu {
    constructor(text,link){
        super('li');
        this.addLink(text,link);
    }
}


class Panel extends Div {    
    constructor(nclass = 'Panel'){
        super();
        this.setClass(nclass);
    }

    createHeader(text=''){
        let c = new Header(text);
        this.addElement(c);
        return c;
    }

    createNav(){
        let n = new Element('nav');        
        n.setClass('menu');
        this.addElement(n);        
        let m = new Menu();
        m.setClass('menu-list');
        n.addElement(m);
        return m;        
    }

    createMenu(){
        let m = new Menu();
        this.addElement(m);
        return m;        
    }

    createSection(text=''){
        let s = new Section(text);
        this.addElement(s);
        return s;
    }

    createFooter(text=''){
        let f = new Footer(text);
        this.addElement(f);
        return f;
    }
    
}



