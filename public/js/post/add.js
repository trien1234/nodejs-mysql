activeMenu()
CKEDITOR.replace('description');
CKEDITOR.config.extraPlugins = 'uploadimage';
$('#images').fileinput({
  theme: 'fa',
  uploadExtraData: function () {
    return {
      _token: $("input[name='_token']").val()
    };
  },
  allowedFileExtensions: ['jpg', 'png', 'gif'],
  overwriteInitial: false,
  maxFileSize: 2000,
  maxFileNum: 9,
  slugCallback: function (filename) {
    return filename.replace('(', '_').replace(']', '_');
  }
});

$('.btnPost').click(function () {
  let description = CKEDITOR.instances['description'].getData()
  let title = $('.title').val();
  let summaryContent = $('.summaryContent').val();
  let plugin = $('#images').data('fileinput');
  let files = $('input[type=file]')[0].files
  let formData = new FormData();
  
  formData.append('title', title);
  formData.append('summaryContent', summaryContent);
  formData.append('description', description);
  if (files.length > 0) {
    Object.values(files).forEach(e => {
      formData.append('images', e);
    })
  }
  $.ajax({
    url: `/admin/new-post`,
    type: 'POST',
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: function (res) {
      if (res.data) {
        showAlert('success', res.message)
      } else {
        showAlert('failed', res.message)
      }
    }
  });
})
