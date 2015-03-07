var args = arguments[0] || {};
var cate = args.category || "";
var mod_category = Alloy.createCollection('category'); 
var cateList  = mod_category.getCategoryByType("product");
var PRODUCT = require('_products');
PRODUCT.construct($);
COMMON.construct($);


var photoLoad;
var prodCateKey;

generateCategoryPicker();

function addProd(){ 
	photoLoad = $.undoPhoto.getVisible(); 
	var imgBlob = RESOURCE.getImageData();
	
	COMMON.showLoading();
	
	var prodName    = $.name.value;
	var prodCode    = $.prodCode.value;
	var prodSet     = $.prodSet.value;
	var prodDepth   = $.prodDepth.value;
	var prodWidth   = $.prodWidth.value;
	var prodHeight  = $.prodHeight.value;
	var prodWeight  = $.prodWeight.value;
	var prodHab 	= $.prodHab.value;
	var prodFab 	= $.prodFab.value;
	var prodCategory 	= prodCateKey;
	
	API.addProduct({
		name : prodName, code : prodCode, set : prodSet,
		category : prodCategory, depth : prodDepth, width : prodWidth,
		height : prodHeight, surface_habitable : prodHab, weight : prodWeight,
		fabric_used : prodFab, photoLoad : photoLoad, photo : imgBlob, type : "products" 
	});
	 
}

function back(e){ 
	DRAWER.navigation("productLists",1,{category: cate});
	$.productFormView.removeEventListener('click', PRODUCT.hideProductFormKeyboard);
};

function hideCategory(e) { 
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){ 
		prodCateKey = e.row.key;
		$.categoryLabel.text = e.selectedValue[0];
		$.categoryLabel.color = "#000000"; 
		$.categoryView.height = 0;
		$.categoryView.setVisible(false);  
		$.categoryPicker.setVisible(false);
	}
	return false;
}

function showCategory() {
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){
		$.categoryView.height = 140;
		$.categoryView.setVisible(true);  
		$.categoryPicker.setVisible(true);
		//$.categoryPicker.setSelectedRow(0,0,true);
	}
	return false;
}

function generateCategoryPicker(){
	
	for(var i = 0 ; i < cateList.length; i++){
		var title = cateList[i].cateValue;
		var key = cateList[i].cateKey;
		var data = Ti.UI.createPickerRow({title:"  "+title ,key:key });  
		$.categoryPicker.add(data);
		if(title == cate){
			$.categoryPicker.setSelectedRow(0,i,false);
		}
		
	}
	
}

function takePhoto(){
	 PRODUCT.loadPhoto();
}
function undoPhoto(){
	$.previewImage.image = "";
	$.undoPhoto.visible = false;
}
$.previewImage.addEventListener('click', takePhoto);
$.undoPhoto.addEventListener('click', undoPhoto);
$.productFormView.addEventListener('click', PRODUCT.hideProductFormKeyboard);
  