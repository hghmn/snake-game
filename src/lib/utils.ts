
export function log(msg: string, level = 'log') {
    let timestamp = (new Date()).toISOString();
    console[level](`[${ timestamp }] ${ msg }`);
}

export function guid() {
    return Math.random().toString(16).substr(2, 8);
}

export function slowCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// will loop over a given interval, calling a function in each loop
// returns a dispose function, which will cancel the loop
// loggy = looper(() => console.log('hi'), 500);
export const looper = function(fn: Function, interval: number) {
    let timer;

    function loop() {
        timer = setTimeout(() => {
            fn();
            loop();
        }, interval);

        return function dispose() {
            clearTimeout(timer);
        }
    }

    return loop;
};
