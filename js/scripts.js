$(document).ready(function(){
  $(".button").click(function(){
    switch (this.text()) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
      case "+":
      case "-":
      case "=":
      case "u00D7":
      case "u00F7":
    }
    $(".screen").text($(".screen").text() + $(this).text());
  });
});
