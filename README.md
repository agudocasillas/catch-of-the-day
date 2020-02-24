# React App to generate order of fishes based on a demo JSON file with authentication OAuth 2.0, using localStorage and firebase to persist the state.

The code in this repo meant to be a reference point for anyone following along with the video course.

## To Start

**Note** - One of the dependencies is Xcode. While installing, if you run into an error that says, `gyp: No Xcode or CLT version detected!` please do the following:

1. Execute `xcode-select --install` in terminal.
2. Delete the "node_modules" folder located within the "catch-of-the-day" folder.
3. Execute `npm install` once more.

### Code Use

You are welcome to use this code in your own applications. If you would like to use it for training purposes, please shoot me a message first to make sure it's okay.

## htaccess

Here is the .htaccess file we use in the apache deployment video

```
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```
