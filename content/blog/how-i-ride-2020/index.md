---
title: How I Ride in 2020
date: 2020-01-06 12:45:26
tags:
 - 'code, en'
categories: [coding]
thumbnail: ./../images/slack.jpg
---

This is a quick review about how I have been working on the projects I’ve been involved in. Either professional projects at my full time job, or my personal project I did just for myself.  This will discuss technologies I choose, solutions, settings, and more. Bare with me.

Here’s a short table of contents I wish to cover in this article. 

1) IDE
2) IDE Settings & Extensions
3) Project setup
5) Eslint
6) Husky
4) Git (& branches)
7) Technologies
8) Frontend
9) Backend
10) Database
11) Deployment
12) Documentation
13) Debugging
14) Issue tracking

#IDE & IDE Settings

As most of the fullstack and web developers in the past few years, I am also using [`visual studio code`]. To make the most out of it, I am using `ligatures`, namely [`fira code`], and using [`night-owl`] for theme, to make it all nice looking, good for the eye, and easy to read. 

I am using a few extensions, just to mentions the most important ones: 

Eslint, Git History, reacts-snippets, stylelint, react-native snippets, Todo Tree, Svg Viewer, Path Autocomplete, Markdown Preview. 
These are all for making the work more efficient, and faster, without allowing me to make less mistakes. Looked them up, you might find them useful too! 

Let’s go on, and discuss how do I set up a fresh, new project. 

#  Project setup 

I will be honest. I am using [`create-react-app`]. It pretty much covers everything I need, and save me a lot of time and trouble. If there’s something I want to change in the build process, or add some functions which is not in `create-react-app`, I am [`ejecting`] and modifying it the way I need. 

When using react on the frontend side, I am using so together with [`redux`] therefore I am going forward, and setting up the `redux` store, by installing `react-redux`, `redux-thunk`, creating the folder structure in the `src` folder. 

```
src
|
── store
    ├── actions
    │   ├── actionTypes.js
    │   ├── Test.js
    ├── configureStore.js
    └── reducers
        ├── Test.js
```

Simple. Keeping the `reducers` in the reducers folder, actions (and action type) in the `action` folder. 

The next steps are important. Need to configure eslint, and husky and prettier. All are essential, since these stuff helps me to produce clean code, and prevents me to push badly written snippets into the git reposiroty, that ultimately reduces the potential time spent on debugging, and stuff. 

I am using my own linter configs: 

```
"@zilahir/eslint-config": "^1.0.1",
"@zilahir/stylelint-config": "^1.0.0",
```

Alongside with the following: 

```
"eslint-config-airbnb": "^18.0.1",
"eslint-config-prettier": "^6.3.0",
"eslint-plugin-import": "^2.18.2",
"eslint-plugin-jsx-a11y": "^6.2.3",
"eslint-plugin-react": "^7.14.3",
"husky": "^3.0.5",
"lint-staged": "^9.2.5",
"prettier": "^1.18.2",
```

This is my preferred settings both linter, lint-staged, to help husky when comitting to repository, and some other eslint plugins comes along with them. If you are familiar with eslint, you know what these are, if you aren't yet, go ahead, and install, and play around with them. You won't write a single line of code without these ever again, I can promise you that. 

## The code

I strongly recommend you to use hooks.

>Sometimes, the elegant implementation is just a function. Not a method. Not a class. Not a framework. Just a function.

– John Carmack. Oculus VR CTO

Let's consider some benefits of using `hooks`

1) Customizable and reusable across components unlike class component state
2) Cleaner code
3) Easier maintanance

If you haven't given a try it yet, I encourage you to do so. React is evolving, constantly, you need to stay on track, and pick up the pieces the React core team gives. It's just better, trust me. I have started to getting into the details of hooks, but then I decided not to. There are several great articles out there, that explains the pros and cos pretty well, so I am not gonna take away the feeling of _eureka_. 

### How to handle styling? 

This was a long term struggle for me, until I found the perfect combination for the time being. My answer is: `scss modules` + `styled-components` together. 

You heard me well. Now, this might sounds a crazy combination, but serves me well. Let me show what I mean. 

Let's consider a pretty simple example:

```
const Profile = props => {
	const { profilePic } = props
	return (
		<div className={styles.profileContainer}>
            <p>
                John Doe
            </p>
		</div>
	)
}
```

Let's say we want have the user's prfile picture as a background image. In this case we would have to do this: 

```
const Profile = props => {
	const { profilePic } = props
	return (
		<div
            className={styles.profileContainer}
            style={{
                backgroundImage: url(`'${profilePic}'`)
            }}
        >
            <p>
                John Doe
            </p>
		</div>
	)
}
```

Well, this looks terrible, just look at it. This is something you don't want to do, unless you are forced. Insted, what I am doing in this case, calling `styled-components` to help. 

```
const Profile = styled.div`
    background-image: url('${props => props.profilePic}')
`
```

and then the function will look like this: 

```
const Profile = props => {
	const { profilePic } = props
	return (
		<Profile
            className={styles.profileContainer}
            profilePic={profilePic}
        >
            <p>
                John Doe
            </p>
		</Profile>
	)
}
```

Looks much better, doesn't it? Plus remember: inline styles are *not* your friend! Don't use it. 

# Git (& branches)

I am usually disabling commits to the `master` branch, since I am using that one to build and deploy the application, I am only using pull requests, to keep that branch up to date, and make the deploying process easier. As to do that, I am using the git's `pre-commit` hook, and a really simple bash script. You can check it out [here](https://gist.github.com/zilahir/bceea378ba70f99be7a14c68030b0d11).

Let's talk about [`husky`](https://github.com/typicode/husky), which can prevent you from bad git committing, and such. That's when `lint-staged` comes in handy. Since `husky` needs to be configured in the `package.josn` file. It works just like the `scripts` section in the same file. You can provide them scripts, to be run when comitting or pushing code to it's repository. 

```"husky": {
    "hooks": {
      "pre-commit": "yarn lint-staged"
    }
  },
```

Where `lint-staged` does the following: 

```
"lint-staged": {
    "*.{js,jsx}": [
      "yarn lint:js",
      "git add"
    ],
    "*.scss": [
      "yarn lint:scss",
      "git add"
    ],
    "*.{json,md,yml}": [
      "yarn format",
      "git add"
    ]
  },
```

Not a rocket science indeed, but it's extremely helpful. I can't live without these, I can tell you that. 


Ok, let's talk about some more serous stuff. The tech. 

## Frontend

I have already revealed, I have made my commitment to ReactJs, like 2 or 3 years ago. I have tried - though, slightly indeed - Vue, and Angular, but both seemed a bit weird to be honest. It was surely back in the days, maybe one of the very firsts versions of Angular, though I know they also have developed a lot during these past years, I am sticking with React. And that's a fact. 😉

Also mentioned, when I am starting a new project, recently I have started to use `hooks`. It's just mond blowing how much faster the development became, just by writing purely function components, and not classes. The Context api does it's job, though, I am making it ieven more powerful with `redux`. Safe to say, when one does say, `redux` becaame useless, once the `Context API` was introduced, i am disagreeing. I don't find that true. `Redux` still playes an important role. 

## Backend 

This is where the story could get more interesting. Sneak peek: it won't though. 😆

Sometimes using PHP, sometimes, and this is more frequent, using nodeJs. There is not really any preference, how I make the call at the very end, even though sometimes I like to think there is, couldn't really say so. 

If there is a legacy version of anything, like there is a `mysql` database in production, that can't be changed or whatever the reason might be, I am going with PHP, becasue it's just easier for me to handle `mysql` databases with PHP. One it comes to this, the solution for me is either Laravel, if I need to buuild something robust, `Lumen` framework otherwise. You gotta love that, it's micro-framework for writing API, and writing it FAST. 

One working on the project from scratch, I am going with `nodeJs`. With `nodeJs` I do have my own preference of course, which won't be suprising: `expressJs`. Even though recently I started to notice people are leaving `express` more and more, and started using the alternatives, such us `Fastify` or `Koa`, which gains popularity day by day. There is even an article I came across with, with the title [Forget ExpressJS](https://blog.logrocket.com/forget-express-js-opt-for-these-alternatives-instead/). You go ahead and read it!

## JWT 

You know what [`JWT`](https://en.wikipedia.org/wiki/JSON_Web_Token) is. When a server receives a JWT, it can guarantee the data it contains can be trusted because it’s signed by the source. No middleman can modify a JWT once it’s sent. Though some people you come across might claim that you should only use JWT for API authentocation mechanism. It's true in my believing as well. That's what it's for. I am not going to get deeper into JWT in this article, let's save that for later. THe important thing, it's super easy to use JWT with `expressJs`, in a middleware, using [`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken#readme) package. Easy-peasy. 

Of course, I need to mention, JWT is easy with Lumen also. Just use the [`tymon/jwt-auth:dev-develop`] package. I mean that's what I am using. 

## Databases 

Gonna be short here. If it's a PHP API, I am going with the old-good `mysql`. If it's `nodeJs` I am choosing something more _modern_. Like `mondogdb`, or `DyanmoDB`. There are a bunch of alternatives out there, though so far I haven't met the need just yet, to try out something else. Should I? Reach out to me, and give me suggestions! 

# Deployment 

Hah! One of the pest parts. Deploying are good, since that makes our application alive. That's why I always taken good care of the deployment, and it's processes. Building, tagging, releasing, every level. I am still suprised people are building there app, and uploading it to some VPS. I mean, boy, have some respect and sanity, and do it the way it supposed to. Write a deployment pipeline, tag the version, release it. 

I am using both AWS, and Netlify to deploy my stuff. The static frontend most of the times, are going to netlify, while the backend going to AWS. Lambda function, AWS Amplify, etc. Even better if you create a nce docker image, and using that for the backend deployment. 

As for the frontend, I have already mentioned this above briefly. Lock the `master` branch, set up the deployment within `netlify` which will be triggered from `Github` for example, once a `PR` is merged into the `master`. Automatically. Like magic, right? Forget about VPS, please. Let this be your new year resolution! 

If you decide you are going to deploy from docker, that's a bit of a longer run, but definitely worth it. I will leave here [this](https://www.youtube.com/watch?v=Sf3-16eJNII) video, where a fellow developers show how he does it. 

# Documentation 

I know. Everybody does hate it, but it's really crucial. The earlier you realize that, the less pain you will cause to yourself, or to your team. Write documentation, explain what you did, and how to use it. Recently I had a small personal project, I wrote a`GatsbyJs` starter. It has a pretty simple [documentation](https://github.com/zilahir/react-landing-page/blob/master/README.md), but it still does it job.

# Debugging

Everybody makes mistakes. The real advantage and power here is, how fast you can identify it, react, go ahead and fix it. There's something out there called [`Sentry`](https://sentry.io/welcome/). Now, Sentry is tool to track your error, and it's really powerful, the best thing happened with (web)developing, ( alonngside with `css-in-js` 😜).

Sentry helps you find the bugs in the code, creating reports about all of them, can create issues even! How cool is that! Plus, it provides all different type of information you need to be able to reproduce it. Where it happened, how it happened, saves the track trace. I strongly recommend to start using it today, becasue it's definitely a game changer. 
If you are using `redux` as I am, you will find [`redux-devtools-extension`](https://www.npmjs.com/package/redux-devtools-extension). That helps you look over your store, with cool features like pausing and locking, and much more. Here's an [article](https://medium.com/@zalmoxis/improve-your-development-workflow-with-redux-devtools-extension-f0379227ff83) describing how does it work.

There's also a `Visual Studio Code` extension called `Debugger for Chrome` that helps you debug React client side code. It allows you to set breakpoints in `Visual Studio Code`. [Here's](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial#_debugging-react) the corresponding documentation describes the whole thing. You gonna like this, even though it requires a bit of a setup too. 
