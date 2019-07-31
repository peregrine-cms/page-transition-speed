# PTS - Page Transition Speed

A simple tool to measure page transition speed with google chrome/puppeteer

## Prerequisites

Install puppeteer.

```
npm i puppeteer-core
```

## Running PTS


```
node index.js <protocol/domain> <url1> <url2>
```

The tool goes to <protocol/domain><url1> and then finds a link with `href=<url2>` and clicks it. 

The output is a list of 5 tries performing that click.

Example:

```
node index.js https://www.peregrine-cms.com / /content/sites/peregrine/about.html
```

