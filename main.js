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
    var quantity = $('#quantity').val();
    var company = res.Name;
    var price = res.LastPrice;
    var change = res.Change;
    var pChange = res.ChangePercent;
    var arr = [quantity, company, price, change, pChange];
    var $tr = $('<tr></tr>');

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
