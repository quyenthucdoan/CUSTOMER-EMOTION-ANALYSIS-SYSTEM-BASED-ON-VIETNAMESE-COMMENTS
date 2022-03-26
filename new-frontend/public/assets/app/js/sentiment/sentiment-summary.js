const $ = window.$;

function loadSentimentSummary() {
  $('#tweetNo').circleProgress({
      value: 1,
      size: 120,
      fill: {
        gradient: ['#55ADEE', '#75bcef']
      }
    });

  $('#facebookNo').circleProgress({
    value: 1,
    size: 120,
    fill: {
      gradient: ['#8b9dc3', '#3b5998']
    }
  });

  $('#instagramNo').circleProgress({
    value: 1,
    size: 120,
    fill: {
      gradient: ['#feda75','#fa7e1e', '#d62976', '#962fbf', '#4f5bd5']
    }
  });

  $('#pinsNo').circleProgress({
    value: 1,
    size: 120,
    fill: {
      gradient: ['#fc7e82','#CC2127']
    }
  });
}
