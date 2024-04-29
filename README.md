SvelteKit Stream Issue Demo
===========================

This repository is a demo app to showcase and isolate a file descriptor leak, most likely due to streams not being closed automatically.

How to run
==========

This is built and run just like any SvelteKit app that uses NodeJS:

```bash
yarn build
node build
```

The index page (the `/` page) displays steps on how to observe the issue.
