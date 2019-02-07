# λ lambdas

A collection of scripts to modify requests and return something fun.

A lot of these are used in my company's Slack team, but don't require advanced authorization.

## 👩‍💻👨‍💻 contributing

I'd welcome any contributions! Let's collaborate on fun ideas in this [project's issues](https://github.com/hjdarnel/lambdas/issues)!

## 🚀 getting started

Getting started in this repo is really straightforward! It's just a handful of steps.

### run locally

All lambdas must export a default function to be called. This is the entrypoint of your serverless function. 

Using `micro` locally we can simulate a serverless process spinning up.

```js	
    git clone https://github.com/hjdarnel/lambdas.git
    cd lambdas
    
    npm install
    npm run start:<lambda-name>
    
    // or, if a script doesn't exist yet
    micro-dev ./path-to-lambda.js
```

A link will be copied to your clipboard, allowing you to run your function locally via any HTTP client.

### deploying

This repository is deployed on [Now ∆](https://zeit.co/now), which handles our production routing and serverless processing. The `master` branch is automatically deployed to lambda.darnell.io.

Any pull requests will be given a pseudo-anonymous url by Now, and a test environment so we can test the PR before merging it. There will be on the pull request, and it will look something like lambda-ao81038vh.now.sh. You can also hit this with any HTTP client to test function behavior.

### catching production values

If needed for local testing, I like to swap out my production url in my client to an online catcher like [RequestBin](https://requestbin.fullcontact.com/) or [httpbin.org](http://httpbin.org/).

Then you can simulate this request on your own machine, using the steps to run locally above!

## 👱🏻‍♂️ author

Hi, I'm [Henry](http://darnell.io)! I'm a full-stack engineer that likes to hack away on projects and follow the latest trends. Feel free to reach out!
