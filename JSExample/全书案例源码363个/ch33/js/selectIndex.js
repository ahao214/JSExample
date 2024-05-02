// 图片点击事件
$('li').click(function () {
  $(this).toggleClass('selected');
  if ($('li.selected').length == 0)
    $('.select').removeClass('selected');
  else
    $('.select').addClass('selected');
  counter();
});

// 全选点击事件
$('.select').click(function () {
  if ($('li.selected').length == 0) {
    $('li').addClass('selected');
    $('.select').addClass('selected');
  }
  else {
    $('li').removeClass('selected');
    $('.select').removeClass('selected');
  }
  counter();
});

// 单个的图片点击事件
function counter() {
  if ($('li.selected').length > 0)
    $('.mark').addClass('selected');
  else
    $('.mark').removeClass('selected');
  $('.mark').attr('data-counter',$('li.selected').length);
}
