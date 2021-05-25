//Navegar até a página
_navigateTo('http://rpachallenge.com/assets/rpaStockMarket/index.html#');
//Capturar as informações com base no tipo de tag
$tagsType = ['_heading1','_heading2','_heading3','_heading4','_strong','_cell','_link','_button'];
//looping sobre cada uma das tags
for (var $i = 0; $i < $tagsType.length; $i++)
{
 //Coleciona todos os elementos achados na tela
 $query = _collect($tagsType[$i],'/.*/',_in(_div('center')));
 //Essa array armazenará o conteúdo de cada item para cada tag
 $arrayElementsContent = [];
 //Se a busca for maior que 0
 if($query.length>0)
 {
  //Iteramos sobre cada elemento achado
 for (var $j = 0; $j < $query.length; $j++)
 {
  //Capturamos seu content
  $rawContentElement = _getAttribute($query[$j],'textContent');
  //E verificamos se ele não está vazio e se já não existe dentro da array antes de colocar
  if(isNotEmpty($rawContentElement))
  {
  if(!checkDuplicity($arrayElementsContent,$rawContentElement))
  {
   $arrayElementsContent.push($rawContentElement);
  }
 }
}
//escrevemos um arquivo CSV para cada tag iterada
 _writeFile($arrayElementsContent.toString(), _resolvePath()+'/'+$tagsType[$i]+'.csv');
 $arrayElementsContent.length=0;
 $arrayElementsContent = [];
}
}

//Funcão que checa duplicidade de strings dentro de uma array
function checkDuplicity($cDup_arrayToCheck,$cDup_value){
 $cDup_return = false;
 for($cDup_item in $cDup_arrayToCheck)
 {
  if($cDup_arrayToCheck[$cDup_item]==$cDup_value)
  {
   $cDup_return=true;
   break;
  }
 }
 return $cDup_return;
}

//Função que checa se uma string é vazia ou não.
function isNotEmpty($isnE_string)
{
  if($isnE_string == "" || $isnE_string == null || $isnE_string.length<=0)
  {
    return false;
  }
  else
  {
    return true;
  }
}