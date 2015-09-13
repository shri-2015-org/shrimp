[![Stories in Ready](https://badge.waffle.io/shri-2015-org/shrimp.png?label=ready&title=Ready)](https://waffle.io/shri-2015-org/shrimp)
# shrimp
Shrimp chat application by ShrimpJS SHRI-2015 team

Run `npm run dev`  
And see to here `http://localhost:2992/webpack-dev-server/bundle`

### Run for production
`npm run master`

#### Convention of branch naming:
New feature: `feature/{feature_name}#{number}`

#### Examples:

  * `feature/hint`
  * `feature/massage_box#123`


### File structure
```
app/
  components/ <- blocks here
    block/
      index.jsx <- required
      styles.scss
      data.json
      images/
        *.png
        *.img
        *.gif
        *.svg
    fontsх
      *.woff
      *.woff2
    stylesх
      base/
        *.scss
      helpers/
        *.scss

server/
  server.js
  lib/
    *.js

utils/
  *.js <- any utils for building

build/ <- all compile to here
```
