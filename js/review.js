//Initialize Parse
Parse.initialize('obla7Mim9lU8uNAeZqAQLdL5CBGsl9NWbvyxpVT5', '0AwLRhdzdREF2SIsk9ApySV03rEyzgt5uKdAKtq7');

var Review = Parse.Object.extend('Review');

 

//Click event when form is submitted

// function validateForm() {
//     var x = document.forms["myForm"]["fname"].value;
//     if (x == null || x == "") {
//         alert("Name must be filled out");
//         return false;
//     }
// }



var complete = function() {
	var review = new Review();
	
	//Set a property of your new instance equal to data entered
	$(this).find('input').each(function() {
		review.set($(this).attr('id'), $(this).val());
		console.log($(this).attr('id') + " " + $(this).val());
		$(this).val('');
	});

	//Sets property of stars
	var rate = parseInt($("#rate").raty('score'));
	console.log("score is " + rate);
	review.set('rate',rate); 	

	//Save instance back to your data
	review.save(null,{
		success:getData	
	})
	console.log("didnt print");
};

//Function to get data
var getData = function() {

	var query = new Parse.Query(Review);

	query.find({
		success:function(results) {
			buildList(results)
		}
	})


};



 var buildList = function(data) {
	//Empty our ordered list
	$('ol').empty()

	data.forEach(function(d){
		addItem(d);
	})
};

var addItem= function(item) {
	var stars = item.get('rate.raty')
	var title = item.get('title')
	var review = item.get('review')

	//Append statements

	var div = $('<div class="container"> 
		<p>	' + stars + title + </p>
		<p> '+ review + '</p>'
		'<h4> "3 out of 4 found this review helpful"</h4>'
	</div>')


	$('ol').Append(li)

};

// //adds average rating

$(function() {
  getData();  
  $('#rate').raty();
  $('#average').raty({ readOnly: true, score: 3 });
  $('form').submit(function() {
  	complete();
  	return false;
  })
});	


