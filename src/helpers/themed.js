import styled from "styled-components";
import {isFunction, get} from "lodash";

import theme from "../theme.json";

const themeVar = s => get(theme, s, s);

const getStyledComponent = elem => (strings, ...closures) => {
   return styled[elem](
      strings,
      ...closures.map(c =>
         isFunction(c) ? props => themeVar(c(props)) : themeVar(c)
      )
   );
};

const themed = new Proxy(
   {theme},
   {
      get: function(object, property) {
         return property in object
            ? object[property]
            : getStyledComponent(property);
      }
   }
);

export default themed;
