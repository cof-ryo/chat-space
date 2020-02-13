$(function(){

  function buildHTML(message){
    if(message.image) {
      var html = 
      `<div class="list__group" data-message-id =  "${message.id}" >
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
      `<div class="list__group" data-message-id = "${message.id}" >
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

  var reloadMessages = function(){
    last_message_id = $('.list__group:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.list').append(insertHTML);
        $('.list').animate({ scrollTop: $('.list')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert("メッセージ更新に失敗しました");
    })
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
  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }
});