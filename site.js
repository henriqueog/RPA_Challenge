//importando o arquivo que contém as funções de como manipular planilhas do excel.
_include('excel.js');

//navigate até a página
_navigateTo('http://rpachallenge.com/?lang=EN');

//clicando no botão de start
_click(_submit("Start"));

//setando o arquivo que será lido
setFileExcel('/home/henriqueog/GoogleDrive/sahi_scripts/1_2021/test/challenge.xlsx');
//a ferramenta para leitura permite fazer querys ao estilo SQl dentro da planilha, então faremos uma que pegue todos os registros que não sejam vazios dentro da planilha
executeQueryToExcelFile("Select * from Sheet1 WHERE Address <> ''");

//contamos a quantidade de linhas que a query achou
$countRegistrys = getCountRequestQuery();

//capturamos também os headers da planilha para usarmos dentro do looping abaixo
$fieldNamesToSite =String(getHeaderSheet()).split(',');
$fieldNamesToSiteCrop = $fieldNamesToSite.slice(0,-1);

//Movendo para a primeira Linha dos registros
moveToNextLineRstRequest();

//iremos fazer um looping para que a cada linha, os valores das células em cada coluna seja cadastrado no formulário.
for (var $i = 0; $i < $countRegistrys; $i++) {
 //a cada iteração de uma linha, iremos percorrer cada coluna e capturar seu valor, para preencher cada campo correspondente.
 for ($fieldName in $fieldNamesToSiteCrop) {
  $valueToRegistry = String(getValueRstRequestColumn($fieldNamesToSiteCrop[$fieldName]));
  $fieldNameValue = String($fieldNamesToSiteCrop[$fieldName]);
  _setValue(_textbox('/.*/',_near(_label($fieldNameValue))),$valueToRegistry);
 }
 _click(_submit("Submit"));
 //verificamos se os registros chegaram ao fim
 if($i<$countRegistrys-1){
 moveToNextLineRstRequest();
 }
}