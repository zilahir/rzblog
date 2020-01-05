This is a quick review about how I have been working on the projects I’ve been working on. Either professional projects at my full time job, or my personal project I did just for myself.  This will discuss technologies I choose, solutions, settings, and more. Bare with me.

Here’s a short table of contents I wish to cover in this article. 

1) IDE
2) IDE Settings & Extensions
3) Project setup
4) Git (& branches)
5) Eslint
6) Husky
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


