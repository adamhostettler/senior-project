var app = angular.module("cms", ["firebase"]);


var firebaseemail = document.cookie;
var  user = firebaseemail.split(";")[0];
//database for the layout
//var db = new Firebase("https://resplendent-fire-5189.firebaseio.com/merchant1/layout/");
//var db2 = new Firebase("https://resplendent-fire-5189.firebaseio.com/merchant1/content/");

var db = new Firebase("https://fiery-fire-7623.firebaseio.com/"+user+"/layout");
var db2 = new Firebase("https://fiery-fire-7623.firebaseio.com/"+user+"/content");



//databases for each day in the specials tab
var dealRefmon = new Firebase("https://fiery-fire-7623.firebaseio.com/"+user+"/deals/monday");
var dealReftue = new Firebase("https://fiery-fire-7623.firebaseio.com/"+user+"/deals/tuesday");
var dealRefwed = new Firebase("https://fiery-fire-7623.firebaseio.com/"+user+"/deals/wednesday");
var dealRefthr = new Firebase("https://fiery-fire-7623.firebaseio.com/"+user+"/deals/thursday");
var dealReffri = new Firebase("https://fiery-fire-7623.firebaseio.com/"+user+"/deals/friday");
var dealRefsat = new Firebase("https://fiery-fire-7623.firebaseio.com/"+user+"/deals/saturday");
var dealRefsun = new Firebase("https://fiery-fire-7623.firebaseio.com/"+user+"/deals/sunday");


//database to check if user exsits
var checkifexists = new Firebase("https://fiery-fire-7623.firebaseio.com/"+user);


var layoutbuilderfb = new Firebase("https://fiery-fire-7623.firebaseio.com/"+user+"/layout");


window.onload = function(){
  createcontentcontroller()
};



//first login detection and placeholder generationS
function createcontentcontroller(){


  checkifexists.child('content').once('value', function(snapshot) {
     if (snapshot.val() === null) {
       window.alert("First login, generating placeholder values. Click edit to customize!");

       var layoutbuiler = new Firebase("https://fiery-fire-7623.firebaseio.com/"+user+"/layout");
       var contentbuilder = new Firebase("https://fiery-fire-7623.firebaseio.com/"+user+"/content");

       contentbuilder.set({header_line1: "Store Name", header_line2: "Hours", intro_title: "A heading for your intro paragraph", intro_desc: "Short intro paragraph", footer_copy: "Copyright 2014, your business name", footer_contact: "Phone number, address, email goes here"});
       layoutbuiler.set({deals: true, facebook: false, footer: true, googlep: false, header: true, intro: true, menu: true, social: false, twitter: false});

     } else {
       //window.alert("values exsits, not first login");
     }
  });
}






//controller for layout
function layoutController($scope, $firebase){
  //link scope and database
  $scope.database = $firebase(db);
  $scope.database2 = $firebase(db2);
  //get each checkbox value and set to vars for each module
  $scope.setModules = function(){
    var deals_data = document.getElementById('deals').checked;
    var facebook_data = document.getElementById('facebook').checked;
    var footer_data = document.getElementById('footer').checked;
    var googlep_data = document.getElementById('googlep').checked;
    var header_data = document.getElementById('header').checked;
    var intro_data = document.getElementById('intro').checked;
    var menu_data = document.getElementById('menu').checked;
    var social_data = document.getElementById('social').checked;
    var twitter_data = document.getElementById('twitter').checked;
    //use set method to enter data to database, overwriting existing data
    $scope.database.$set({deals: deals_data, facebook: facebook_data, footer: footer_data, googlep: googlep_data, header: header_data, intro: intro_data, menu: menu_data, social: social_data, twitter: twitter_data});

    var header_line1data = document.getElementById('header_line1tb').value;
    var header_line2data = document.getElementById('header_line2tb').value;
    var intro_titledata = document.getElementById('intro_titletb').value;
    var intro_descdata = document.getElementById('intro_desctb').value;
    var footer_copydata = document.getElementById('footer_copytb').value;
    var footer_contactdata = document.getElementById('footer_contacttb').value;

    $scope.database2.$set({header_line1: header_line1data, header_line2: header_line2data, intro_title: intro_titledata, intro_desc: intro_descdata, footer_copy: footer_copydata, footer_contact: footer_contactdata});

  };
}

function contentController($scope, $firebase){
  $scope.database2 = $firebase(db2);

  var header_line1ref = new Firebase(db2 + '/header_line1');
  header_line1ref.on('value', function(dataSnapshot) {
    var header_line1val = dataSnapshot.val();
    document.getElementById('header_line1').innerHTML = header_line1val;
    document.getElementById('header_line1tb').value = header_line1val;
  });

  var header_line2ref = new Firebase(db2 + '/header_line2');
  header_line2ref.on('value', function(dataSnapshot) {
    var header_line2val = dataSnapshot.val();
    document.getElementById('header_line2').innerHTML = header_line2val;
    document.getElementById('header_line2tb').value = header_line2val;
  });

  var intro_titleref = new Firebase(db2 + '/intro_title');
  intro_titleref.on('value', function(dataSnapshot) {
    var intro_titleval = dataSnapshot.val();
    document.getElementById('intro_title').innerHTML = intro_titleval;
    document.getElementById('intro_titletb').value = intro_titleval;
  });

  var intro_descref = new Firebase(db2 + '/intro_desc');
  intro_descref.on('value', function(dataSnapshot) {
    var intro_descval = dataSnapshot.val();
    document.getElementById('intro_desc').innerHTML = intro_descval;
    document.getElementById('intro_desctb').value = intro_descval;
  });

  var footer_copyref = new Firebase(db2 + '/footer_copy');
  footer_copyref.on('value', function(dataSnapshot) {
    var footer_copyval = dataSnapshot.val();
    document.getElementById('footer_copy').innerHTML = footer_copyval;
    document.getElementById('footer_copytb').value = footer_copyval;
  });

  var footer_contactref = new Firebase(db2 + '/footer_contact');
  footer_contactref.on('value', function(dataSnapshot) {
    var footer_contactval = dataSnapshot.val();
    document.getElementById('footer_contact').innerHTML = footer_contactval;
    document.getElementById('footer_contacttb').value = footer_contactval;
  });

  // $scope.setText = function(){
  //   var newContentElem = $(this).attr('data-content');
  //   var newContentElemText = $(elemToEditContent).val();
  //   $scope.database2.$set({});
  // };
}

//controllers for each day of the week
function MyControllerMon($scope, $firebase) {
  $scope.level1 = $firebase(dealRefmon);
  $scope.addDeal = function() {
    $scope.level1.$add( $scope.newDeal);
    $scope.newDeal = "";
  };
  $scope.delPerson = function(id){
  		var itemRef = new Firebase(dealRefmon + '/' + id);
  		itemRef.remove();
  };
}
function MyControllerTue($scope, $firebase) {
  $scope.level1 = $firebase(dealReftue);
  $scope.addDeal = function() {
    $scope.level1.$add( $scope.newDeal);
    $scope.newDeal = "";
  };
  $scope.delPerson = function(id){
  		var itemRef = new Firebase(dealReftue + '/' + id);
  		itemRef.remove();
  };
}
function MyControllerWed($scope, $firebase) {
  $scope.level1 = $firebase(dealRefwed);
  $scope.addDeal = function() {
    $scope.level1.$add( $scope.newDeal);
    $scope.newDeal = "";
  };
  $scope.delPerson = function(id){
  		var itemRef = new Firebase(dealRefwed + '/' + id);
  		itemRef.remove();
  };
}
function MyControllerThr($scope, $firebase) {
  $scope.level1 = $firebase(dealRefthr);
  $scope.addDeal = function() {
    $scope.level1.$add( $scope.newDeal);
    $scope.newDeal = "";
  };
  $scope.delPerson = function(id){
  		var itemRef = new Firebase(dealRefthr + '/' + id);
  		itemRef.remove();
  };
}
function MyControllerFri($scope, $firebase) {
  $scope.level1 = $firebase(dealReffri);
  $scope.addDeal = function() {
    $scope.level1.$add( $scope.newDeal);
    $scope.newDeal = "";
  };
  $scope.delPerson = function(id){
  		var itemRef = new Firebase(dealReffri + '/' + id);
  		itemRef.remove();
  };
}
function MyControllerSat($scope, $firebase) {
  $scope.level1 = $firebase(dealRefsat);
  $scope.addDeal = function() {
    $scope.level1.$add( $scope.newDeal);
    $scope.newDeal = "";
  };
  $scope.delPerson = function(id){
  		var itemRef = new Firebase(dealRefsat + '/' + id);
  		itemRef.remove();
  };
}
function MyControllerSun($scope, $firebase) {
  $scope.level1 = $firebase(dealRefsun);
  $scope.addDeal = function() {
    $scope.level1.$add( $scope.newDeal);
    $scope.newDeal = "";
  };
  $scope.delPerson = function(id){
  		var itemRef = new Firebase(dealRefsun + '/' + id);
  		itemRef.remove();
  };
}



///////////Menu controller////////




var app = angular.module("myapp", ["firebase"]);
var menuapp = new Firebase("https://fiery-fire-7623.firebaseio.com/"+user+"/menu/appetizers");
var menuentree = new Firebase("https://fiery-fire-7623.firebaseio.com/"+user+"/menu/entrees");
var menudessert = new Firebase("https://fiery-fire-7623.firebaseio.com/"+user+"/menu/desserts");


function MyControllerApps($scope, $firebase) {

  $scope.level1 = $firebase(menuapp);
  $scope.addDeal = function() {


    var appsub = new Firebase("https://fiery-fire-7623.firebaseio.com/"+user+"/menu/appetizers/" + $scope.itemname)


    $scope.level2 = $firebase(appsub)

    $scope.level2.$set({Itemname: $scope.itemname, Price: $scope.itemprice, Desc: $scope.itemdesc});


    $scope.itemname = "";
    $scope.itemprice = "";
    $scope.itemdesc = "";
  };

  $scope.delPerson = function(id){
      var delmenu = new Firebase('https://fiery-fire-7623.firebaseio.com/'+user+'/menu/appetizers/' + id)
      delmenu.remove();
  };

}


function MyControllerEntrees($scope, $firebase) {
  $scope.level1 = $firebase(menuentree);
  $scope.addDeal = function() {


    var entreesub = new Firebase("https://fiery-fire-7623.firebaseio.com/"+user+"/menu/entrees/" + $scope.itemname)


    $scope.level2 = $firebase(entreesub)

    $scope.level2.$set({Itemname: $scope.itemname, Price: $scope.itemprice, Desc: $scope.itemdesc});


    $scope.itemname = "";
    $scope.itemprice = "";
    $scope.itemdesc = "";
  };

  $scope.delPerson = function(id){
      var delmenu = new Firebase('https://fiery-fire-7623.firebaseio.com/'+user+'/menu/entrees/' + id)
      delmenu.remove();
  };


}



function MyControllerDesserts($scope, $firebase) {
  $scope.level1 = $firebase(menudessert);
  $scope.addDeal = function() {


    var dessertsub = new Firebase("https://fiery-fire-7623.firebaseio.com/"+user+"/menu/desserts/" + $scope.itemname)


    $scope.level2 = $firebase(dessertsub)

    $scope.level2.$set({Itemname: $scope.itemname, Price: $scope.itemprice, Desc: $scope.itemdesc});


    $scope.itemname = "";
    $scope.itemprice = "";
    $scope.itemdesc = "";
  };

  $scope.delPerson = function(id){
      var delmenu = new Firebase('https://fiery-fire-7623.firebaseio.com/'+user+'/menu/desserts/' + id)
      delmenu.remove();
  };


}
