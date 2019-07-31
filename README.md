# PTS - Page Transition Speed

A simple tool to measure page transition speed with google chrome/puppeteer

## Installing PTS

npm install @peregrinecms/page-transition-speed -g

## Running PTS

```
pts <url> <targetLink>
```

The tool opens a browser with <url> and then finds a link with `href=<url2>` and clicks it.
If no link can be found it will output all possible links 

The output is a list of 5 tries performing that click.

Example:

```
pts https://www.peregrine-cms.com/ /content/sites/peregrine/about.html
```

For more command line options please use

```
pts -h
```

```
Usage: pts [options] <url> <targetLink>

Options:
  --version       Show version number               [boolean]
  -h, --help      Show help                         [boolean]
  -t, --throttle  throttle connection               [boolean]
  -r, --repeat    repeat test x times            [default: 5]
  -s, --show      show browser                      [boolean]
```

## Prerequisites for Development

Install puppeteer.

```
npm i puppeteer-core
```
