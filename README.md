# scheduler
Simple scheduler written in javascript using AngularJS with store data in localStorage

## Demo
  [scheduler](http://dmytrokh.github.io/scheduler)

## Prerequisites

You need [git][git] to clone repository.

Also You must have [node.js][node.js] and its package manager [npm][npm] installed

..and [bower][bower] to install dependencies

    $ npm install -g bower

## Install

Clone the repository using [git][git]:

    git clone https://github.com/dmytrokh/scheduler.git <new-folder-name>
    cd <new-folder-name>

### Install dependencies
    $ npm install
    $ bower install

### Running development server
    $ gulp serve
    
App will be available at 

    http://localhost:3000/

### Running tests  
    $ gulp test



## Running the app

### Compile
    $ gulp build

Runs like a typical express app:

    node web.js

App will be available at

    http://localhost:5000/

[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node.js]: http://nodejs.org
