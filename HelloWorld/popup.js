$(function() {
  $('#name').on('keyup', () => {
    $('#greet').text(`Hello ${$('#name').val()}`);
  });
})