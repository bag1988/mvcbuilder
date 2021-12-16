function createDirectory() {
    var name_dialog = "dialog_addDirectory";
    var field_array = ([{ "id": "nameDirectory", "type": "text", "name": "Имя папки", "value": "" }]);
    var button_array = [{ name: "Сохранить", func: 'saveNewDirectory()' },
    { name: "Закрыть", func: 'bag("#dialog_addDirectory").remove()' }];

    createSubmenu(name_dialog, "Создать папку", field_array, button_array, null);

    document.querySelector('#nameDirectory').onkeyup = function () { bag('#nameDirectory').translit(); };

}
function saveNewDirectory() {
    var model = new FormData();
    model.append("nameDirectory", bag('#nameDirectory').val());
    ajax({
        url: '/admin/userImages/CreateDirectory',
        data: model,
        success: function (data) {
            loadImagesUser();
            viewMessage('ErrorNewDir', (data));
        }
    });
}
var urlActiv = '';
function loadImagesUser(urlDir) {
    var model = new FormData();
    model.append("nameDirectory", urlDir || "");
    urlActiv = urlDir;
    ajax({
        url: '/admin/userImages/getDirInfo',
        data: model,
        success: function (data) {
            var div = document.querySelector('#viewDir');
            if (urlDir) {
                div.innerHTML = '<ol class="breadcrumb"><li><a href="#" onclick="loadImagesUser()">Images</a></li><li class="active">' + urlDir + '</li></ol>';
            }
            else {
                div.innerHTML = '<ol class="breadcrumb"><li class="active">Images</li></ol>';
            }

            data.nameDirectory.forEach(function (d, i) {
                var a = document.createElement('a');
                a.className = 'abtn';
                a.innerText = d;
                a.onclick = function () { loadImagesUser(this.innerText); };
                var di = document.createElement('div');
                di.appendChild(a);
                div.appendChild(di);
            });
            var divrow = document.createElement('div');
            divrow.className = 'row';
            data.nameFile.forEach(function (c, i) {
                var d = document.createElement('div');
                d.className = 'col-xs-6 col-md-3';
                bag(d).addHtml('<div><img style="max-height:180px;" class="img-thumbnail" src="' + c + '"><div class="caption"><p></p></div></div>');
                var a = document.createElement('a');
                a.className = 'abtn';
                a.innerText = 'Удалить';
                a.onclick = function () { deleteImages(c); };
                d.querySelector('p').appendChild(a);

                divrow.appendChild(d);
            });
            div.appendChild(divrow);
        }
    });
}
function addNewImages() {
    var name_dialog = "dialog_addImages";
    var field_array = ([{ "id": "fileImages", "type": "file", "name": "Выберете файл", "value": "" },
    { "id": "imgName", "type": "text", "name": "Сохранить как в /images/" + (urlActiv ? urlActiv : ''), "value": "" }]);
    var button_array = [{ name: "Сохранить", func: 'saveNewImages()' },
    { name: "Закрыть", func: 'bag("#dialog_addImages").remove()' }];
    createSubmenu(name_dialog, "Загрузка изображений", field_array, button_array, null);
    document.querySelector('#fileImages').onchange = function () {
        var fullPath = this.value.split('.')[0];
        var filename = fullPath.replace(/^.*[\\\/]/, '');
        document.querySelector('#imgName').value = filename;
    };
    document.querySelector('#imgName').onkeyup = function () { bag('#imgName').translit(); };
}
function saveNewImages() {
    var model = new FormData();
    model.append("image", document.getElementById('fileImages').files[0]);
    model.append("dirName", "/images/" + (urlActiv ? urlActiv + "/" : ""));
    model.append("imgName", bag('#imgName').val());
    ajax({
        url: '/admin/userImages/saveNewImages',
        data: model,
        success: function (data) {
            loadImagesUser(urlActiv);
            viewMessage('ErrorNewDir', (data));
        }
    });
}
function deleteImages(nameImage) {
    var model = new FormData();
    model.append("nameImage", nameImage);
    ajax({
        url: '/admin/userImages/deleteImages',
        data: model,
        success: function (data) {
            loadImagesUser(urlActiv);
            viewMessage('ErrorNewDir', (data));
        }
    });
}
function showViewModule(idBlock) {
    ajax({
        url: '/admin/extensions/viewModule',
        success: function (data) {
            var name_dialog = "viewModule";
            var inner_html = '<div>';
            if (data) {
                data.forEach(function (d, i) {
                    inner_html += '<a class="abtn" onclick="insertChild(\'' + d.urlModule + '\',\'' + idBlock + '\')">' + d.nameModule + '</a>';
                });
            }
            inner_html += '</div>';
            var button_array = [{ name: "Закрыть", func: 'bag("#viewModule").remove()' }];
            createSubmenu(name_dialog, "Расширения", null, button_array, inner_html);
        }
    });
}

var idSelectElem;

function startRedactor() {
    bag("#adminPanel").dragElement('h4');
    var dataContent = document.querySelector('#parentContainer').querySelectorAll('[data-content]');
    if (dataContent) {
        dataContent.forEach(function (data, i) {
            if (data.getAttribute('data-content') !== 'div') {
                data.onclick = function () { document.querySelector("#editorMenuToolbar").style.display = "none"; };
            }
            if (data.getAttribute('data-content') === 'div') {
                data.setAttribute("contenteditable", "true");
                var d = document.getElementById(data.getAttribute('id'));
                data.onfocus = function () {
                    editor.load(data);
                    document.querySelector("#editorMenuToolbar").style.display = "block";
                };
            }
        });
    }
}

function insertChild(urlModule, idBlock) {
    var model = new FormData();
    model.append("urlPartial", urlModule);
    ajax({
        url: '/modules/index',
        data: model,
        success: function (data) {
            if (data) {
                bag(idBlock).addHtml(data);
                startRedactor();
            }
        }
    });
}

function saveChangePage(controllerName) {
    var arrayChildDiv = document.querySelectorAll("[data-content]");

    arrayChildDiv.forEach((t) => {
        t.removeAttribute("contenteditable");
        t.removeAttribute("style");
    });

    var arrayChild = document.querySelectorAll('#parentContainer > div[data-content]');
    var tempArray = new Array();
    arrayChild.forEach((t) => {
        tempArray.push({ "id": t.id, "css": t.getAttribute('class'), "html": t.innerHTML, "data": t.getAttribute('data-content') });
    });
    var newPageHtml = {
        "actionName": controllerName,
        "newPageHtml": tempArray,
    };
    ajax({
        url: '/admin/pages/changePage',
        data: JSON.stringify(newPageHtml),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            viewMessage('ResultDiv', (data));
            startRedactor();
        }
    });
}


function createSubmenu(name_dialog, name_submenu, field_array, button_array, inner_html) {

    if (document.getElementById(name_dialog))
        return document.getElementById(name_dialog);
    else {

        var div = document.createElement('div');
        div.className = 'movingDiv';

        div.id = name_dialog;
        div.insertAdjacentHTML('beforeend', '<h4>' + name_submenu + '</h4><hr/>');
        if (inner_html) {
            div.insertAdjacentHTML('beforeend', '<div>' + inner_html + '</div');
        }
        if (field_array) {
            div.appendChild(bagfield.createField(field_array, "form-group"));
        }
        if (button_array) {
            div.appendChild(bagfield.createButtonArray(button_array, "view_submenu_button"));
        }
        document.querySelector('body').appendChild(div);
        bag(div).dragElement('h4');
        bag(div).center();
        return div;
    }

}
function viewMessage(name_dialog, messegText) {
    if (document.getElementById(name_dialog))
        document.getElementById(name_dialog).remove();
    var inner_html = messegText;
    var button_array = new Array();
    button_array.push({ "name": "Закрыть", "func": "bag('#" + name_dialog + "').remove();" });
    createSubmenu(name_dialog, "Сообщение", null, button_array, inner_html);
}
var bagfield = {
    createButtonArray: function (button_array, className) {
        var button_menu = document.createElement('div');
        button_menu.className = className;
        button_array.forEach(function (data, i) {
            button_menu.appendChild(bagfield.createButton(data.name, data.func))
        });

        return button_menu;
    },
    createButton: function (nameButton, func) {
        var button = document.createElement('a');
        button.className = 'abtn';
        button.insertAdjacentHTML('beforeend', nameButton);
        button.onclick = function () { eval(func) };
        return button;
    },
    createField: function (field_array, className) {

        var arrayField = document.createElement('div');
        field_array.forEach(function (data, i) {
            var div_field = document.createElement('div');
            div_field.className = className;

            if (data.name)
                div_field.appendChild(bagfield.createLabel(data.id, data.name));
            switch (data.type) {
                case "select":
                    div_field.appendChild(bagfield.createSelect(data.id, data.value));
                    break;
                case "text":
                    div_field.appendChild(bagfield.createText(data.id, data.value));
                    break;
                case "textarea":
                    div_field.appendChild(bagfield.createTextarea(data.id, data.value));
                    break;
                case "file":
                    div_field.appendChild(bagfield.createFile(data.id, data.value));
                    break;
            }
            arrayField.appendChild(div_field);
        });
        return arrayField;
    },
    createLabel: function (idField, nameField, infoField) {
        var field = document.createElement('span');
        field.className = 'control-label';
        field.setAttribute('for', idField);
        field.insertAdjacentHTML('beforeend', nameField + ((!infoField) ? "" : "<i>" + infoField + "</i>"));
        return field;
    },
    createText: function (idField, defaultValue) {
        var field = document.createElement('input');
        field.className = 'form-control';
        field.id = idField;
        field.setAttribute("type", "text");
        field.value = defaultValue;
        return field;
    },
    createTextarea: function (idField, defaultValue) {
        var field = document.createElement('textarea');
        field.className = 'form-control';
        field.id = idField;
        field.value = defaultValue;
        return field;
        return field;
    },
    createSelect: function (idField, value_array) {
        var field = document.createElement('select');
        field.className = 'form-control';
        field.id = idField;
        var array = value_array.split(';');
        array.forEach(function (data, i) {
            field.insertAdjacentHTML('beforeend', '<option value="' + data.split(':')[0] + '">' + (data.split(':')[1] ? data.split(':')[1] : data.split(':')[0]) + '</option>');
        });
        return field;
    },
    createFile: function (idField, defaultValue) {
        var field = document.createElement('input');
        field.className = 'form-control';
        field.id = idField;
        field.setAttribute("type", "file");
        return field;
    },
};