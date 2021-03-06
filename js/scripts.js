var lastIsEqualSign = false;
var main = $('.main');
var sub = $('.sub');

function toJSEquation(equation) {
    return equation.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');
}
function lastIsSymbol(str){
    return /[+−×÷]/.test(str.slice(-1)[0]);
}
function deleteLast(str){
    return str.slice(0,str.length-1);
}
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
$(document).ready(function(){
    $('.button').click(function(){
        var clicked = $(this);
        var ans = '';
        if (/=/.test(main.text()))
            main.text('');
        switch (clicked.text()) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            if (lastIsEqualSign == true) {
                main.text('');
                lastIsEqualSign = false;
            }
            if (main.text() == '0')
                main.text('');
            if (main.text().length >= 13) {
                sub.text('Digit limit reached');
                return;
            }
            if (/[+−×÷]0/.test(main.text().slice(-2)))
                main.text(main.text().slice(0,-1));
            main.text(main.text() + clicked.text());
            if (/[+−×÷]/.test(main.text())) {
                ans = eval(toJSEquation(main.text()));
                if (String(ans).length > 13) {
                    ans = round(ans,String(ans).slice(String(ans).indexOf('.') + 1).length - (String(ans).length - 13));
                }
                sub.text(ans);
            }
            break;
        case '−':
        case '×':
        case '÷':
        case '+':
            if (main.text() == '')
                return;
            if (lastIsSymbol(main.text()))
                main.text(deleteLast(main.text(),clicked.text()));
            if (/\.$/.test(main.text())) {
                main.text(main.text().slice(0,-1));
            }
            main.text(main.text() + clicked.text());
            lastIsEqualSign = false;
            break;
        case '=':
            if (main.text() == '')
                return;
            if (lastIsSymbol(main.text()))
                main.text(deleteLast(main.text(),clicked.text()));
            ans = eval(toJSEquation(main.text()));
            if (String(ans).length > 13) {
                ans = round(ans,String(ans).slice(String(ans).indexOf('.') + 1).length - (String(ans).length - 13));
            }
            sub.text(ans).animate({
                fontSize: '1.5em',
                fontWeight: 'bold'
            });
            main.slideUp(function(){
                $(this).text(ans);
                sub.text('').css('font-size', '1em');
                $(this).show();
            });
            lastIsEqualSign = true;
            return;
        case '.':
            if (/[+−×÷]$/.test(main.text())) {
                main.text(main.text() + '0');
            }
            if (/\d+\.\d*$/.test(main.text()))
                return;
            if (main.text() == '')
                main.text('0');
            main.text(main.text() + clicked.text());
            break;
        case 'AC':
            main.text('');
            sub.text('');
            return;
        }
    });
});
