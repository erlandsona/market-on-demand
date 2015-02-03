/*global $: false*/

(function () {
  'use strict';

  var $total = 0;
  var $numTotal;

// init anonymous function.

  $(function () {
    $('#buy').click(buyStock);
      });

  function buyStock(event){
    event.preventDefault();
    var input = $('#symbol').val();
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + input;
    $.get(url, displayStock, 'jsonp');
    //  Trying to check that #symbol is a string.
    //
    // if (_.isString(input) === true){
    //   return input.toUpperCase();
    // } else {
    //   return alert('please type a legitimate company symbol:) Thanks!');
    // }
  }

  function displayStock(res){
    var $quantity = $('#quantity').val();
    var $company = $('<td>' + res.Name + '</td>');
    var $purchased = $('<td>' + '{Stored Purchase price}' + '</td>');
    var $currPrice = $('<td>' + res.LastPrice+ '</td>');
    var $change = $('<td>' + res.Change+ '</td>');
    var $pChange = $('<td>' + res.ChangePercent + '</td>');
    var $remove = $('<button id="remove">Remove</button>');
    var $tr = $('<tr></tr>');

    $total += ($quantity * (res.LastPrice));
    $total = Math.round($total*100)/100;
    $numTotal = $('<h2> TOTAL: $' + $total +  '</h2>');

    $remove.click(function(){
      $total -= ($quantity * (res.LastPrice));
      $total = Math.round($total*100)/100;
      $numTotal = $('<h2> TOTAL: $' + $total +  '</h2>');
      $tr.empty();
      $('#totalValue').empty().append($numTotal);
    });

    $tr.append($quantity);
    $tr.append($company);
    $tr.append($purchased);
    $tr.append($currPrice);
    $tr.append($change);
    $tr.append($pChange);
    $tr.append($remove);

    $('#tbody').append($tr);
    $('#totalValue').empty().append($numTotal);
  }
})();
