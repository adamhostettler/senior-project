
var app = angular.module("myapp", ["firebase"]);
var menuapp = new Firebase("https://fiery-fire-7623.firebaseio.com/Store1/menu/appetizers");
var menuentree = new Firebase("https://fiery-fire-7623.firebaseio.com/Store1/menu/entrees");
var menudessert = new Firebase("https://fiery-fire-7623.firebaseio.com/Store1/menu/desserts");


function MyControllerApps($scope, $firebase) {

  $scope.level1 = $firebase(menuapp);
  $scope.addDeal = function() {


    var appsub = new Firebase("https://fiery-fire-7623.firebaseio.com/Store1/menu/appetizers/" + $scope.itemname)


    $scope.level2 = $firebase(appsub)

    $scope.level2.$set({Itemname: $scope.itemname, Price: $scope.itemprice, Desc: $scope.itemdesc});


    $scope.itemname = "";
    $scope.itemprice = "";
    $scope.itemdesc = "";
  };

  $scope.delPerson = function(id){
      var delmenu = new Firebase('https://fiery-fire-7623.firebaseio.com/Store1/menu/appetizers/' + id)
      delmenu.remove();
  };

}


function MyControllerEntrees($scope, $firebase) {
  $scope.level1 = $firebase(menuentree);
  $scope.addDeal = function() {


    var entreesub = new Firebase("https://fiery-fire-7623.firebaseio.com/Store1/menu/entrees/" + $scope.itemname)


    $scope.level2 = $firebase(entreesub)

    $scope.level2.$set({Itemname: $scope.itemname, Price: $scope.itemprice, Desc: $scope.itemdesc});


    $scope.itemname = "";
    $scope.itemprice = "";
    $scope.itemdesc = "";
  };

  $scope.delPerson = function(id){
      var delmenu = new Firebase('https://fiery-fire-7623.firebaseio.com/Store1/menu/entrees/' + id)
      delmenu.remove();
  };


}



function MyControllerDesserts($scope, $firebase) {
  $scope.level1 = $firebase(menudessert);
  $scope.addDeal = function() {


    var dessertsub = new Firebase("https://fiery-fire-7623.firebaseio.com/Store1/menu/desserts/" + $scope.itemname)


    $scope.level2 = $firebase(dessertsub)

    $scope.level2.$set({Itemname: $scope.itemname, Price: $scope.itemprice, Desc: $scope.itemdesc});


    $scope.itemname = "";
    $scope.itemprice = "";
    $scope.itemdesc = "";
  };

  $scope.delPerson = function(id){
      var delmenu = new Firebase('https://fiery-fire-7623.firebaseio.com/Store1/menu/desserts/' + id)
      delmenu.remove();
  };


}
