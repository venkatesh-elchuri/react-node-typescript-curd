import "whatwg-fetch";


function checkStatus(response) {
    if ((response.status >= 200 && response.status < 300)) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

function parseJSON(response) {
      return response.json();
}

export default function request(url, options={}) {
  
    let _options ={};
	_options ={
        	...options,
    };

    return fetch(url, _options)
      .then(checkStatus)
      .then(parseJSON);
}