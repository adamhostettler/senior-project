var app = angular.module("cms", ["firebase"]);
//database for the layout
var storeid = "411test";

var db = new Firebase("https://fiery-fire-7623.firebaseio.com/storeid=" + storeid + "/layout/");
var db2 = new Firebase("https://fiery-fire-7623.firebaseio.com/storeid=" + storeid + "/content/")
//databases for each day in the specials tab
var dealRefmon = new Firebase("https://fiery-fire-7623.firebaseio.com/storeid=" + storeid + "/deals/monday");
var dealReftue = new Firebase("https://fiery-fire-7623.firebaseio.com/storeid=" + storeid + "/deals/tuesday");
var dealRefwed = new Firebase("https://fiery-fire-7623.firebaseio.com/storeid=" + storeid + "/deals/wednesday");
var dealRefthr = new Firebase("https://fiery-fire-7623.firebaseio.com/storeid=" + storeid + "/deals/thursday");
var dealReffri = new Firebase("https://fiery-fire-7623.firebaseio.com/storeid=" + storeid + "/deals/friday");
var dealRefsat = new Firebase("https://fiery-fire-7623.firebaseio.com/storeid=" + storeid + "/deals/saturday");
var dealRefsun = new Firebase("https://fiery-fire-7623.firebaseio.com/storeid=" + storeid + "/deals/sunday");
//controller for layout
function layoutController($scope, $firebase){
  //link scope and database
  $scope.database = $firebase(db);
  $scope.database2 = $firebase(db2);
}
function contentController($scope, $firebase){
  $scope.database2 = $firebase(db2);
  var header_line1ref = new Firebase(db2 + '/header_line1');
  header_line1ref.on('value', function(dataSnapshot) {
    var header_line1val = dataSnapshot.val();
    document.getElementById('header_line1').innerHTML = header_line1val;
  });
  var header_line2ref = new Firebase(db2 + '/header_line2');
  header_line2ref.on('value', function(dataSnapshot) {
    var header_line2val = dataSnapshot.val();
    document.getElementById('header_line2').innerHTML = header_line2val;
  });
  var intro_titleref = new Firebase(db2 + '/intro_title');
  intro_titleref.on('value', function(dataSnapshot) {
    var intro_titleval = dataSnapshot.val();
    document.getElementById('intro_title').innerHTML = intro_titleval;
  });
  var intro_descref = new Firebase(db2 + '/intro_desc');
  intro_descref.on('value', function(dataSnapshot) {
    var intro_descval = dataSnapshot.val();
    document.getElementById('intro_desc').innerHTML = intro_descval;
  });
}
//controllers for each day of the week
function MyControllerMon($scope, $firebase) {
  $scope.level1 = $firebase(dealRefmon);
}
function MyControllerTue($scope, $firebase) {
  $scope.level1 = $firebase(dealReftue);
}
function MyControllerWed($scope, $firebase) {
  $scope.level1 = $firebase(dealRefwed);
}
function MyControllerThr($scope, $firebase) {
  $scope.level1 = $firebase(dealRefthr);
}
function MyControllerFri($scope, $firebase) {
  $scope.level1 = $firebase(dealReffri);
}
function MyControllerSat($scope, $firebase) {
  $scope.level1 = $firebase(dealRefsat);
}
function MyControllerSun($scope, $firebase) {
  $scope.level1 = $firebase(dealRefsun);
}
///////////Menu controller////////
var app = angular.module("myapp", ["firebase"]);
var menuapp = new Firebase("https://fiery-fire-7623.firebaseio.com/storeid="+storeid+"/menu/appetizers");
var menuentree = new Firebase("https://fiery-fire-7623.firebaseio.com/storeid="+storeid+"/menu/entrees");
var menudessert = new Firebase("https://fiery-fire-7623.firebaseio.com/storeid="+storeid+"/menu/desserts");
function MyControllerApps($scope, $firebase) {
  $scope.level1 = $firebase(menuapp);
}
function MyControllerEntrees($scope, $firebase) {
  $scope.level1 = $firebase(menuentree);
}
function MyControllerDesserts($scope, $firebase) {
  $scope.level1 = $firebase(menudessert);
}
