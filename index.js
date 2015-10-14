
module.exports = function (source) {
    this.cacheable && this.cacheable();
    var template = codeToFunction(source);
    return 'module.exports = ' + template;
};

function codeToFunction(code) {

    if (!code || code.length == 0) {
        return "function(){return ''}";
    }

    var regCode = /(?:(?:\r\n|\r|\n)\s*?)?<%([\-=]?)([\w\W\r\n]*?)%>(?:\r\n|\r|\n)?/gmi,
        index = 0,
        exec,
        len,
        res = [
            "var __a={'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',\"'\":'&#39;'},\n",
            '   __b=/[&<>"\']/g,\n',
            '   __e=function (s) {s = String(s);return s.replace(__b, function (m) {return __a[m]});};\n',
            'var __p=[],\n',
            '   _p=function(s){__p.push(s)};\n',
            'with(data){\n'
        ],
        jscode,
        eq;
    while (exec = regCode.exec(code)) {

        len = exec[0].length;

        if (index !== exec.index) {
            res.push("_p('");
            res.push(
                code
                    .slice(index, exec.index)
                    .replace(/\\/gmi, "\\\\")
                    .replace(/'/gmi, "\\'")
                    .replace(/\r\n|\r|\n/g, "\\r\\n\\\n")
            );
            res.push("');\n");
        }

        index = exec.index + len;

        eq = exec[1];
        jscode = exec[2];

        // escape html
        if (eq === '=') {
            res.push('_p(__e(');
            res.push(jscode);
            res.push('));\n');
        }
        // no escape
        else if (eq === '-') {
            res.push('_p(');
            res.push(jscode);
            res.push(');\n');
        } else {
            res.push(jscode);
        }
    }

    res.push("_p('");
    res.push(
        code
            .slice(index)
            .replace(/\\/gmi, "\\\\")
            .replace(/'/gmi, "\\'")
            .replace(/\r\n|\r|\n/g, "\\r\\n\\\n")
    );
    res.push("');\n", '}\n', 'return __p.join("");', '\n');
    res.length--;

    return ['function (data) {\n', res.join(''), '}\n'].join('');
}
