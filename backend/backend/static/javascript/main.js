var states = {
  'pending': 'This item pending a review. If you are the owner, sit tight and someone will review shortly!',
  'followup': 'The author has replied since the review of this item.',
  'ready': 'Your merge has been approved and will land in the charm store soon!',
  'abandonded': 'This has been marked as abandonded and is no longer considered a valid review',
  'reviewed': 'Feedback by the charm community has been placed and follow up by the author is required',
  'inprogress': 'Review has been passed and the item needs more work by the author',
  'closed': 'This review has been completed and the charm in the store!',
  'merged': 'This fix has landed and is in the charm store!'
};

$(function() {
  $('table').tablesort();
  $('.ui.checkbox').checkbox();
  $('.ui.checkbox input')
    .change(function() {
      $(this).parents().eq(3).find('.' + $(this).attr('name')).toggle();
    })
  ;
  $('h1 .icon.filter')
    .click(function() {
      $(this).closest('.review').children('.filter.controls').slideToggle();
    })
  ;
  $('.state').each(function() {
    $(this).data('content', states[$(this).data('sort-value').toLowerCase()]);
    $(this).data('title', $(this).text());
  });
  $('.state').popup();
  $('[data-content]').popup();
  $('.user.select').select2({
    minimumInputLength: 2,
    ajax: {
      url: '/user/+search',
      dataType: 'json',
      data: function (term) {
        return {
          q: term
        };
      },
      results: function (data, page) {
        return {results: data};
      }
    },
    initSelection: function(element, callback) {
      var id = $(element).val();
      if(id !== "") {
        $.ajax("/user/"+id, {
          dataType: 'json'
        }).done(function(data) { callback(data.user); });
      }
    },
    formatResult: movieFormatResult, // omitted for brevity, see the source of this page
    formatSelection: movieFormatSelection,  // omitted for brevity, see the source of this page
    dropdownCssClass: "bigdrop",
    escapeMarkup: function (m) { return m; }
  });
  $('.select').select2();
});
