let tableNotification = $('#table-notification').DataTable({
    "ajax": "/cms/notificationList",
    'serverSide': true,
    "processing": true,
    "searching": true,
    "columns": [
        { "data": "FromUserId" },
        { "data": "ToUserId" },
        { "data": "Title" },
        { "data": "Content" }, 
      ],
    "columnDefs": [
      {
        "render": function (data, type, row,recordsTotal) {
          return recordsTotal.row+1
        },
        "targets": 0  
      },
      { "render": function (data, type, row) {
          let FromUser = row.FromUserId !== null ? row.FromUser : '3SHome'
          return FromUser
        },
        "targets": 1
      },
      {
        "render": function (data, type, row) {
          let ToUser = row.ToUser !== '' ? row.ToUser : 'N/A'
          return ToUser
        },
        "targets": 2
      },
      {
        "render": function (data, type, row) {
          let Row = JSON.parse(row.Content)
          let Title = Row.title !== '' ? Row.title : 'N/A'
          return Title
          
        },
        "targets": 3
      },

      {
        "render": function (data, type, row) {
          let Row = JSON.parse(row.Content)
          let Content = Row.content !== '' ? Row.content : 'N/A'
          return Content
          
        },
        "targets": 4
      },
      {
        "render": function (data, type, row) {
          return `
            <a class="deleteNotification" href="#" id="${row.Id}" title="Xóa"><i class="fas fa-trash text-danger"></i></a>
          `
        },
        "targets": 5
      }
    ]
  });

  $('#table-notification').on('click', '.deleteNotification',function(){
    let id = $(this).attr('id')
    let data = {'id':id}
      if(confirm("Bạn có chắc chắn muốn xóa")){
          $.post('/cms/deleteNotification/',data, function(res){
              if(res.data){
                  showAlert('success',res.Message)
                  setTimeout(function(){location.reload(  )},300)
              }
              else{
                  showAlert('failed',res.Message)
              }
          })
      }
      return false
  })