
//Initialize Parse
Parse.initialize('obla7Mim9lU8uNAeZqAQLdL5CBGsl9NWbvyxpVT5', '0AwLRhdzdREF2SIsk9ApySV03rEyzgt5uKdAKtq7');

var Review = Parse.Object.extend('Review');

var count = 0;
var totalRating = 0;


var complete = function() {
    var review = new Review();

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

    //set rate, upvotes, and downvotes
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
    
    var query = new Parse.Query(Review);   

    //execute query
    query.find({
        success: function(results) {
            buildList(results)
        }
    })
};


var buildList = function(data) {  
    //empty list
    $('#divList').empty()
    data.forEach(function(d){
        addItem(d);
    })
    var averageRating = (totalRating/count)
    $("#average").raty({score: averageRating, readOnly: true});
};

var addItem = function(item) {
    
    //set data from parse query
    var stars = item.get('rate')
    var title = item.get('title')
    var review = item.get('review')
    var upvotes = item.get('upvotes')
    var downvotes = item.get('downvotes')
    var total= upvotes + downvotes
    
    count++;
    totalRating += stars;

    //append new data
    var div = $('<div class="container list"></div>')
    var ratyDiv = $('<span></span>')

    div.append(ratyDiv);

    
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

    //$('divList').append(div)
    dest.click(function() {
        item.destroy({
            success: getData()

        })

    })

    //save data from clicking upvotes and downvotes
    down.click(function(){  
        item.increment('downvotes')
        item.save(null, {
        success: getData
    })
    });

    up.click(function(){
        item.increment('upvotes')
        item.save(null, {
        success: getData
    })
    });

    //sets average rating
       ratyDiv.raty({
        readOnly: true,
        score: stars,
        size: 12
    });

    $('#divList').append(div)

};


$(function() {
    getData()
    $('#rate').raty();
    $('form').submit(function() {
        complete();
        return false;
    })
});