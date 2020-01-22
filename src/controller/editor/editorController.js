class EditorController {
    constructor(cabecalho = true) {
        this.editor = document.getElementById('editor-souza');

        this.page = document.getElementById('page');
        this._tabIndex = 0;

        this.teclasNotPermitidas = new TeclasNotPermitidas();

        if (cabecalho) {
            this.addCabecalho();
        }

        this.addLineCursor();
        this.addFocusCursor();
    }

    get tabIndex() {
        return this._tabIndex++;
    }

    set tabIndex(value) {
        this._tabIndex = value;
    }

    addLineCursor() {
        let page = document.getElementById('page');
        let templateLine = `<div class="line" tabindex="${this.tabIndex}"> <span class="cursor">|</span> </div>`;

        page.innerHTML += templateLine;

        var lineAdd = document.querySelectorAll('.line');

        lineAdd.forEach((element) => {
            element.addEventListener('keydown', e => { this.capturaKeyDown(e); } );
            element.addEventListener('focus', e => { this.addFocusLine(e); } );
        }) ;
    }

    addCursor() {
        return `<span class="cursor">|</span>`;
    }

    removeCursorLessUltimo() {
        let cursores = document.querySelectorAll('span.cursor');

        if (cursores.length) {
            for (let index = 0; index < cursores.length - 1; index++) {
                cursores[index].className = 'not-cursor'
                cursores[index].innerHTML = cursores[index].innerHTML.replace('|', '');
            }
        }
    }

    addFocusCursor() {
        let cursores = document.querySelector('span.cursor');
        
        if (cursores) {
            cursores.parentElement.focus();
        }
    }

    addCabecalho() {
        let cabecalhoTemplate = `<div class="cabecalho"></div>`;
        this.page.innerHTML += cabecalhoTemplate;
    }

    capturaKeyDown(event) {
        if (!event) return;

        switch (event.keyCode) {
            case Enter:
                this.eventEnterPress();
                break;
            case Backspace:
                this.useBackSpace(event);
                break;
            case this.teclasNotPermitidas[event.key]:
                break;
            default:
                this.addTextCursor(event);
                break;
        }
    }

    eventEnterPress() {
        this.addLineCursor();
        this.removeCursorLessUltimo();
        this.addFocusCursor();
    }

    addTextCursor(event) {
        let template = '<span class="conteudo"> </span>' + this.addCursor();
        let result = [...event.target.childNodes].filter(x => x.className == 'conteudo')
        
        if (result.length) {
            event.target.querySelector('span.conteudo').innerHTML += event.key;
        }
        else {
            event.target.innerHTML = template;
            event.target.firstChild.innerHTML += event.key;
        }
    }

    useBackSpace(event) {
        let result = [...event.target.childNodes].filter(x => x.className == 'conteudo')

        if (result.length) {
            let conteudo = event.target.querySelector('span.conteudo').innerHTML;

            let conteudoLenght = conteudo.length;

            event.target.querySelector('span.conteudo').innerHTML = conteudo.substring(0, conteudoLenght - 1);
        }
        else {
            event.target.remove();
        }
    }

    addFocusLine(event) {
        let result = [...event.target.childNodes].filter(x => x.className == 'cursor');

        if (!result.length) {
            let cursorAtivo = document.querySelector('.cursor');
            cursorAtivo.className = 'not-cursor';
            cursorAtivo.innerHTML = cursorAtivo.innerHTML.replace('|', '');


            let result = [...event.target.childNodes].filter(x => x.className == 'not-cursor');
            
            if (result.length) {
                result[0].className = 'cursor';
                result[0].innerHTML = '|';
            }
        }
    }
}