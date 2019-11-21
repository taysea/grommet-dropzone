export function fileUpload({ firstName, lastName, files }) {
  let formData = new FormData();

  files.forEach(name => {
    formData.append(name, files[name]);
  });
  formData.append(firstName, firstName);
  formData.append(lastName, lastName);

  // adjust the url below with your own
  return fetch("https://my-website.com/api/file/upload", {
    method: "POST",
    // if your app is storing auth tokens in a cookie include credentials
    // credentials: 'include',
    body: formData
  })
    .then(response =>
      response.json().then(json => ({
        status: response.status,
        statusText: response.statusText,
        json
      }))
    )
    .then(({ status, statusText, json }) => {
      if (status >= 400) {
        // API returned a crappy response
        console.log("error:", status, statusText, json);
      } else {
        // Upload done!
        return json;
      }
    })
    .catch(err => console.log(err));
}
