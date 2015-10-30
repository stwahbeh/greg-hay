
//Initialize Parse
Parse.initialize('obla7Mim9lU8uNAeZqAQLdL5CBGsl9NWbvyxpVT5', '0AwLRhdzdREF2SIsk9ApySV03rEyzgt5uKdAKtq7');

var Review = Parse.Object.extend('Review');

var count = 0;
var totalRating = 0;

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
    //console.log("1");
    //Set a property of your new instance equal to data entered
    $('form').find('input').each(function() {
        review.set($(this).attr('id'), $(this).val());
        $(this).val('');
    });

    //Sets property of stars
    var rate = parseInt($("#rate").raty('score'))
    if(rate == null){
        rate = 0;
    }

    review.set('rate', rate);
    $('#rate').raty({score:0});

    review.set('upvotes', 0);
    review.set('downvotes', 0);

    count++;
    totalRating += rate;


    //Save instance back to your data
    review.save(null, {
        success: getData
    })
    
   

};

//Function to get data
var getData = function() {
    //console.log("2");
    var query = new Parse.Query(Review);   


    query.find({
        success: function(results) {
            buildList(results)
        }
    })
};


var buildList = function(data) {  
    $('.list').empty()
    data.forEach(function(d){
        addItem(d);
    })
    var averageRating = (totalRating/count)
    $("#average").raty({score: averageRating, readOnly: true});
};

var addItem = function(item) {
   //console.log('7');
    var stars = item.get('rate')
    var title = item.get('title')
    var review = item.get('review')
    var upvotes = item.get('upvotes')
    var downvotes = item.get('downvotes')
    //Append statements
    count++;
    totalRating += stars;

    var ratyDiv = $('<span></span>')

    var div = $('<div class="container list"></div>')
    div.append(ratyDiv);

    var total= upvotes + downvotes
    var body = $('<h3 id="bleh">'+ "  " + title + "  " +'</h3>')
    div.append(body);
    var down = $('<i class="fa fa-thumbs-down clickable"></i>')
    div.append(down);
    var up = $('<i class="fa fa-thumbs-up clickable"></i>')
    div.append(up);
    var rest = $('<h4>' + review + '</h4><h6>' + upvotes + ' out of ' + total +' people found this helpful</h6></div>')
    div.append(rest);
   
    
    var dest = $('<button class="btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span></button>')
    div.append(dest);
    dest.click(function() {
        item.destroy({
            success: getData()

        })

    })
    down.click(function(){
        alert("you clicked");

        item.increment('downvotes')
        item.save(null, {
        success: getData
    })
    });

    up.click(function(){
        alert("you clicked up");

        item.increment('upvotes')
        item.save(null, {
        success: getData
    })
    });

       ratyDiv.raty({
        readOnly: true,
        score: stars,
        size: 12
    });

    $('#reviews').append(div)

};

//I put this here but I dont know why?
//getData()

// //adds average rating

$(function() {
    getData()
    $('#rate').raty();
    $('form').submit(function() {
        complete();
        return false;
    })
});