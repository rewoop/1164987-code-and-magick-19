'use strict';

(function () {
  var URL_POST = 'https://js.dump.academy/code-and-magick';
  var URL_GET = 'https://js.dump.academy/code-and-magick/data';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var loadAndErrorHandlers = function (request, load, error) {
    request.addEventListener('load', function () {
      if (request.status === StatusCode.OK) {
        load(request.response);
      } else {
        error('Статус ответа: ' + request.status + ' ' + request.statusText);
      }
    });
    request.addEventListener('error', function () {
      error('Произошла ошибка соединения');
    });
    request.addEventListener('timeout', function () {
      error('Запрос не успел выполниться за ' + request.timeout + 'мс');
    });

    request.timeout = TIMEOUT_IN_MS;
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    loadAndErrorHandlers(xhr, onLoad, onError);

    xhr.open('GET', URL_GET);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    loadAndErrorHandlers(xhr, onLoad, onError);

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
