## About

This app uses Grommet and react-dropzone to create a drag and drop file uploader. To use this example in your project, you can add the Dropzone folder and MyForm.js files directly to your project. 

### Dropzone API
The following props can be applied to Dropzone to affect its functionality:

| name | type | default | description |
|---|---|---|---|
| accept | string | undefined | The type of file the dropzone can accept. (e.g.: "image/png")  |
| multiple | boolean | false | Determines if the dropzone should accept a single file or multiple files.  |
| showFileSize | boolean | false | Determines if the size of the file should be displayed. |
| showPreview | boolean | false |  Determines if a thumbnail preview of the image should be displayed. |

### How to connect Dropzone with a form
This app puts the Dropzone within a form to demonstrate how to do file uploading. If you intend to use the Dropzone for file upload, you will need to include these functions within your form (see `MyForm.js` for how it is implemented). Additionally, a `fileUpload.js` file has been provided as a starter for how to connect the form data with your database. 
```
const [files, setFiles] = useState([]);

const addFiles = newFiles => {
    setFiles(...files, newFiles);
};

const deleteFiles = remainingFiles => {
    setFiles(remainingFiles);
};

const handleSubmit = event => {
    event.preventDefault();
    // You will need to update ../utils/fileUpload with the correct url for
    // where the data will be sent to.
    fileUpload({ firstName, lastName, files });
};
```
To connect the above functions to the Dropzone, you will need to add these props:
```
<Dropzone onAddFiles={addFiles} onDeleteFiles={deleteFiles} />
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
