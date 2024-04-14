export const utilService = {
  makeId,
  saveToStorage,
  loadFromStorage,
  timeToString,
  getTimeDifference,
};

function makeId(length = 6) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}


function getTimeDifference(dateToCompare) {
  const actualDate = new Date(dateToCompare);

  return Date.now() - actualDate.getTime();
}

function timeToString(objectDate) {

  const actualDate = new Date(objectDate);

  const timeDifference = getTimeDifference(actualDate)

  // Convert the time difference to hours
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  // Convert the time difference to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  // Convert the time difference to weeks
  const weeksDifference = Math.floor(
    timeDifference / (1000 * 60 * 60 * 24 * 7)
  );


  if (weeksDifference === 0) {
    if (hoursDifference === 0) {
      return `Now`
    }
    if (daysDifference == 0) {
      return `${hoursDifference}h`
    }

    return `${daysDifference}d`
  }

  return `${weeksDifference}w`
}
