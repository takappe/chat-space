$(function() {
  function buildHTML(message){
    if( message.image ) {
      let html =
        `<div class="Sender">
          <div class="Sender__name">
            ${message.user_name}
          </div>
          <div class="Sender__date">
            ${message.created_at}
          </div>
        </div>
        <div class="ChatMessage">
          <div class="Message__content">
            ${message.content}
          </div>
        <img class="Message__image" src="${message.image}">`
      return html;
    } else {
      let html =
        `<div class="Sender">
          <div class="Sender__name">
            ${message.user_name}
          </div>
          <div class="Sender__date">
            ${message.created_at}
          </div>
        </div>
        <div class="ChatMessage">
          <div class="Message__content">
            ${message.content}
          </div>
        </div>`
        return html;
      };
  }

  $(function() {
    $('.Form').on('submit', function(e) {
      e.preventDefault()
      let formData = new FormData(this);
      let url = $(this).attr('action');
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data) {
        let html = buildHTML(data);
        $('.Messagesdisplay').append(html);
        $('.Messagesdisplay').animate({ scrollTop: $('.Messagesdisplay')[0].scrollHeight});
        $('form')[0].reset();
        $('.Input__send').prop('disabled', false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      });
    });
  });
});