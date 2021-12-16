function bag(sel) {
    return new BAG(sel);
}

function BAG(sel) {
    this.element = (typeof (sel) === 'string') ? document.querySelector(sel) : sel;
    this.remove = function () {
        this.element.remove();
        return this;
    };
    this.html = function (str) {
        if (typeof (str) === 'undefined') {
            return this.element.innerHTML;
        }
        else {
            this.element.innerHTML = str;
        }
        return this;
    };
    this.text = function (str) {
        if (typeof (str) === 'undefined') {
            return this.element.innerText;
        }
        else {
            this.element.innerText = str;
        }
        return this;
    };
    this.addHtml = function (str) {
        if (typeof (str) !== 'undefined') {
            this.element.insertAdjacentHTML('beforeend', str);
        }
        return this;
    };
    this.val = function (str) {
        if (typeof (str) === 'undefined') {
            return this.element.value;
        }
        else {
            this.element.value = str;
        }
        return this;
    };
    this.toggle = function () {
        if (!this.element.style.display || this.element.style.display == 'block') {
            this.element.style.display = 'none';
        }
        else {
            this.element.style.display = 'block';
        }
        return this;
    };
    this.replaceCss = function (str) {
        var arrCss = this.element.getAttribute('class').split(' ');
        var repCss = str.split(' ');
        var index = arrCss.findIndex(t => t == repCss[0]);
        if (~index) {
            arrCss[index] = repCss[1];
        }
        else {
            index = arrCss.findIndex(t => t == repCss[1]);
            if (~index) {
                arrCss[index] = repCss[0];
            }
        }
        this.element.setAttribute('class', arrCss.join(' '));

        return this;
    };
    this.translit = function () {

        var map = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y',
            'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh',
            'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ы': 'i', 'э': 'e', 'ю': 'yu', 'я': 'ya', 'ь': '', ' ': '_'
        };
        var s = this.element.value;

        var reg = '[' + Object.keys(map).join('') + ']|[a-zA-Z_0-9]';
        var str = s.match(new RegExp(reg, 'gi')).join('');

        this.element.value = (str.replace(new RegExp(Object.keys(map).join('|'), 'gi'), function (c) {
            return map[c];
        }));
        return this;
    };
    this.dragElement = function (elmnt) {
        var elm = this.element;
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (elm.querySelector(elmnt)) {
            /* if present, the header is where you move the DIV from:*/
            elm.querySelector(elmnt).onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            elm.onmousedown = dragMouseDown;
        }
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elm.style.top = (elm.offsetTop - pos2) + "px";
            elm.style.left = (elm.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
        return this;
    };
    this.center = function () {
        var d = this.element;
        var div_height = d.offsetHeight;
        var div_width = d.offsetWidth;
        var scroll = (window.pageXOffset != undefined) ?
            window.pageYOffset : function () {
                var html = document.documentElement;
                var body = document.body;
                var top = html.scrollTop || body && body.scrollTop || 0;
                top -= html.clientTop;
                return top;
            };
        var set_top = (document.documentElement.clientHeight / 2 - div_height / 2 + scroll);
        var set_left = (document.documentElement.clientWidth - div_width) / 2;
        if (set_top < scroll)
            set_top = scroll;
        if (set_left < 0)
            set_left = 0;
        d.style.top = set_top + "px";
        d.style.left = set_left + "px";
        return this;
    };    
    this.el = function()
    {        
        return this.element;
    }

}

function ajax(options) {
    viewMessage("dialog_uploadProgress", "Идет загрузка!!!");
    options = {
        data: options.data || null,
        type: options.type || 'Post',
        url: options.url || null,
        success: options.success || null,
        contentType: options.contentType || null
    }
    return new AJAX.send(options);
}

var AJAX = {
    xhr: function () {
        var request;
        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
            if (request.overrideMimeType) {
                request.overrideMimeType("text/xml");
            }
        }
        else if (window.ActiveXObject) {
            try {
                request = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e) {
                try {
                    request = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e) { return false; }
            }
        }
        if (!request) {
            viewMessage("dialog_messagegetreqest", "Giving up :(Csnnot create an XMLHTTP instance");
            return false;
        }
        return request;

    },

    send: function (o) {
        var request = AJAX.xhr();
        if (request) {
            request.open(o.type, o.url, true);
            if (o.contentType) { request.setRequestHeader('Content-Type', o.contentType); }
            request.onreadystatechange = function () {
                try {
                    if (request.readyState == 4) {
                        if (request.status == 200) {
                            o.success(AJAX.json(request.responseText));
                        }
                        else {
                            request.abort();
                            viewMessage("dialog_messageError", "С запросом возникла проблема. Адрес запроса: " + o.url);
                            if (document.getElementById("dialog_uploadProgress"))
                                document.getElementById("dialog_uploadProgress").remove();
                        }
                    }
                }
                catch (e) {
                    request.abort();
                    viewMessage("dialog_messageError", "Произошло исключение: " + e.description);
                    if (document.getElementById("dialog_uploadProgress"))
                        document.getElementById("dialog_uploadProgress").remove();
                }
            };
            request.onload = function () {
                if (document.getElementById("dialog_uploadProgress"))
                    document.getElementById("dialog_uploadProgress").remove();
            };
            request.send(o.data);
        }
    },
    json: function (r) {
        try {
            JSON.parse(r);
            return JSON.parse(r);
        } catch (e) {
            return r;
        }
    }
}

var htmlEditor = {
    prepytte: function (elm) {
        var text = elm.textContent;
        var regRep = new RegExp(/([<\"\'][^<>\"\']*\/?[\"\'>])/gi);
        var textArray = new Array();
        textArray = text.match(regRep);

        var result;

        var tegNameArray = new Array();

        var regTeg = new RegExp(/<([\w]+)[^><]*>/gi);
        var noTeg = (['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
        while (result = regTeg.exec(text)) {
            var x = noTeg.find(t => t == result[1]);
            if (!x)
                tegNameArray.push({ 'teg': result[1], 'pos': result.index, 'type': 'start' });
        }

        var re = new RegExp(/<\/([\w\s]+)>/gi);
        while (result = re.exec(text)) {
            tegNameArray.push({ 'teg': result[1], 'pos': result.index + result[0].length, 'type': 'end' });
        }
        if (tegNameArray.filter(t => t.type == 'start').length !== tegNameArray.filter(t => t.type == 'end').length)
            return;

        var rangeArrayIndex = new Array();
        rangeArrayIndex = htmlEditor.getEndTegPos(tegNameArray);
        if (rangeArrayIndex.length > 0) {
            rangeArrayIndex.sort(function (a, b) {
                if (a.start > b.start) {
                    return 1;
                }
                if (a.start < b.start) {
                    return -1;
                }
                return 0;
            });

            rangeArrayIndex.forEach(function (t) {
                if (text.slice(t.start, t.end) !== '') {
                    htmlEditor.childFindText(elm, text.slice(t.start, t.end), 'pre');
                }
            });
        }
        if (textArray) {
            textArray.forEach(function (t) {
                htmlEditor.childFindText(elm, t, 'b');
            });
        }
    },

    getEndTegPos: function (arrayTeg) {
        var domElementPos = new Array();
        var startTeg = arrayTeg.filter(i => i.type == 'start');
        startTeg.forEach((t) => {
            var d = arrayTeg.find((i) => i.pos > t.pos && i.type == 'end' && i.teg == t.teg &&
                arrayTeg.filter((c) => c.pos < i.pos && c.pos > t.pos && i.teg == t.teg).length == 0);
            if (d) {
                domElementPos.push({ 'teg': t.teg, 'start': t.pos, 'end': d.pos });
            }
        });
        if (domElementPos.length > 0) {
            domElementPos.forEach((t) => {
                arrayTeg.splice(arrayTeg.findIndex(c => c.pos == t.end && c.type == 'end' && c.teg == t.teg), 1);
                arrayTeg.splice(arrayTeg.findIndex(c => c.pos == t.start && c.type == 'start' && c.teg == t.teg), 1);
            });
            if (arrayTeg.length != 0) {
                var d = htmlEditor.getEndTegPos(arrayTeg);
                d.forEach((t) => {
                    domElementPos.push(t);
                });

            }
        }
        return domElementPos;
    },

    childFindText: function (elm, text, teg) {
        if (elm.textContent) {
            elm.normalize();
            if (~elm.textContent.indexOf(text)) {
                if (elm.childNodes.length === 0) {
                    htmlEditor.rangePaste(elm, text, teg);
                }
                else {
                    var child = elm.childNodes;
                    child = Array.prototype.slice.call(child);
                    child.forEach(function (c) {
                        htmlEditor.childFindText(c, text, teg);
                    });
                }
            }
        }
    },

    rangePaste: function (r, text, teg) {
        if (r.parentNode.textContent != text) {
            var parentNode = r.parentNode;
            var content = r.textContent;
            if (r.parentNode.nodeName === 'B' && teg === 'b') {
                content = parentNode.textContent;
                parentNode = parentNode.parentNode;
                r = r.parentNode;
            }

            var startPos = content.indexOf(text);
            var endPos = content.indexOf(text) + text.length;
            var tempStr1 = content.substring(0, startPos);
            var tempStr2 = content.substring(endPos);
            var frag = new DocumentFragment();
            var n = document.createTextNode(tempStr1);
            frag.appendChild(n);
            var elemTeg = document.createElement(teg);
            var nodText = document.createTextNode(text);
            elemTeg.appendChild(nodText);
            frag.appendChild(elemTeg);
            var n = document.createTextNode(tempStr2);
            frag.appendChild(n);
            parentNode.replaceChild(frag, r);

            if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(n);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.body.createTextRange != "undefined") {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(n);
                textRange.collapse(false);
                textRange.select();
            }
        }
    },
    update: function (elm) {
        elm.textContent = elm.textContent.replace(/\n/g, '');
        htmlEditor.prepytte(elm);
    },
}

var editor = {
    eRange: null,
    elm: null,
    load: function (elm) {
        if (editor.elm !== elm) {
            editor.elm = elm;
            editor.editorLoaded();
        }
    },

    editorLoaded: function () {
        editor.elm.onkeyup = () => { editor.getSelectionRange() };
        editor.elm.onmouseup = () => { editor.getSelectionRange() };
        editor.elm.onmousedown = () => { editor.getSelectionRange() };
        var editorMenu = document.getElementById("editorMenuToolbar");
        editorMenu.innerHTML = editor.geteditortext().innerHTML;
        editorMenu.querySelectorAll('[data-togle="drop"]').forEach(function (d, i) {
            d.onclick = function () {
                var p = d.parentNode.querySelector('ul');
                editorMenu.querySelectorAll('.abtnGroup>ul').forEach(function (c, i) {
                    if (p !== c)
                        c.style.display = 'none';
                });
                if (p.style.display === 'block')
                    p.style.display = 'none';
                else {
                    p.onmouseleave = function () {
                        setTimeout(() => { p.style.display = 'none'; }, 1000);
                    };
                    p.style.display = 'block';
                }
            };
        });

        editorMenu.querySelectorAll('[data-edit]').forEach(function (d, i) {
            d.onclick = function () {
                var s = this.getAttribute('data-edit').split(' ');
                editor.formatText(s[0], (s.length > 1 ? s[1] : ''));
            };
        });
        editorMenu.querySelectorAll('[data-func]').forEach(function (d, i) {
            d.onclick = function () {
                eval(this.getAttribute('data-func'));
            };
        });
    },

    getSelectionRange: function () {
        if (typeof window.getSelection != "undefined") {
            editor.eRange = window.getSelection().getRangeAt(0);
        }
        else
            if (typeof document.selection != "undefined" && document.selection.type != "Control") {
                editor.eRange = document.selection.createRange();
            }
            else {
                viewMessage("dialog_messagegetrange", "Браузер не поддерживает эту функцию");
                editor.eRange = false;
            }
    },

    showHtml: function () {
        var name_dialog = "dialog_viewCode";
        if (document.getElementById(name_dialog))
            document.getElementById(name_dialog).remove();
        var inner_html = '<pre class="prettyprint" contenteditable="true" id="quine"></pre>';
        var button_array = [{ name: "Сохранить", func: 'bag(editor.elm).html(bag("#quine").text()); bag("#dialog_viewCode").remove();' },
        { name: "Отмена", func: 'bag("#dialog_viewCode").remove()' },
        { name: " Фрагментировать", func: 'htmlEditor.update(document.querySelector("#quine"))' }];
        createSubmenu(name_dialog, "Просмотр Кода", null, button_array, inner_html);
        bag('#quine').text(editor.elm.innerHTML);
        bag('#quine').text(bag('#quine').text().replace(/\n/g, ''));
        htmlEditor.prepytte(document.querySelector('#quine'));
        document.querySelector('#quine').onkeyup = function (e) {
            htmlEditor.prepytte(e.target);
        };
        document.querySelector('#quine').onkeydown = function (e) {
            if (e.keyCode === 13) {
                document.execCommand('insertLineBreak', false, null);
                return false;
            }
        };
        bag('#dialog_viewCode').center();
    },

    setColor: function (color) {
        var array_img = document.getElementById("editor_normal").querySelectorAll("img");
        for (var i = 0; i < array_img.length; i++) {
            if (array_img[i].getAttribute("title") == "Цвет шрифта") {
                array_img[i].style.backgroundColor = color;
                break;
            }
        }
        document.getElementById("editor_fontcolor").value = color;
        editor.formatText('forecolor', color);
    },

    insertColor: function () {
        editor.formatText('forecolor', document.getElementById("editor_fontcolor").value);
    },

    formatText: function (command, option) {
        if (editor.eRange) {
            var selection = window.getSelection();
            try {
                selection.removeAllRanges();
            } catch (ex) {
                document.body.createTextRange().select();
                document.selection.empty();
            }
            selection.addRange(editor.eRange);
            document.execCommand(command, false, option);
        }
        editor.getSelectionRange();
    },

    setHtml: function (html) {
        if (editor.eRange && editor.eRange.pasteHTML) {
            editor.eRange.pasteHTML(html);
        } else {
            editor.eRange.deleteContents();
            var el = document.createElement("mainedit");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            editor.eRange.insertNode(frag);

            if (lastNode) {
                var selection = window.getSelection();
                editor.eRange = editor.eRange.cloneRange();
                editor.eRange.setStartAfter(lastNode);
                editor.eRange.collapse(true);
                selection.removeAllRanges();
                selection.addRange(editor.eRange);
            }


        }
    },

    createLink: function () {
        var new_link = document.getElementById("adress_new_link").value;
        if (new_link)
            editor.formatText("CreateLink", new_link);
    },

    insertTable: function () {
        CTD = '';
        for (i = 0; i < document.getElementById("editor_addtable_cols").value; i++) {
            CTD = CTD + '<td>&nbsp;</td>';
        }
        CTR = '';
        for (i = 0; i < document.getElementById("editor_addtable_rows").value; i++) {
            CTR = CTR + '<tr>' + CTD + '</tr>';
        }
        editor.setHtml('<table width=' + document.getElementById("editor_addtable_width").value + ' border=' + document.getElementById("editor_addtable_border").value + '>' + CTR + '</table>');
    },

    getParent: function (tag) {
        if (document.selection) {
            var obj = editor.eRange.parentElement();
            while (obj.tagName != tag && obj.tagName != "BODY") {
                obj = obj.parentElement;
            }
            if (obj.tagName == "BODY") {
                return null;
            } else {
                return obj;
            }
        } else if (editor.eRange.startContainer) {
            startRangeNode = editor.eRange.startContainer;
            var obj = startRangeNode.parentNode;
            while (obj.nodeName != tag && obj.nodeName != "BODY") {
                obj = obj.parentNode;
            }
            if (obj.tagName == "BODY") {
                return null;
            } else {
                return obj;
            }
        } else {
            viewMessage("dialog_messagegetrange", "Браузер не поддерживает эту функцию");
            return null;
        }
    },

    insertCol: function () {
        td = editor.getParent('TD');
        if (td != null) {
            pos = td.cellIndex;
            table = editor.getParent('TABLE');
            for (i = 0; i < table.rows.length; i++) {
                td = table.rows[i].insertCell(pos);
                td.innerHTML = "&nbsp;";
            }
        }
    },

    deleteCol: function () {
        td = editor.getParent('TD');
        if (td != null) {
            pos = td.cellIndex;
            table = editor.getParent('TABLE');
            for (i = 0; i < table.rows.length; i++) {
                td = table.rows[i].deleteCell(pos);
            }
        }
    },

    insertRow: function () {
        table = editor.getParent('TABLE');
        if (table != null) {
            tr = editor.getParent('TR');
            newtr = table.insertRow(tr.rowIndex);
            for (i = 0; i < tr.cells.length; i++) {
                td = newtr.insertCell(i);
                td.innerHTML = "&nbsp;";
            }
        }
    },

    deleteRow: function () {
        tr = editor.getParent('TR');
        if (tr != null) {
            table = editor.getParent('TABLE');
            table.deleteRow(tr.rowIndex);

        }
    },

    splitCell: function () {
        td = editor.getParent('TD');
        if (td != null) {
            tr = editor.getParent('TR');
            pos = td.cellIndex;
            newtd = tr.insertCell(pos + 1);
            newtd.innerHTML = "&nbsp;";
            table = editor.getParent('TABLE');
            for (i = 0; i < table.rows.length; i++) {
                if (i != tr.rowIndex && table.rows[i].cells[pos]) {
                    table.rows[i].cells[pos].colSpan += 1;
                }
            }
        }
    },

    setCell: function () {
        if ((editor.eRange != null) && (editor.eRange.tagName == 'TD')) {
            editor.eRange.width = document.getElementById("editor_cell_width").value;
            editor.eRange.height = document.getElementById("editor_cell_height").value;
        }
        editor.eRange = null;
    },

    insertImg: function () {
        var url_img = document.getElementById("url_new_img").value;
        var width_img = document.getElementById("width_img").value;
        var height_img = document.getElementById("height_img").value;
        var alt_img = document.getElementById("alt_img").value;
        var align_img = document.getElementById("align_img").value;
        if (url_img != "") {
            editor.setHtml("<img src='" + url_img + "' width='" + width_img + "' height='" + height_img + "' alt='" + alt_img + "' align='" + align_img + "'>");
            bag("#dialog_addimg").remove();
        }
    },

    dialogAddImg: function () {
        var name_dialog = "dialog_addimg";
        var field_array = ([{ "id": "url_new_img", "type": "text", "name": "URL адрес", "value": "" },
        { "id": "width_img", "type": "text", "name": "Ширина", "value": "" },
        { "id": "height_img", "type": "text", "name": "Высота", "value": "" },
        { "id": "alt_img", "type": "text", "name": "Описание", "value": "" },
        { "id": "align_img", "type": "select", "name": "Выравнивание", "value": "center:По центру;left:По левому краю;right:По правому краю" }]);
        
        var button_array = ([{ "name": "Выбрать изображение", "func": "editor.dialogLoadImg();" },
        { "name": "Вставить", "func": "editor.insertImg();" },
        { "name": "Закрыть", "func": 'bag("#dialog_addimg").remove();' }]);
        createSubmenu(name_dialog, "Вставка изображения", field_array, button_array, null);        
    },

    dialogLoadImg: function () {
        var name_dialog = "dialogLoadImg";
        var inner_html = "<div id='viewImagesDiv'></div>"
        var button_array = ([{ "name": "Закрыть", "func": 'bag("#dialogLoadImg").remove();' }]);
        createSubmenu(name_dialog, "Выбор изображения", null, button_array, inner_html);
        loadImagesUser('', 'viewImagesDiv');
    },

    dialogAddTable: function () {
        var name_dialog = "dialog_addtable";
        var field_array = ([{ "id": "editor_addtable_cols", "type": "text", "name": "Количество столбцов", "value": "3" },
        { "id": "editor_addtable_rows", "type": "text", "name": "Количество строк", "value": "3" },
        { "id": "editor_addtable_width", "type": "text", "name": "Ширина таблицы", "value": "100%" },
        { "id": "editor_addtable_border", "type": "text", "name": "Толщина границ", "value": "0" }]);

        var button_array = ([{ "name": "Вставить", "func": "editor.insertTable(); bag('#dialog_addtable').remove();" },
        { "name": "Отмена", "func": "bag('#dialog_addtable').remove();" }]);
        createSubmenu(name_dialog, "Вставка таблицы", field_array, button_array, null);
    },

    dialogPropCell: function () {

        td = editor.getParent('TD');
        if (td != null) {
            editor.eRange = td;
            var name_dialog = "dialog_propcell";
            var field_array = ([{ "id": "editor_cell_width", "type": "text", "name": "Ширина", "value": "" },
            { "id": "editor_cell_height", "type": "text", "name": "Высота", "value": "" }]);

            var button_array = ([{ "name": "Применить", "func": "editor.setCell(); bag('#dialog_propcell').remove();" },
            { "name": "Отмена", "func": "bag('#dialog_propcell').remove();" }]);
            createSubmenu(name_dialog, "Свойства ячейки", field_array, button_array, null);

            document.getElementById("editor_cell_width").value = td.width;
            document.getElementById("editor_cell_height").value = td.height;
        }
    },

    dialogAddLink: function () {
        var name_dialog = "dialog_addlink";
        var field_array = ([{ "id": "adress_new_link", "type": "text", "name": "Адрес ссылки:", "value": "http://" }]);

        var button_array = ([{ "name": "Вставить", "func": "editor.createLink(); bag('#dialog_addlink').remove();" },
        { "name": "Отмена", "func": "bag('#dialog_addlink').remove();" }]);

        createSubmenu(name_dialog, "Вставка ссылки", field_array, button_array, null);
    },

    geteditortext: function () {

        var divMenu = document.createElement("div");

        var ul = document.createElement("ul");
        var div = document.createElement("div");
        div.className = "abtnGroup";
        div.innerHTML = '<a class="abtn" data-togle="drop" title="Размер текста"><i class="icon-text-height"></i><b class="caret"></b></a>';
        ul.className = "dropUl";
        for (var i = 1; i < 6; i++) {
            var li = document.createElement("li");
            li.innerHTML = '<a data-edit="fontSize ' + i + '"><font size="' + i + '">Размер ' + i + '</font></a></li>';
            ul.appendChild(li);
        }
        div.appendChild(ul);
        divMenu.appendChild(div);

        ul = document.createElement("ul");
        div = document.createElement("div");
        div.className = "abtnGroup";
        div.innerHTML = '<a class="abtn" data-togle="drop" title="Шрифт"><i class="icon-font"></i><b class="caret"></b></a>';
        ul.className = "dropUl";
        var fontName = editor.getFontName();
        fontName.forEach(function (data, i) {
            var li = document.createElement("li");
            li.innerHTML = '<a data-edit="FontName ' + data.name + '" style="font-family:' + data.name + '">' + data.name + '</a></li>';
            ul.appendChild(li);
        });
        div.appendChild(ul);
        divMenu.appendChild(div);

        var aLink = ([{ "class": "icon-bold", "title": "Жирный", "data": "Bold" },
        { "class": "icon-italic", "title": "Курсив", "data": "Italic" },
        { "class": "icon-strikethrough", "title": "Перечеркнутый", "data": "Strikethrough" },
        { "class": "icon-underline", "title": "Подчеркнутый", "data": "Underline" },
        { "class": "icon-align-left", "title": "Выровнить по левому краю", "data": "JustifyLeft" },
        { "class": "icon-align-center", "title": "Выровнить по центру", "data": "JustifyCenter" },
        { "class": "icon-align-right", "title": "Выровнить по правому краю", "data": "JustifyRight" },
        { "class": "icon-align-justify", "title": "Выровнить по краям", "data": "JustifyFull" },
        { "class": "icon-list-ul", "title": "Маркированный список", "data": "InsertUnorderedList" },
        { "class": "icon-list-ol", "title": "Нумерованный список", "data": "InsertOrderedList" },
        { "class": "icon-indent-right", "title": "Увеличить отступ", "data": "Indent" },
        { "class": "icon-indent-left", "title": "Уменьшить отступ", "data": "Outdent" },
        { "class": "icon-undo", "title": "Отменить", "data": "Undo" },
        { "class": "icon-repeat", "title": "Повторить", "data": "Redo" },
        { "class": "icon-link", "title": "Вставить ссылку", "func": "editor.dialogAddLink()" },
        { "class": "icon-unlink", "title": "Удалить ссылку", "data": "UnLink" },
        { "class": "icon-picture", "title": "Вставить рисунок", "func": "editor.dialogAddImg()" },
        { "class": "icon-eraser", "title": "Удалить форматирование", "data": "removeformat" },
        { "class": "icon-code", "title": "Просмотр HTML кода", "func": "editor.showHtml()" }]);
        //{ "class": "icon-table", "title": "Вставить таблицу", "func": "editor.dialogAddTable()" },
        //imageArray.push({ "class": "/images/icons/font.gif", "title": "Цвет шрифта", "onclick": "editor.insertColor()" });
        //imageArray.push({ "class": "/images/icons/select.gif", "title": "Выбрать цвет", "onclick": "baggeneral.dialogGetColor('editor.setColor')" });
        //imageArray.push({ "class": "/images/icons/table_insert_row.gif", "title": "Вставить строку", "onclick": "editor.insertRow()" });
        //imageArray.push({ "class": "/images/icons/table_delete_row.gif", "title": "Удалить строку", "onclick": "editor.deleteRow()" });
        //imageArray.push({ "class": "/images/icons/table_insert_col.gif", "title": "Вставить столбец", "onclick": "editor.insertCol()" });
        //imageArray.push({ "class": "/images/icons/table_delete_col.gif", "title": "Удалить столбец", "onclick": "editor.deleteCol()" });
        //imageArray.push({ "class": "/images/icons/table_span.gif", "title": "Разбить ячейку", "onclick": "editor.splitCell()" });
        //imageArray.push({ "class": "/images/icons/table_cell.gif", "title": "Свойства ячейки", "onclick": "editor.dialogPropCell()" });

        aLink.forEach(function (d, i) {
            var a = document.createElement("a");
            a.setAttribute("class", 'abtn');
            a.setAttribute("title", d.title);
            if (d.data)
                a.setAttribute("data-edit", d.data);
            if (d.func) {
                a.setAttribute("data-func", d.func);
            }
            bag(a).addHtml('<i class="' + d.class + '"></i>');
            divMenu.appendChild(a);
        });


        //var h = document.createElement("input");
        //h.setAttribute("type", "hidden");
        //h.setAttribute("id", "editor_fontcolor");
        //h.setAttribute("value", "#000000");
        //divMenu.appendChild(h);

        return divMenu;

    },
    getFontName: function () {
        var fontName = ([{ "name": "Arial" },
        { "name": "Arial Black" },
        { "name": "Comic Sans MS" },
        { "name": "Courier New" },
        { "name": "Georgia" },
        { "name": "Impact" },
        { "name": "Lucida Console" },
        { "name": "Lucida Sans Unicode" },
        { "name": "Palatino Linotype" },
        { "name": "Tahoma" },
        { "name": "Times New Roman" },
        { "name": "Trebuchet MS" },
        { "name": "Verdana" }]);
        return fontName;
    },
};


