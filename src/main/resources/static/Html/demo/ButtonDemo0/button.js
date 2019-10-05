/**
 * 绑定按钮特效，使用之前需要loadCSS("")
 * @param origin
 * @param initCss
 * @param func
 */
function bindButtonEf(origin,initCss,func) {

   setCSS ( origin,initCss);
    origin.onmouseenter = function (ev1) {
        setCSS(origin,initCss+" boxshadow2");

    };
    origin.onmousedown = function (ev1) {
        setCSS(origin,initCss+" boxshadow1");
        func();

    }
    origin.onmouseup = function (ev1) {
        setCSS(origin,initCss+" boxshadow2");

    }
    origin.onmouseleave = function (ev1) {
        setCSS(origin,initCss);

    }

}