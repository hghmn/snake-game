// necessary typings
// TODO: Promise polyfill
declare var Promise: any;

const Peer = require('simple-peer');
import { log } from './lib/utils';
import { post, get } from './lib/xhr';

interface ISignalResults {
    fetched: string; // timestamp
    signals: Array<{
        channel: string; // partial hash from the initiating peer
        message: string; // sdp connection string
        type: number | string; // the signal type, should be an int
    }>; // timestamp
}

enum SignalTypes {
    offer = 1,
    answer,
}

function makePeer(iam: string, offer?: any) {
    // new up a peer for
    const p = new Peer({
        initiator: offer ? false : true, // if we start with an offer, they initiated
        trickle: false
    });
    const channelShort = offer ? offer.channel : p.channelName.substr(0, 7);

    // delete this peer on errors
    p.on('error', (err) => console.log('error', err));

    // Do stuff and things when we connect and have data
    p.on('connect', () => {
        console.log('CONNECT');
        p.send(`[${iam}] whatever ${Math.random()}`);
    });

    p.on('data', (data) => console.log('[DATADATA]: ' + data));

    // Event when _peer_ sends out a signal - pass it up to the signal server
    p.on('signal', (data) => {

        const body = {
            type: SignalTypes[data.type],
            iam,
            channel: channelShort,
            message: JSON.stringify(data),
        };

        // post our offer/answer to the signalling server
        post('/signalling/write.php', body, (err, res) => {
            if (err) {
                console.error(err);
            }

            console.log(`[${channelShort}][SIGNAL ${data.type}]`, { data, res });
        });
    });

    // If we initialized with an offer (from signal server) trigger it to send out an answer
    if (offer && offer.message) {
        p.signal(offer.message);
    }

    return {
        hasConnection: false,
        channelName: p.channelName,
        signal: p.signal.bind(p),
    };
}

export function connect(iam: string, options?: { count: number }) {
    const peerCount = options && options.count || 3; // default to 3 peers
    const peerList = [];
    const openPeers = [];

    // intialize peers
    for (let i = 0; i < peerCount; i++) {
        openPeers[i] = {
            peer: i,
            init: makePeer,
        };
    }

    // DELETE: debug
    window['peerList'] = peerList;

    // TODO: move this out to a worker
    // long polling on an interval until connected to signal server
    const longPollSignallingServer = (function () {
        const limit = 20
        const interval = 300;
        let drySpell = 0; // don't want to go over this

        return function() {
        setTimeout(() =>
            get<ISignalResults>('/signalling/read.php', (err, res) => {
                if (err) {
                    console.error(err);
                }

                // keep looping until we get something
                if (!res.signals.length && ++drySpell < limit) {
                    return longPollSignallingServer();
                }

                // we have signals, let's see if any are offers
                console.log(`[${res.fetched}] [${res.signals.length}] results from signalling server`);

                // filter the offers from the answers
                let offers = [];
                let answers = [];

                for (let i = 0; i < res.signals.length; i++) {
                    if (res.signals[i].iam === iam) {
                        continue;
                    }

                    if (res.signals[i].type == SignalTypes.offer) {
                        offers.push(res.signals[i]);
                    } else if (res.signals[i].type == SignalTypes.answer) {
                        answers.push(res.signals[i]);
                    }
                }

                // allocate open peers
                if (openPeers.length) {
                    console.log('offers', offers);

                    //
                    for (let i = 0; i < offers.length; i++) {
                        // push the first position openPeer to peerList
                        peerList.push(openPeers.shift().init(iam, offers[i]));
                    }

                    console.log('peerList', peerList);
                    console.log('available', openPeers);

                    // have remaining peers initiate offer signals
                    while (openPeers.length) {
                        peerList.push(openPeers.shift().init(iam));
                    }
                }

                if (answers.length) {
                    // walk through the peerlist and see if any are waiting on answers
                    for (let i = 0; i < peerList.length; i++) {
                        if (peerList[i].channelName && !peerList[i].hasConnection) {
                            for (let j = 0; j < answers.length; j++) {
                                if (peerList[i].channelName.indexOf(answers[j].channel) === 0) {
                                    // we found an answer!!
                                    peerList[i].signal(answers[j].message);
                                    peerList[i].hasConnection = true;
                                }
                            }
                        }
                    }
                }

                drySpell = 0;
                longPollSignallingServer();
            }), interval);
        }
    }());

    // start the loop - every 300ms, for 15s
    longPollSignallingServer();

    return peerList;
}

