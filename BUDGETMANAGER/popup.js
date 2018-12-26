$(() => {
  chrome.storage.sync.get('total', budget => {
    $('#total').text(budget.total);
  });

  $('#spendAmount').on('click', () => {
    chrome.storage.sync.get('total', budget => {
      var newTotal = 0;
      if(budget.total) {
        newTotal += parseInt(budget.total);
      }

      var amount = $('#amount').val();
      if(amount) {
        newTotal += parseInt(amount);
      }

      chrome.storage.sync.set({
        'total': newTotal
      });

      $('#total').text(newTotal);
      $('#amount').val('');
    });
  });
});