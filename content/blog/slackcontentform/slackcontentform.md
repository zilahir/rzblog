---
title: Connect contact form to Slack
date: 2018-05-22 12:45:26
tags:
 - 'code, en'
categories: [coding]
thumbnail: ./../images/slack.jpg
---
# Connect contact form to Slack channel

Having a contact form on a landing page is like the basic accessories every webpage is having.
The ordinary way handling this is to connect the form to an email address, and wait for the incomes. Since it's easy to tag up the emails with labels, such as "contact form" or anything, it's just an other email you have to take care of inbox. Using separate email address is also not too efficient, it's just makes you follow another account, and so.

In the pas years, Slack has become one of the most widely used communication tool in startups, organisations, smaller companies. Not a coincidence: slack gives you the opportunity of organising, the way email is simply not capable of. The idea is then pretty straightforward? Can we connect our forms on our websites, to post on a dedicated Slack channel?

The answer is: **yes!**

And to achieve this, we are going to use google's firebase tools, called `firebase cloud function`.

What you will going to need:

	1. firebase account at google's
	2. npm installed
	3. Slack account
	4. +1: a _hook_ in your Slack team

## Let's get started!

Firstly, you have to create an _incoming webhook_ to your Slack channel. To get this done, please follow Slack's official [documentation](https://workboost.slack.com/apps/new/A0F7XDUAZ-incoming-webhooks).

Here's the prerequisites you have to get yourself through;

 Create a new folder for your project, and then enter it:

 ```
 mkdir slack-form
 cd slack-form
 ```

 Install `firebase-tools` if you haven't done it already:

 `npm install -g firebase-tools`

 In the `slack-form` folder, let's initialise a new firebase project with

 `firebase init`

 At this point you have to select the _Functions_ and the _Firebase_ project you wish to deploy to.


And now the coding part!

Let's open the whole folder with the editor of your choice. I am using atom by the way.

You will notice a `functions` folder, with a `package.json` and an `index.js` file. This is where the magic happens.

 Create a function named `addMessageToSlack`, then let's implement it.

<script src="https://gist.github.com/zilahir/5fcf81186cfc5acb099c5590721a3b92.js"></script>

This piece of code is responsible for invoking an `onRequest` function, which sends a `post` request towards the previously created Slack hook, which includes the data in `json` format, we wish to send to the Slack channel.

Note, that there's the `request` library used, so in the don't forget to install it via `npm` in the `functions` folder:

`npm install --save request`

Ok, so once its done, let's create a contact form on our frontend.

Create an `index.html` in the root folder, and place a `form` in  the `body` tag, as the following:

<script src="https://gist.github.com/zilahir/d9ed47d0737438e31b0700105b9f0ad0.js"></script>

Note, that we are using `jQuery` for this example, so add it as a `dev` dependency:

`npm install --save-dev jquery`

Create a new `javascript` file, and let's name it something like `contact.js`, where we re processing the form.

<script src="https://gist.github.com/zilahir/ee0c4bf482b1571b8c34eb2c91146d12.js"></script>

Notice the `ajaxurl` variable that contains the end-point we are calling. Since we want to avoid `cross origin` errors in our application, we have to route our firebase cloud function.

Let's create a `firebase.json` file in our `root` folder, and add the following:

<script src="https://gist.github.com/zilahir/45c872d162588801ab864e2d440f9c05.js"></script>

This hooks the route `contact/` to the firebase cloud function we named `addMessageToSlack` earlier.

And basically that's it.

Let's deploy the application to firebase:

`firebase deploy`

And test it out in the browser. Then open up Slack, go to the channel we connected the hook to, and the message should be there.

Enjoy!
