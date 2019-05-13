(function() {
  var interval;
  var data = TABLE_DATA;

  function init() {
    document.getElementById('start').addEventListener('click', randomRepopulate);
    document.getElementById('stop').addEventListener('click', stopRandomization);
    document.getElementById('sort').addEventListener('click', sortedRepopulate);

    loadData(data);
  };

  function addTableRow(item) {
    var tableBody = document.getElementsByTagName("tbody")[0];
    var newRow = tableBody.insertRow(item);

    var idColumn = newRow.insertCell(0);
    idColumn.appendChild(document.createTextNode(item.id));

    var imageEl = document.createElement('img');
    imageEl.setAttribute('src', item.thumbnailUrl);

    var imageColumn = newRow.insertCell(1);
    imageColumn.appendChild(imageEl);

    var nameColumn = newRow.insertCell(2);
    nameColumn.appendChild(document.createTextNode(item.name));

    var priceColumn = newRow.insertCell(3);
    priceColumn.appendChild(document.createTextNode(item.price));

    return tableBody.appendChild(newRow);
  }

  function clearTableRows() {
    var tableBody = document.getElementsByTagName("tbody")[0];
    var limit = data.length;

    while(limit > 0) {
      tableBody.removeChild(tableBody.childNodes[limit - 1]);
      limit = limit - 1;
    }
  }

  function loadData(data) {
    return data.map(function(item) {
      return addTableRow(item);
    });
  }

  function randomizeData() {
    var factor = data.length, temp, index;

    while (factor > 0) {
      index = Math.floor(Math.random() * factor);
      factor--;
      temp = data[factor];
      data[factor] = data[index];
      data[index] = temp;
    }
  
    return data;
  }

  function randomRepopulate() {
    interval = window.setInterval(function(){
      clearTableRows();
      randomizeData();
      loadData(data);
    }, 1000);
  }

  function stopRandomization() {
    window.clearInterval(interval);
  }

  function sortData() {
    return data.sort(function (a, b) {
      if (a.price - b.price === 0) {
        return parseInt(a.id) - parseInt(b.id);
      }
      return a.price - b.price;
    });
  }

  function sortedRepopulate() {
    clearTableRows();
    sortData(data);
    loadData(data);
  }

  window.onload = init();
})();
