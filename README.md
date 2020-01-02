[![Netlify Status](https://api.netlify.com/api/v1/badges/98771022-57d1-4a74-9b9b-d7e690d5b2f2/deploy-status)](https://app.netlify.com/sites/grommet-dropzone/deploys) - [grommet-dropzone.netlify.com](https://grommet-dropzone.netlify.com)

## About

This app uses Grommet and react-dropzone to create a drag and drop file uploader. You can use this repository as a starting point to build your app on top of, or you can add these files into an existing application. If you have feedback or requests, please file them as an issue.

### Dropzone API
The following props can be applied to Dropzone to affect its functionality:

| name | type | default | description |
|---|---|---|---|
| accept | string | undefined | The type of file the dropzone can accept. (e.g. "image/png", "file/pdf", "image/\*")  |
| multiple | boolean | false | Determines if the dropzone should accept a single file or multiple files.  |
| onAddFiles | function | undefined | A handler to track when files are added to the dropzone. |
| onDeleteFiles | function | undefined | A handler to track when files are deleted from the dropzone. |
| showFileSize | boolean | false | Determines if the size of the file should be displayed. |
| showPreview | boolean | false |  Determines if a thumbnail preview of the image should be displayed. |

### How to use Dropzone in a form
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
