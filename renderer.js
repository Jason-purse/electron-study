const information = document.getElementById('info')
information.innerText = `This app is using Chrome \
 (v${versions.chrome()}), Node.js (v${versions.node()}), \
 and Electron (v${versions.electron()})`;


const versionElement = document.getElementById('versions');

versionElement.innerText = `all versions is: ${JSON.stringify(versions.versions())}`


const content = document.getElementById('content');
content.innerText = `${versions.name}`

const pong = document.getElementById("pong");

const pingCount = document.getElementById("pingCount");


// 发送ping()
const func = async () => {
    const response = await window.versions.ping()
    // console.log(response) // prints out 'pong'

    pong.textContent = pong.textContent + (response + "\n");
}

functionPing();
functionPing();
functionPing();


function functionPing() {
    pingCount.textContent = ((pingCount.textContent || 0) * 1 + 1) + ""
    func();
}



try {
    window.functionPing = functionPing;
    // 这行代码有问题
    global.functionPing = functionPing;
}catch (e) {
    // pass
}
// set preload div ???

console.log('preload div',versions.preloadDiv)

document.body.appendChild(versions.preloadDiv);

const dynamic = document.getElementById('#dynamic');

// 这段代码有问题, 异常捕获
try {
    // 没法传递过来 ...
    dynamic.innerHTML = window.parent.preloadDiv
}catch (e) {
    // pass
}

