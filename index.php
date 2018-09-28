<?php
    include_once "php/easy.php";
?>
<!DOCTYPE HTML>
<html lang=”pt-br”>
    <head>
        <meta charset=”UTF-8”>
        <link rel="stylesheet" type="text/css" href="css/easy.css">
        
        <script type="text/javascript" src="js/easy.js"></script>

        <title>TESTE DO FRAMEWORK EASY</title>
        
        <script  type="text/javascript">
            function teste(){
                alert('oi');
            }    
            
            function foco(){
                var x = this;
                x.style.background = "pink";    
                x.addEventListener('mouseleave', function(){
                    this.style.background = "";                        
                });
            }
            
        </script>    
        
    </head> 
    
    <body>

        <script  type="text/javascript">
            
        let p = new Pagina();
        p.criaCabecalho('TESTE');
        let m = p.criaMenu();
        m.adItem('CADASTRO','cadastro.php');
        m.adItem('COMPRAS','compra.php');
        m.adItem('VENDAS','venda.php');
        m.adItem('FINANCEIRO','financeiro.php');
/*
            e.criaParagrafo('Isto é um teste');

            let b = e.criaBotao("teste",teste);
            b.setEvento('mouseover',foco);
*/    
            p.show();                
var x=5;
            if (x=5){
                alert(x);
            }
            
        </script>    
        
    </body>
</html>