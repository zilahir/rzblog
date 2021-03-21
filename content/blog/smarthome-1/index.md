---
title: SmartHome – Getting started
date: 2021-11-15 01:03:11
tags:
 - 'code, en, smarthome'
categories: [coding, smarthome]
thumbnail: ./../images/smarthome_1.jpg
isPublic: true
---

Now, that I am official a house owner, I was able to start a new – and a long desired hobby: buildint a _smart home_.

## The basics

I have purchased a [google home nest]() months ago, but beside it's being a nice toy that can tell me the current weather, and such, wasn't really that useful. Still, back then had all these ideas I knew I will make happen, once there will be a home for it. Well, know there is, and I decided, despite my quite chaotic blogging methods, that I will try to regularly write down my struggels, discoveries, and achievments, if there's any.

## Lights

Just like many others, I started my so called _smart home_ with the easiest way possible. [Philips Hue]() smart lights. These are pretty common for everyone, you walk into a hardware store, buy the sarter kit, which includes the _Hub_ a few lights (3), and a dimmer switch. What is really amazing in these, even after watching videos, and stuff, that it's indeed super easy to install. Just plug in the Hub, open the `Google Home` application, scan the Hub's QR code on the back, screw in the ligthbulbs, and you are basically all set. All the nice things, the scenes, and routines are part of either the Philips Hue's official app, or the Google Home app, which I am personally prefer.

Right after installing, and naming the lights, placing them into _rooms_ within the app, I was ready to control them with the _Google Assitant_ by voice. This is pretty neat, just shout out commands to Google, such as: 

>Hey Google, turn on the kitchen ligsts.

Or, with the routines, you are able to do things like:

>Hey Google, I am leaving.

And Google adjusts all the things you want it to do, by the command _you are leaving the house_.

Easy, and neat.

## Tv

There is a _Google Chromecast_ attached to the _Samsung TV_, so the _Google Assistan_ are ready by out-of-the-box, to give out commands to the _Google Chromecast_ such as,

>Hey, Google, turn on / off the TV

>Hey, Google play _lorem ipsum_ on Youtube

or,

>Hey Google, turn the TV volume lower / higher

And right here I faced the first problem. Google can't control the TV channels. Since this is definitely something I wanted to do, finally found a real-life usacase, and I was ready to research, and build my own solution.

Since the TV is a _smart tv_, I was sure there are some wrapper libraries for their `API`, written for `NodeJS`. Just a few minutes of searching I came across with this: [`samsung-tv-control`](https://github.com/Toxblh/samsung-tv-control). Though I had the fear of having multiple different models produced by _Samsung_ there is no guarantee, that if something was woring for others, are going to work for me.

>The proof of the pudding is in the eating

So created a `nodejs` server real quick, since something will be needed anyway.

Noticed though, that this wrapper is focusing on actual remoting, but since I can already turn the TV on and off, increasing or decreasing the volume, still went ahead and started testing it by some real basic commands:

```jsx
exports.unMuteTv = (req, res) => {
	const control = new Samsung(livingRoomTvConfig)	
	control.isAvailable()
		.then((isAvailable) => {
			control.sendKey(
        KEYS.KEY_MUTE, (err, result) => {
        if (err) {
          console.debug('err', err)
        } else {
          res.status(200).send({
            ...result,
            isMuted: false,
          })
        }
      })
  })
}
```

Once the function was ready, hooked it into an `endpoint`, 

```
app.get('/tv/unmute', [
  tvController.unMuteTv
])
```

Then started to call the `API` from `Postman`, and by all miracles, it was working. Played around a bit, invastigated the wrapper's source code on [`github`](https://github.com/Toxblh/samsung-tv-control/blob/master/src/samsung.ts).

Unfortunately there are no commands, like `gotoChannel(channel: number)`, or `setChannel(channel: number)`, so some alternative approach was needed. 

As looking into the _documentation_, there are keys, associated with numbers.

```
KEY_0 = 'KEY_0',
KEY_1 = 'KEY_1',
KEY_2 = 'KEY_2',
KEY_3 = 'KEY_3',
...
...
...
KEY_n = 'KEY_n'
```

So the idea was, if I can explicitely tell the TV, to set the channel to `1` for example, by sending a command using the `KEY_1`, that's something I can work with. So went ahead and tested it, and it was working.

Of course I don't want to control the TV by numbers, like:

> Hey Google, set the TV channel to 5

since there are absolutely zero guarantee I will ever remember what is 5th channel placed in the list, so I knew I have to get beck here later.

So, what if the channel number is 99, there is obviously no key for that number. The numbers I was able to use are between 1...9, suprisingly. But that's good enough.

All I was needed to do, is to create a `POST` method, that takes one property in the requst Header, which is the desired channel:

```
app.post('/tv/channel/goto', [
  tvController.goToChannel
])
```

```
  {
    channelToGo: 18
  }
```

So the idea is, let's send the number of the channel in the request, then split it into an Array of numbers: 

```
const numbers = [...channelToGo.toString]
```

And then just loop this array through:

```
for (let i = 0; i<numbers.length; i++) {
  const currentKey = KEYS[`KEY-${numbers[i]}]
}
```

Once with the key needs to be _pressed_ to achieve the desired channel number, can be sent using the wrapper funcion:

```
  ...
    control.isAvailable()
		.then((isAvailable) => {
        control.sendKey(KEYS[currentKey], () => {
          ...
        })
    }
  ...
```

Neat!

Right, so now I was able to set the TV channel by using a self written `NodejS` `API`, using the `index` number of that specific channel.

So the basic prototype is working, the problem of wanting to avoid the need to remember the channel numbers, is still persists.

The next step was pretty clear, need to pair the numbers with the name of the channel being placed on that specific index, so I did the following:

```
const tvChannels = {
  cable: [
    { index: 1, name: 'YLE 1', pronounced: 'YLE ONE' },
    { index: 2, name: 'YLE 2', pronounced: 'YLE TWO' },
    { index: 3, name: 'MTV_3', pronounced: 'MTV THREE },
    { index: 4, name: 'NELJA', pronounced: 'FOUR' },
    { index: 5, name: 'YLE TEEMA', pronounced: 'YLE TEMA' },
    ...
  ],
  digiBox: [
    { index: 1, name: 'Comedy Central', pronounced: 'Comedy Central' },
    { index: 2, name: 'Paramount Channel', pronounced: 'Paramount Channel' },
    { index: 3, name: 'RTL Klub', pronounced: 'RTL Club' },
    { index: 4, name: 'Viasat 3', pronounced: 'VIASAT THREE' },
    { index: 5, name: 'Viasat 6', pronounced: 'VIASAT SIX' },
    ...
  ],
}
```

By having a `pronounced` property in the object, I was already preparing for the voice control.

For this point everything was pretty simple. Needed to have a custom command to _Google Home_, which takes an argument for the `channelName`.

> Hey, Google set the TV channel to #

The `#` is the name of the channel, _Google_ listens to, once we have received the channel, just need to find the index of it: 

```

const chosenChannel = 'VIASAT SIX`

const chosenChannelIndex = tvChannels.cable.find(
    tvchannel =>
      tvChannel.pronounced.toLowerCase()
        === chosenChannel.toLowerCase()
  ).index
```

There is nothing else left, just to call the `API` with the found `index`, and the remote will set the `TV` to the desired channnel.

The `nodeJS` server runs on a `raspberryPI`, and using `ngrok` to expose it to the internet. To mind the basics of security, there is `JWT` authentication implemented for every request, that google sends to the `API` when the request is being sent.
