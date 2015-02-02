/*global $: false*/


(function () {
  'use strict';

// init anonymous function.

  $(function () {
    $('#buy').click(buyStock);
      });


  function buyStock(event){
    event.preventDefault();
    var input = $('#symbol').val();
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + input;
    $.get(url, displayStock, 'jsonp');
  }


  function displayStock(res){
    console.log(res)
    var $quantity = $('#quantity').val();
    var $company = $('<td>' + res.Name + '</td>');
    var $price = $('<td>' + res.LastPrice+ '</td>');
    var $change = $('<td>' + res.Change+ '</td>');
    var $pChange = $('<td>' + res.ChangePercent + '</td>');
    var $remove = $('<button id="remove">Remove</button>')
    var $tr = $('<tr></tr>');


    $remove.click(function(){
      $tr.empty();
    });


    $tr.append($quantity);
    $tr.append($company);
    $tr.append($price);
    $tr.append($change);
    $tr.append($pChange);
    $tr.append($remove);

    $('#tbody').append($tr);
  }














//  function createTD(array) {
//    var groupList = [];
//    _.forEach(array, function (team) {
//      var $ol = $('<ol></ol>');
//
//      _.forEach(team, function (teamMember) {
//        var $li =  $('<li>' + teamMember + '</li>');
//        $li.text(teamMember);
//        $ol.append($li);
//      });
//
//      groupList.push($ol);
//
//    });
//
//    return groupList;
//
//  }

})();
