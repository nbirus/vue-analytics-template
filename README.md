# vue-analytics-template
A base set of components for an analytics website..

# Quick start for mac
- `npm install`
- `npm run dev-mac`
- open `http://0.0.0.0:8080/`

# Commands:
- `npm run dev` starts webpack server with hotreload for windows machines
- `npm run dev-mac` starts webpack server with hotreload for mac
- `npm start` starts webpack server with hotreloaded style token generation
- `npm run theo` build style tokens

# Token Generation
This app contains dynamic design token generation useing Theo.  To generate a new design token you can edit the .yml files in 
`src/tokens`.  If you run the command `npm start`, the app will reload every time you make a change.  
