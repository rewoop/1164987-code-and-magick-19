'use strict';

(function () {
  var setupDialogElement = document.querySelector('.setup');
  var openButton = document.querySelector('.setup-open');
  var closeButton = setupDialogElement.querySelector('.setup-close');
  var dialogHandler = setupDialogElement.querySelector('.upload');

  var DEFAULT_WINDOW_POSITION_TOP = 80 + 'px';
  var DEFAULT_WINDOW_POSITION_LEFT = 50 + '%';

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var resetDialogPosition = function () {
    setupDialogElement.style.top = DEFAULT_WINDOW_POSITION_TOP;
    setupDialogElement.style.left = DEFAULT_WINDOW_POSITION_LEFT;
  };

  openButton.addEventListener('click', resetDialogPosition);
  closeButton.addEventListener('click', resetDialogPosition);

  window.dialog = {
    DEFAULT_WINDOW_POSITION_TOP: DEFAULT_WINDOW_POSITION_TOP,
    DEFAULT_WINDOW_POSITION_LEFT: DEFAULT_WINDOW_POSITION_LEFT
  };
})();
