const logger = {
    info: msg => console.log(`%c INFO %c ${msg}`, 'color: white; background: gray;', 'color: white;'),
    debug: msg => console.log(`%c DEBUG %c ${msg}`, 'color: white; background: gray;', 'color: gray;'),
    success: msg => console.log(`%c SUCCESS %c ${msg}`, 'color: white; background: green;', 'color: green;'),
    warn: msg => console.log(`%c WARNING %c ${msg}`, 'color: black; background: yellow;', 'color: yellow;'),
    err: msg => console.log(`%c ERROR %c ${msg}`, 'color: black; background: red;', 'color: red;'),
}