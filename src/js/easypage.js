


/*--------------------------------FUNCTIONS-------------------------------*/

function empty(str){
    return (str === "");
}

function isArray(o){
    return Array.isArray(o)
}


var lastVisible;

function swapVisible(id){
    if (lastVisible){
        lastVisible.style.display = 'none';
    }
    let e = document.getElementById(id);
    if (e) 
        e.style.display =  'block';    
    lastVisible = e;
}


/*----------------------------HTML ELEMENTS-------------------------------*/


class HElement {

    constructor(ntag,nclass=''){
        this.tagname = ntag;
        this.e = document.createElement(this.getTagName());        
        this.setClass(nclass);
        this.elements = [];
        this.fbody = [];
        this.onShow = '';
    }

    getTagName(){
        return this.tagname;
    }    

    getElement(){
        return this.e;
    }

    insertBodyElement(nid){
        if (nid.indexOf('#') == 0)            
            nid = nid.substr(1);
        this.fbody.push(nid);
    }

    insertBodyElements(idlist){
        for (let i = 0; i < idlist.length; i++)
            this.insertBodyElement( idlist[i] );
    }

    setClass(c){
        if ( empty(c) )
            this.setAttrib('class');
        else
            this.e.className = c ;
        return this;
    }

    getClass(){
        return this.e.className;
    }
    
    setID(i){
        this.e.id = i ;
        return this;
    }

    getID(){
        return this.e.id;
    }
    
    setName(n){
        this.e.name = n ;
        return this;
    }

    getName(){
        return this.e.name;
    }

    setType(t){
        this.e.type = t ;
        return this;
    }
    
    setValue(v){
        this.e.value = v ;
        return this;
    }

    setText(t){
        this.e.innerHTML = t;
        return this;
    }

    setAttrib(atr,val=''){
        if (empty(val))
            this.e.removeAttribute(atr);
        else
            this.e.setAttribute(atr,val);    
        return this;
    }

    addAttrib(atr){
        this.e.setAttribute(atr,'');    
        return this;
    }
  
    
    setEvent(e,f){
        this.e.addEventListener(e, f);
        return this;
    }
    
    addStyle(s){
        for (let k in s)
           this.e.style[k] = s[k];         
        return this;
    }
    
    setStyle(s){
        Object.assign(this.e.style,s);
        return this;
    }

    setTextAlign(a){
        this.e.style.textAlign  = a;
        return this;
    }
            
    addElement(o){
        this.e.appendChild(o.e);
        this.elements.push(o);
        return this;
    }

    insertBefore(o){
        this.e.insertAdjacentElement('beforebegin',o.getElement());
        return this;
    }

    addLink(title,link='#'){
        let a = this.createElement('a');
        a.setText(title);
        a.setAttrib('href', link);
        this.addElement(a);
        if (link.indexOf('#') == 0){            
            let x = link.substr(1);
            if (!empty(x)){
                a.setAttrib('onclick',"swapVisible('"+x+"')");            
            }
        }
        return a;        
    }
    
    addImage(vfile){
        let i = document.createElement('img');
        i.setAttribute('src',vfile);
        this.addElement(i);
        return i;
    }

    createElement(vtag,nclass=''){
        let e = new HElement(vtag,nclass);
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

    createP(text){
        let p = new HElement('p');
        p.setText(text);
        this.addElement(p);
        return p;
    }

    show(){
        function getbody(o){
            o.fbody.forEach(function(i) {
                let x = document.getElementById(i);
                if (x) o.e.appendChild(x);
            });
            o.elements.forEach(function(f) {
                getbody(f);
            });            
        }
        getbody(this);
        document.body.appendChild(this.e);
    }
}

class Image extends HElement {    
    constructor(vfile){
        super('img','image');
        this.e.setAttribute('src',vfile)
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
        super('div',nclass);
    }
}

class Header extends HElement {
    constructor(text = ''){
        super('header');
        this.setText(text);
    }
}

class Section extends HElement {
    constructor(nid=''){
        super('section');
        if (!empty(nid))
            this.setID(nid);
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
        for (let i = 0; i < items.length; i++) 
            this.addItem( items[i] );
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
    constructor(nclass = ''){
        super('ul',nclass);
        this.master = this;
    }

    addItem(title,link='#'){
        let i = new MenuItem(title,link);
        if (this.menu)            
            this.menu.addElement(i);    
        else
            this.addElement(i);
        return i;
    }
    addItems(items){
        if (isArray(items)) {
            for (let i = 0; i < items.length; i++) 
                this.addItem( items[i] );
        } else {
            for(var k in items) 
                this.addItem(k,items[k]);
        }
        return this;
    }    
    createDiv(nclass){
        let d = new Div(nclass);
        this.addElement(d);
        return d;
    }
}

class Nav extends Menu {
    constructor(nclass = 'nav'){
        super(nclass);
        this.menu = new Menu();
        this.addElement(this.menu);
        this.menu.master = this;
    }
    getTagName(){
        return 'nav';
    }
}

class NavTab extends Menu {
    constructor(nclass='navtab'){
        super(nclass);
        this.tabcount = 0;
    }
    getTagName(){
        return 'div';
    }
    addItem(title){
        this.tabcount+=1;
        let nid ='tab'+this.tabcount;
        let t = new Radio('tabs',nid);
        this.addElement(t);
        t.createLabel(title);
        return t;
    }
}

class MenuItem extends HElement {
    constructor(text,link='#'){
        super('li');
        if (empty(link))
            this.setText(text);
        else
            this.addLink(text,link);
    }
    createSubMenu(text){
        let s = new Menu('sub-menu');
        this.addElement(s);
        return s;        
    }
}

class Page extends Div {    
    constructor(nclass = 'page'){
        super(nclass);
        this.sectioncount = 0;
    }

    createHeader(text=''){
        let c = new Header(text);
        this.addElement(c);
        return c;
    }

    createNav(){
        let n = new Nav();
        this.addElement(n);
        return n;        
    }

    createNavTab(){
        let n = new NavTab();
        this.addElement(n);
        return n;        
    }
   
    createMenu(){
        let m = new Menu();
        this.addElement(m);
        return m;        
    }

    createSection(){
        this.sectioncount+=1;
        let nid ='section'+this.sectioncount;
        let s = new Section(nid);
        this.addElement(s);
        return s;
    }

    createDiv(nclass){
        let d = new Div(nclass);
        this.addElement(d);
        return d;
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

class Input extends HElement  {
    constructor(name){
        super('input');
        this.setName(name);
    }   
    createLabel(label){
        let e = this.getElement();
        let l = new HElement('label');
        l.setAttrib('for',this.getID() );
        l.setText(label);
        if (this instanceof Radio)
            e.parentNode.appendChild(l.e);
        else
            this.insertBefore(l);
        return this;
    }
}

class Radio extends Input {
    constructor(name,nid){
        super(name);
        this.setType('radio');
        this.setID(nid);
    }   
    setChecked(ok=true){
        if (ok)
            this.addAttrib('checked');
        else
            this.setAttrib('checked');
        return this;
    }
}



class InputText extends Input  {
    constructor(name,placeholder=''){
        super(name,name);
        this.setType('text');
        this.setClass('input');
        this.setPlaceHolder(placeholder);
    }

    setPlaceHolder(ph){
        if (!empty(ph))
            this.setAttrib('placeholder',ph);
            return this;
    }

    setRequired(){
        this.addAttrib('required');        
        return this;
    }
    setAutoFocus(){
        this.addAttrib('autofocus');
        return this;
    }

    setMaxLength(len){
        this.setAttrib('maxlength',len);
        return this;
    }

    setMask(mask){
        this.setAttrib('mask',mask);
        let e = this.getElement();
        this.setMaxLength(mask.length);
        e.onkeypress = function(e){ return validateMask(e?e:event); };          
        return this;
    }

    setType(type){
        super.setType(type);
        switch(type.toLowerCase()){
            case 'cpf' : this.setMask('999.999.999-99');this.setValidate('isCpf','Cpf Inválido');break;           
            case 'cnpj': this.setMask('99.999.999/9999-99');this.setValidate('isCnpj','Cnpj Inválido');break;           
            case 'fone': this.setMask('(00) 09999.9999');break;           
            case 'placa': this.setMask('CCC-9999');break;           
        }
        return this;
    }

    setValidate(func,msg='Entrada Inválida'){
        this.setAttrib('oninput','validate(this)');
        this.setAttrib('funval',func);
        this.setAttrib('msgerro',msg);
        return this;
    }
}

class Select extends Input {
    constructor(name){
        super(name);
    }
    getTagName(){
        return 'select';
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
    setRequired(ok=true){
        if (ok)
            this.setAttrib('required','required');
        else        
            this.setAttrib('required');
        return this;        
    }

    setAutoFocus(){
        this.addAttrib('autofocus');
        return this;
    }
}


/*--------------------------------FORMS-------------------------------*/


const IsIE = (navigator.appName.toLowerCase().indexOf('microsoft')!=-1);
const LETTERS = /[A-z]/;
const NUMBERS = /[0-9]/;
const SYMBOLS = '.,()-:/';

function selectInput(input){
    if (IsIE)
        return document.selection.createRange().text;
    else
        return (input.value).substr(input.selectionStart, (input.selectionEnd - input.selectionStart));
}

function validate(input){
    let f = input.getAttribute('funval')+"('"+input.value+"')";
    input.setCustomValidity(eval(f)?'':input.getAttribute('msgerro'));
}

function validateMask(e){
    let key = IsIE ? event.keyCode : e.which;
    let input =  IsIE ? event.srcElement : e.target;
    let readonly = input.getAttribute('readonly');
    if (readonly) return false;
    
    let mask = input.getAttribute('mask');                       
    let text = selectInput(input);
    if (text.length > 0 && key != 0){
        input.value = "";
        return true;
    }
    if (key < 32) return true;                     
    
    let k = String.fromCharCode(key);           

    var v = input.value;                       
    
    let p = v.length; 
    if (p >= mask.length) 
        return false;

    var m = mask.substr(p,1);       
    
    while (SYMBOLS.indexOf(m) != -1) {  
        v += m;                     
        p = v.length;
        if (p >= mask.length) 
            return false;
        m = mask.substr(p,1);
    }        
       
   
    switch (m) {            
        case '9': if (k.search(NUMBERS) == -1) return false;break;
        case 'c':
        case 'C': if (k.search(LETTERS) == -1) return false;break;
        default : return false; break;
    } 
    
    input.value = v;

    return true;

}



class Form extends HElement {
    constructor(action = '#'){
        super('form','form');
        this.setPost();
    }

    setPost(ok=true){
        if (ok)
            this.setAttrib('method','post');
        else
            this.setAttrib('method','get');
        return this;
    }

    setTitle(text,x=1){
        let h = this.createHx(text,x);
        h.setClass('title');
        return this;
    }

    setNoValidate(){
        this.addAttrib('novalidate');
        return this;
    }

    createInputText(name,placeholder=''){
        let i = new InputText(name);
        if (!empty(placeholder))
            i.setPlaceHolder(placeholder);
        this.addElement(i);
        return i;
    }

    createInputType(type,name,placeholder=''){
        let i = this.createInputText(name,placeholder);
        i.setType(type);
        return i;
    }

    createSelect(name,list=''){
        let s = new Select(name);
        if (!empty(list))
            s.addItems(list);
        this.addElement(s);
        return s;
    }

    createFieldset(title){
        let f = new HElement('fieldset');
        let l = new HElement('legend');
        l.setText(title);
        f.addElement(l);
        this.addElement(f);
        return f;
    }

    createSubmit(name,text=''){
        let b = new InputText(name);
        b.setType('submit');
        if (!empty(text))      
            b.setValue(text);
        this.addElement(b);        
        return b;
    }
}


/*----------------------------- PAGE INSTANTIATION -------------------------------*/


var page = new Page();
document.addEventListener("DOMContentLoaded", function(event) {
    page.show();
});
