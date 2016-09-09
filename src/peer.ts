// peering stuffs
// necessary typings
// TODO: Promise polyfill
declare var Promise: any;

const xhr = require('xhr');
const Peer = require('simple-peer');

const signallingServer = '/signalling/read.php';
const peerList = [];
enum SignalTypes {
    offer,
    answer,
}

// DELETE: debug
window['peerList'] = peerList;


function makePeer() {
    // new up a peer for
    const p = new Peer({
        initiator: true, // location.hash === '#1',
        trickle: false
    });

    // delete this peer on errors
    p.on('error', (err) => console.log('error', err));

    // Do stuff and things when we connect and have data
    p.on('connect', () => {
        console.log('CONNECT');
        p.send('whatever' + Math.random());
    });

    p.on('data', (data) => console.log('data: ' + data));


    // TODO: use a super basic xhr-based signalling endpoint to hold on to our messages
    // Currently passing messages up and through textarea
    p.on('signal', (data) => {
        console.log('SIGNAL', data);
        //  document.querySelector('#outgoing').textContent = JSON.stringify(data);

        if (data.type === 'offer') {
            xhr.post('/signalling/write.php', { body: JSON.stringify(data) }, (err, res) => {
                if (err) {
                    console.log(err);
                }

                console.log('post', res);
            });
        }
    });

    //
    // return {
    //     signal: (message) => p.signal(message),
    // };
    return p;
}


// try to reach out to the
function tryConnect(options?: { delay: number }) {
    const delay = options && options.delay;
    return new Promise((resolve, reject) => {
        setTimeout(() =>
            xhr.get(signallingServer, (err, res) => {
                if (err || res.statusCode !== 200) {
                    reject(err || res.statusCode);
                }
                const json = JSON.parse(res.body);
                // 'signalling server response received:',
                resolve(json);
            }), delay || 0);
    });
}

// expose this out to the user
export function connect() {
    // post up our offer(s)
    for (let i = 0; i < 1; i++) {
        peerList.push(makePeer());
    }

    // then start listening for the responses
    //

    // first try to connect on any existing offers
    // tryConnect()
    //     .then(res => res.signals.length ? res : tryConnect({ delay: 1000 }))
    //     .then(res => res.signals.length ? res : tryConnect({ delay: 3000 }))
    //     .then(res => {
    //         if (res.signals.length) {
    //             console.info('connected, trying to make peer', res);
    //             res.signals.forEach(makePeer)
    //         } else {
    //             return Promise.reject('failed to connect');
    //         }
    //     })
    //     .catch(err => console.error(err));
}

