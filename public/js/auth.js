
$('.btnLogin').click(function () {
  let Email = $('#admin_Email').val()
  let Password = $('#admin_Password').val()

  $.post('/cms/login', { Email, Password }, res => {
    if (res.data) {
      showAlert('success', res.Message)
      setTimeout(function(){location.href=res.prevPage || '/cms/dashboard'}, 800)
    } else {
      showAlert('failed', res.Message)
    }
  })
})

$('.btnRegister').click(function () {
  let username = $('#user-username').val()
  let password = $('#user-password').val()
  $.post('/admin/register', { username, password }, res => {
    if (res.data) {
      showAlert('success', res.message)
    } else {
      console.log(res.message)
      showAlert('failed', res.message)
    }
  })
})

$('.sAdminLogin').click(function () {
  let username = $('#user-name').val()
  let password = $('#user-password').val()
  $.post('/super-admin/login', { username, password }, res => {
    if (res.data) {
      showAlert('success', res.message)
      location.href = res.prevPage || 'dashboard'
    } else {
      showAlert('failed', res.message)
    }
  })
})

$('.sAdminRegister').click(function () {
  let username = $('#user-username').val()
  let password = $('#user-password').val()
  $.post('/super-admin/register', { username, password }, res => {
    if (res.data) {
      showAlert('success', res.message)
    } else {
      console.log(res.message)
      showAlert('failed', res.message)
    }
  })
})