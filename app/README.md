# ToDo App

This is a basic todo app

## Running in development

Install Dependancies
```bash
$ npm install
```

Copy .env.sample to .env and fill in the variables that are there.

Run app in development mode
```bash
$ npm run dev
```

## This project utilizes a mix of styled-components and CSS Modules
- If the classname is hashed (and contains sc) when running, it is a styled component
- Else, the classname will appear as styles.* and there is a CSS module with all of the CSS that applies to that component