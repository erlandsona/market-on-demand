/*global $: false*/


(function () {
  'use strict';
// init anonymous function.

  $(function () {
    $input = $('input');
    $ul    = $('ul');

    $input.change(getUpdateAndSplit);
    getUpdateAndSplit ();
  });


})();
