// ==UserScript==
// @name         Hide Undesired IFPA Tournaments
// @version      1
// @grant        none
// @author       Dave Hubbard
// @description  Hides undesired tournaments from the IFPA Calendar.  No one cares about "Get Rated", etc.
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js 
// @include      https://www.ifpapinball.com/calendar/*
// ==/UserScript==

// Add strings here for things you want to hide
undesiredNames = [
  'Get Rated',
  'Ranking : Women',
];

var obs = new MutationObserver((mutations, observer) => {
  $.each(mutations, function(i, mutation) {
    var addedNodes = $(mutation.addedNodes);
    var selector = "div[id^='search_result_']";
    var filteredElements = addedNodes.find(selector).addBack(selector);
    filteredElements.each(function() {
      var tourneyDiv = $(this);
      var tourneyName = tourneyDiv.find('h5 a').text();
      var tourneyRanking = tourneyDiv.find('span.badge').text();
      $.each(undesiredNames, function(i, val) {
        var regex = new RegExp(val, "i");
        if (regex.test(tourneyName) || regex.test(tourneyRanking)) {
          console.log("Hiding tournament: " + tourneyName);
          tourneyDiv.hide();
        }
      });   
    });
  });
});

$(document).ready(function() { 
  console.log('ready');
  for (const name of undesiredNames) {
    console.log("Hiding undesired tournaments matching: " + name);
  }
  
  var searchContainer = $("#results_location")[0];
  obs.observe(searchContainer, { childList: true, subtree: true });
});
