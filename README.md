# {{ Snake Game }}

Massive multiplayer game, based on the classic 'snake'

## Peering

Peering is currently done with the following flow:
- Grab list of offers off the signalling server from the last 15 minutes
- Filter out any that have had already had an answer on the same channel
  - TODO: expire out fulfilled peer offerings
- Attempt to answer the remaining offers
- Generate offers with your remaining peers
- Timeout on connections, and recycle through with peers

## Tech:
  - WebRTC DataChannels via `simple-peer`
  - Canvas/SVG for display

## Challenges
  - Peering is currently a mesh - not performant with a high number of peers

## TODO
  - [x] Create signalling server
  - [ ] Clean up build process
  - [ ] Polyfills: promises?
  - [ ] Make entities/state immutable - pass state to interactionManager
  - [ ] Abstract out logger - expose analytics hooks