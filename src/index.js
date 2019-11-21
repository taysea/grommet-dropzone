import React from "react";
import { render } from "react-dom";
import { Box, Grommet, grommet } from "grommet";
import { MyForm } from "./components";
import * as serviceWorker from "./serviceWorker";

/**********
 * This dropzone form has defualt bevahior of accepting
 * multiple files, displaying the file size, and accepting any file type.
 *
 * For single file upload only:
 * - Remove "multiple" prop from the Dropzone component in MyForm.js
 *
 * To hide file size:
 * - Remove "showSize" prop from the Dropzone component in MyForm.js
 *
 * To only accept certain file types:
 * - Add "accept" prop to the Dropzone component in MyForm.js and set
 * its value to something like "accept='image/jpeg'"
 ********/

const App = () => {
  return (
    <Grommet theme={grommet} full>
      <Box align="center" pad="medium">
        <MyForm />
      </Box>
    </Grommet>
  );
};

render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
