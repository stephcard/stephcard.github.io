$(document).ready(function() {
  var squares = [
    "Working in pajamas",
    "Self administered haircut",
    "No toilet paper",
    "Sanitizing everything",
    "Wine every day",
    "Socially distant strolls",
    "Read an actual book",
    "Tipped your delivery person well",
    "Club Quaratine with DJ Nice",
    "Extra dry hands",
    "Everything feels like a meeting",
    "Spring cleaned at least 3x",
    "Secretly enjoying social distancing",
    "IG shadowing boxing class",
    "Made your own mask",
    "Work from home forever!",
    "Wrote a poem to your future self",
    "Anxiety everytime you cough",
    "Played all the video games",
    "Virtual musuem tour",
    "Virtual family meals",
    "WebEx issues",
    "Is this the new normal?",
    "What day is today?",
    "Making baked goods",
    "Finally started your novel",
    "Waiting for government action",
    "Starting a new hobby",
    "Tried to mute kids with remote",
    "Disinfected the disinfectant",
    "Postponed a trip"
  ];

  var isSelected = ['js-square-12'];
  var bingoRow = [];
  var bingoColumn = [];
  var bingoDiagonal = [];
  
  // Function to shuffle/randomize array content
  function shuffle(v) {
    for (var j, x, i = v.length; i; j = parseInt(Math.random() * i, 10), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
  }

  // Function to clear all dabs from the card
  function cleanCard() {
    $('.js-square').removeClass('selected');
    isSelected = [];
    bingoRow = [];
    bingoColumn = [];
    bingoDiagonal = [];
  }

  // Function to fill the card with randomized square entries
  function fillCard() {
    cleanCard();
    shuffle(squares);
    for ( i = 0; i < 25; i++ ) {
      var squareName = squares[i];
      $('#js-square-'+i).html('<span>'+squareName+'</span>');
    }
  }

  // Function to give the customary free center dab
  function freeSquare() {
    isSelected.push('js-square-12');
    $('#js-square-12').addClass('selected').html('<span>Free</span>').attr('title', "");
  }

  // Function to check for multiple values within an array
  function containsAll(a, b) { 
    for (var i = 0 , len = a.length; i < len; i++) {
      if ($.inArray(a[i], b) == -1) return false;
    }
    return true;
  }

  // Function to check for bingos (by searching the isSelected array for the right sequences of cells) then save them to the bingo array
  function bingoCheck() {
    // Check rows (00-04, 05-09, 10-14, 15-19, 20-24)
    for ( i = 0; i < 21; i += 5 ) {
      // If all of a row's cells are in the isSelected array, and if that row isn't already in the bingo array, add it
      if (containsAll(["js-square-"+i,"js-square-"+(i+1),"js-square-"+(i+2),"js-square-"+(i+3),"js-square-"+(i+4)], isSelected)) {
        if ($.inArray("row"+i,bingoRow) == -1) {
          bingoRow.push("row"+i);
          //alert("BINGO! Row!");
        }
      // If all of a row's cells are no longer in the isSelected array, and if that row is already in the bingo array, remove it
      }
      else {
        if ($.inArray("row"+i,bingoRow) !== -1) {
          bingoRow.splice( $.inArray("row"+i,bingoRow), 1 );
        }
      }
    }
    // Check columns (00-20, 01-21, 2-22, 3-23, 4-24)
    for ( i = 0; i < 5; i++ ) {
      // If all of a column's cells are in the isSelected array, and if that column isn't already in the bingo array, add it
      if (containsAll(["js-square-"+i,"js-square-"+(i+5),"js-square-"+(i+10),"js-square-"+(i+15),"js-square-"+(i+20)], isSelected)) {
        if ($.inArray("col"+i,bingoColumn) == -1) {
          bingoColumn.push("col"+i);
          //alert("BINGO! Column!");
        } 
      // If all of a column's cells are no longer in the isSelected array, and if that column is already in the bingo array, remove it
      } else {
        if ($.inArray("col"+i,bingoColumn) !== -1) {
          bingoColumn.splice( $.inArray("col"+i,bingoColumn), 1 );
        }
      }
    }
    // Check forward diagonal (tiles 00, 06, 12, 18, and 24)
    if (containsAll(["js-square-0","js-square-6","js-square-12","js-square-18","js-square-24"], isSelected)) {
      if ($.inArray("diagonal00",bingoDiagonal) == -1) {
        bingoDiagonal.push("diagonal00");
        //alert("Bingo! Diagonal!");
      }
    }
    else {
      if ($.inArray("diagonal00",bingoDiagonal) !== -1) {
        bingoDiagonal.splice( $.inArray("diagonal00",bingoDiagonal), 1 );
      }
    }
    // Check backward diagonal (04, 08, 12, 16, 20)
    if (containsAll(["js-square-4","js-square-8","js-square-12","js-square-16","js-square-20"], isSelected)) {
      if ($.inArray("diagonal04",bingoDiagonal) == -1) {
        bingoDiagonal.push("diagonal04");
        //alert("BINGO! Diagonal!");
      }
    }
    else {
      if ($.inArray("diagonal04",bingoDiagonal) !== -1) {
        bingoDiagonal.splice( $.inArray("diagonal04",bingoDiagonal), 1 );
      }
    }
    // Check for a full bingo of all 12 row/column/diagonal combinations
    if ((bingoRow.length == 5) && (bingoColumn.length == 5) && (bingoDiagonal.length == 2)) {
      alert("BINGO!");
    }
  }

  $('.square').click(function() {
    if ( $.inArray(this.id,isSelected) !== -1 ) {
      isSelected.splice( $.inArray(this.id,isSelected), 1 );
      $(this).removeClass('selected');
    }
    else {
      isSelected.push(this.id);
      $(this).addClass('selected');
    }
    bingoCheck();
  });
  
  fillCard();
  freeSquare();

  $('.callout').click(function() {
    $(this).toggleClass('strikethrough');
  });
});