const shortcutObjs = document.querySelectorAll('.btn');
const inputObjs = document.querySelectorAll('.input');

const register = (btn) => {
    let shortcut = [];

    document.addEventListener('keydown', e => shortcut.push(e.key));
    document.addEventListener('keyup', e => {
        if (e.keyCode !== 8){
            btn.target.innerText = format(shortcut.splice(0, 3));
        } else btn.target.innerText = "";
        shortcut.length = 0;
    }, { once: true });
}

function format(array) {
    return array.join(' + ').toLowerCase();
}

async function main(){
    shortcutObjs[0].innerText = await window.electron.getLocalStorage('shortcutA');
    inputObjs[0].value = await window.electron.getLocalStorage('gemini-url');

    shortcutObjs[0].onclick = (event) => {
        shortcutObjs[0].innerText = "enter keybinding";
        register(event);
    }

    inputObjs[0].onclick = (event) => {
        inputObjs[0].value = "";
        inputObjs[0].placeholder = "enter Gemini URL";
    }

    document.querySelector('.done').onclick = () => {
        window.electron.setLocalStorage('shortcutA', shortcutObjs[0].innerText);
        window.electron.setLocalStorage('gemini-url', inputObjs[0].value);

        isQuitting = true;
        window.electron.close();
    }

    document.querySelector('.cancel').onclick = () => {
        window.electron.close();
    }

}

main();
