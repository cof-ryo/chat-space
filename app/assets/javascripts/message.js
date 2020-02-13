$(function(){

  function buildHTML(message){
    if(message.image) {
      var html = 
      `<div class="list__group">
          <div class="list__group__name">
            ${message.user_name}
            <div class="list__group__name__day">
              ${message.created_at}
            </div>
          </div>
        <div class="list__group__message">
          ${message.content}<br>
          <img class="list__group__message__image" src=${message.image} >
        </div>
      </div>`
    } else {
      var html = 
      `<div class="list__group">
          <div class="list__group__name">
            ${message.user_name}
            <div class="list__group__name__day">
              ${message.created_at}
            </div>
          </div>
        <div class="list__group__message">
          ${message.content}
          <br>
        </div>
      </div>`
    }
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.list').append(html);
      $('.list').animate({ scrollTop: $('.list')[0].scrollHeight});
      $('form')[0].reset()
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
    return false;
  });
});