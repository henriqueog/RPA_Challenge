var $fileExcelDownload;
var $xlsx;
var $conn;
var $rst;
var $rstCount;
var $query;

function setFileExcel($seFEx_filePath){
 $fileExcelDownload= new java.io.File($seFEx_filePath);
 readandPrepareExcel();
}

function readandPrepareExcel(){
 $xlsx = new com.codoid.products.fillo.Fillo();
 $conn = $xlsx.getConnection($fileExcelDownload);
}

function executeQueryToExcelFile($eQuExF_query){
 $query = new java.lang.String($eQuExF_query);
 $rst = com.codoid.products.fillo.Recordset($conn.executeQuery($query));
 $rstCount = $rst.getCount();
}

function moveToNextLineRstRequest(){
 $rst.moveNext();
}

function getValueRstRequestColumn($gVRSTRe_fieldName){
 var $localFieldName = new java.lang.String($gVRSTRe_fieldName);
 var $returnAsString = new java.lang.String($rst.getField($localFieldName));
 return $returnAsString;
}

function getHeaderSheet(){
 var $fieldNames = new java.util.ArrayList();
 var $fieldToSahi = new java.lang.String();
 $fieldNames = $rst.getFieldNames();

 for(var $i=0; $i < $fieldNames.size();$i++){
  $field = new java.lang.String($fieldNames.get($i));
  $fieldToSahi +=$field+($i != $fieldNames.size()?',':'');
 }
 return $fieldToSahi;
}

function getCountRequestQuery(){
 return $rstCount;
}