app.filter('navalue', function() {
  return function(value) {
    if(isNaN(value) || value > 0) {
      return value;
    }else if(value === '0'){
        return 'N/A';
    }else {
      return "";
    }
  }
});

app.filter('evaltype', function() {
  return function(value) {
    if(value === '0'){
        return 'EVALUADOR';
    }else {
      return "EVALUADO";
    }
  }
});