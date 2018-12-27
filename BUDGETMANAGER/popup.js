$(() => {
  chrome.storage.sync.get(['total', 'limit'], budget => {
    $('#total').text(budget.total);
    $('#limit').text(budget.limit);
  });

  $('#spendAmount').on('click', ev => {
    ev.preventDefault();
    chrome.storage.sync.get(['total', 'limit'], budget => {
      var newTotal = 0;
      console.log(budget);
      if(budget.total) {
        newTotal += parseInt(budget.total);
      }

      var amount = $('#amount').val();
      if(amount) {
        newTotal += parseInt(amount);
      }

      chrome.storage.sync.set({
        'total': newTotal
      }, () => {
        if(amount && newTotal >= budget.limit) {
          var notifOptions = {
            type: 'basic',
            iconUrl: 'icon48.png',
            title: 'limit reached!',
            message: 'Uh oh! Looks like you\'ve reached your limit!'
          };

          chrome.notifications.create('limitNotif', notifOptions);
        }
      });

      $('#total').text(newTotal);
      $('#amount').val('');
    });
  });
});