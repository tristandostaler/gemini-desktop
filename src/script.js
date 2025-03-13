const webview = document.querySelector('webview');

async function main(){
    let src = await window.electron.getLocalStorage('gemini-url');
    let shortcutA = await window.electron.getLocalStorage('shortcutA');
    let shortcutB = await window.electron.getLocalStorage('shortcutB');

    if(src !== null || src !== '') {
        webview.src = src;
    } else {
        webview.src = 'https://gemini.google.com/app';
    }

    if(shortcutA) await window.electron.setLocalStorage('shortcutA', shortcutA);
    if(shortcutB) await window.electron.setLocalStorage('shortcutB', shortcutB);
}

main();