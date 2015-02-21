var args = arguments[0] || {};
var p_id = args.p_id || {};
var mod_InventoryProd = Alloy.createCollection('product_inventory');  
var presetSearch = Ti.App.Properties.getString("product_search") || "";
var PRODUCT = require('_products');

var PROD_CONTENTS = require('_product_contents');
PROD_CONTENTS.construct($);
COMMON.construct($);
COMMON.showLoading(); 

setTimeout(function(){  
	if(presetSearch != ""){
		var items = mod_InventoryProd.searchProducts(presetSearch);  
 	}else{
 		var items = mod_InventoryProd.getProductList("all");  
 	}	
 	getProductDetails(items); 
}, 1000); 

var getProductDetails = function(items){
	 
	var imagepath, adImage, row = '', position;
	var my_page = 0;
	   		
	/***Set ads items***/
	var the_view = []; 
	for (var i=0; i< items.length; i++) {
	 
		if(items[i].id == p_id){ 
			position=  items[i].position;
		}
		 
		var scrollView = Ti.UI.createScrollView({
			contentWidth: 'auto',
		  	contentHeight: 'auto', 
		  	height: Ti.UI.SIZE,
		  	width: '100%'
		});
	
		row = $.UI.create('View', {
			classes: ["row"], 
			id:"view"+items[i].position,
			layout: "vertical"
		});
		
		$.item_Details.title=items[i].name;
		
		/***Create and Add Product Image***/
		row.add(PROD_CONTENTS.displayProductImage(items[i].image));
		
		/***Create and Add Header***/
		row.add(PROD_CONTENTS.displayHeader()); 
		
		/***Create and Add Product Contents***/
		row.add(PROD_CONTENTS.displayProductContents(items[i])); 
		
		scrollView.add(row);
		the_view.push(scrollView); 
	} 

	var scrollableView = Ti.UI.createScrollableView({
		  id: "scrollableView",
		  views:the_view,
		  showPagingControl:false
	});
	COMMON.hideLoading();
	$.item_Details.add(scrollableView);
 
	scrollableView.scrollToView(position, true);  
};

function goBack(){
	DRAWER.navigation("inventory",1);
}