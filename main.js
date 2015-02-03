/*global $: false*/

(function () {
  'use strict';

  var $total = 0,
      $numTotal,
      $form        = $('form'),
      $tbody       = $('#tbody'),
      FIREBASE_URL = 'https://stock-app90210.firebaseio.com';


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

    $tbody.append($tr);
    $('#totalValue').empty().append($numTotal);
  }














  $.get(FIREBASE_URL + '/stocks.json', function (res) {
    Object.keys(res).forEach(function (uuid) {
      addRowToTable(uuid, res[uuid]);
    });
  });

  $tbody.on('click', 'td', function (evt) {
    // this = event.target;
    var $tr  = $(evt.target).closest('tr'),
        uuid = $tr.data('uuid');

    $tr.remove();
    deleteFriendFromDb(uuid);
  });

  $form.submit(function (evt) {
    var $friendName = $('input[name="friendName"]'),
        req         = {name: $friendName.val()};

    evt.preventDefault();

    addFriendToDb(req, function (res) {
      var $tr = $('<tr><td>' + req.name + '</td></tr>');

      $tr.attr('data-uuid', res.name);
      $tbody.append($tr);
    });

    $friendName.val('');
  });

  function addFriendToDb(data, cb) {
    var url  = FIREBASE_URL + '/stocks.json',
        json = JSON.stringify(data);

    $.post(url, json, cb(this));
  }

  function deleteFriendFromDb(uuid) {
    var url = FIREBASE_URL + '/stocks/' + uuid + '.json';
    $.ajax(url, {type: 'DELETE'});
  }

  function addRowToTable(uuid, data) {
    var $tr = $('<tr><td>' + data.name + '</td></tr>');
    $tr.attr('data-uuid', uuid);
    $tbody.append($tr);
  }

















})();
