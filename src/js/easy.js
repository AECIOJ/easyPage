window.onload = function() {
    var p = new Panel();
    initPage(p);
    p.show();
};


function empty(str){
    return (str === "");
}

class HElement {

    constructor(vtag){
        this.e = document.createElement(vtag);        
    }

    getElement(){
        return this.e;
    }

    setClass(c){
        this.e.className = c ;
    }

    getClass(){
        return this.e.className;
    }
    
    setID(i){
        this.e.id = i ;
    }

    getID(){
        return this.e.id;
    }
    
    setName(n){
        this.e.name = n ;
    }

    getName(){
        return this.e.name;
    }

    setType(t){
        this.e.type = t ;
    }
    
    setValue(v){
        this.e.value = v ;
    }

    setText(t){
        this.e.innerHTML = t;
    }

    setAttrib(atr,val=''){
        if (empty(val))
            this.e.removeAttribute(atr);
        else
            this.e.setAttribute(atr,val);    
    }

    addAttrib(atr){
        this.e.setAttribute(atr);    
    }
  
    
    setEvent(e,f){
        this.e.addEventListener(e, f);
    }
    
    addStyle(s){
        for (let k in s)
           this.e.style[k] = s[k];         
    }
    
    setStyle(s){
        Object.assign(this.e.style,s);
    }

    setTextAlign(a){
        this.e.style.textAlign  = a;
    }
            
    addElement(o){
        this.e.appendChild(o.e);
    }

    insertBefore(o){
        this.e.insertAdjacentElement('beforebegin',o.getElement());
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
        let e = new HElement(vtag);
        this.addElement(e);
        return e;        
    }
    
    createButton(title,eclick){
        let b = new Button(title,eclick);
        this.addElement(b);
        return b;
    }

    createHx(text,x=1){
        let h = new HElement('h'+x);
        h.setText(text);
        this.addElement(h);
        return h;
    }

    show(){
        document.body.appendChild(this.e);
    }
}

class Image extends HElement {    
    constructor(vfile){
        super('img');
        this.e.setAttribute('src',vfile)
        this.setClass('Image');
    }
}

class Button extends HElement {    
    constructor(title,eclick){
        super('button');
        this.setText(title);
        this.setEvent('click',eclick);
    }    
}

class Div extends HElement {    
    constructor(nclass = ''){
        super('div');
        this.setClass(nclass);
    }
}

class Header extends HElement {
    constructor(text = ''){
        super('header');
        this.setText(text);
    }
}

class Section extends HElement {
    constructor(text = ''){
        super('section');
        this.setText(text);
    }
}

class Aside extends HElement {
    constructor(text = ''){
        super('aside');
        this.setText(text);
    }
}

class Article extends HElement {
    constructor(text = ''){
        super('article');
        this.setText(text);
    }
}

class Footer extends HElement {
    constructor(text = ''){
        super('footer');
        this.setText(text);
    }
}


class List extends HElement {
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

class Menu extends HElement {
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
        let n = new HElement('nav');        
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
    
    createForm(action='#'){
        let f = new Form(action);
        this.addElement(f);
        return f;
    }
}


class InputText extends HElement  {
    constructor(name,placeholder=''){
        super('input');
        this.setClass('input');
        this.setType('text');
        this.setName(name);
        this.setID(name);
        this.setPlaceHolder(placeholder);
    }

    createLabel(label){
        let l = new HElement('label');
        l.setAttrib('for',this.getID);
        l.setText(label);
        this.insertBefore(l);
        return l;
    }

    setPlaceHolder(ph){
        if (!empty(ph))
            this.setAttrib('placeholder',ph);
    }
    setRequired(ok=true){
        if (ok)
            this.setAttrib('required','required');
        else        
            this.setAttrib('required');        
    }

}

class Select extends HElement {
    constructor(name){
        super('select');
        this.setName(name);
        this.setID(name);
    }
    addItem(value,text,selected=false){
        let o = new HElement('option');
        o.setValue(value);
        o.setText(text);
        if (selected)
            o.addAttrib('selected');
        this.addElement(o);
        return this;
    }
    addItems(items){
        for(var k in items) {
            this.addItem(k,items[k]);
        }
        return this;
    }
    createLabel(label){
        let l = new HElement('label');
        l.setAttrib('for',this.getID);
        l.setText(label);
        this.insertBefore(l);
        return l;
    }


}

class Form extends HElement {
    constructor(action = '#'){
        super('form');
        this.setClass('form');
        this.setMethod();
    }

    setMethod( m = 'post'){
        this.setAttrib('method',m);
    }

    createInputText(name,placeholder=''){
        let i = new InputText(name);
        if (!empty(placeholder))
            i.setPlaceHolder(placeholder);
        this.addElement(i);
        return i;
    }

    createInputPass(name,placeholder=''){
        let i = new InputText(name);
        i.setType('password');
        if (!empty(placeholder))
            i.setPlaceHolder(placeholder);
        this.addElement(i);
        return i;
    }

    createInputNumber(name,placeholder=''){
        let i = new InputText(name);
        i.setType('number');
        if (!empty(placeholder))
            i.setPlaceHolder(placeholder);
        this.addElement(i);
    }

    createSubmit(name,text='ENVIAR'){
        let b = new InputText(name);
        b.setType('submit');      
        b.setValue(text);
        this.addElement(b);        
        return b;
    }

    createSelect(name){
        let s = new Select(name);
        this.addElement(s);
        return s;
    }

}

