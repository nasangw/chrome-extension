$(() => {
  chrome.storage.sync.get('limit', budget => {
    $('#limit').val(budget.limit);
  });

  $('#saveLimit').on('click', () => {
    var limit = $('#limit').val();
    if(limit) {
      if(typeof limit !== 'number') {
        limit = parseInt(limit);
      }
      chrome.storage.sync.set({
        'limit': limit
      }, () => {
        close();
      });
    }
  });

  $('#resetLimit').on('click', () => {
    chrome.storage.sync.set({
      'limit': 0
    });
  });

  $('#resetTotal').on('click', () => {
    chrome.storage.sync.set({
      'total': 0
    }, () => {
      var notifOptions = {
        type: 'basic',
        iconUrl: 'icon48.png',
        title: 'Total reset!',
        message: 'Total has been reset to 0!'
      };

      chrome.notifications.create('totalNotif', notifOptions);
    });
  })
});