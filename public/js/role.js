$('.btnSaveRole').click(function(){
    let Name = $('#Name').val()
    let Type = $('#Type').val()
    let Description = $('#Description').val()
    let data = {Name,Type,Description}
    $.post('/cms/createRole',data,function(res){
        if(res.data){
            showAlert('success',res.Message)
            setTimeout(function(){location.href = "/cms/listRole"},600)
        }
        else {
            showAlert('failed',res.Message)
        }
    })
})



let tableRole = $('#table-role').DataTable({
    "ajax": "/cms/roleList",
    'serverSide': true,
    "processing": true,
    "searching": true,
    "columns": [
        { "data": "Name" },
        { "data": "Type" },
        { "data": "Description" },
      ],
    "columnDefs": [
      {
        "render": function (data, type, row,recordsTotal) {
          return recordsTotal.row+1
        },
        "targets": 0  
      },
      {
        "render": function (data, type, row) {
        //   console.log("data",row) //giá trị của từng cột = row.FullName
          let Name = row.Name !== '' ? row.Name : 'N/A'
          return Name
        },
        "targets": 1
      },
      {
        "render": function (data, type, row) {
          let Type = row.Type !== '' ? row.Type : 'N/A'
          return Type
        },
        "targets": 2
      },
      {
        "render": function (data, type, row) {
          let Description = row.Description !== '' ? row.Description : 'N/A'
          return Description
          
        },
        "targets": 3
      },
    //   {
    //     "render": function (data, type, row) {
    //       return `
    //         <a href="#" class="updateHouse" id="${row.Id}" title="Sửa" ><i class="fas fa-edit edit-teacher" data-toggle="modal" data-target="#myModal"></i></a>
    //         <a class="deleteHouse" href="#" id="${row.Id}" title="Xóa"><i class="fas fa-trash del-teacher"></i></a>
    //       `
    //     },
    //     "targets": 3
    //   }
    ]
  });

// $('#table-house').on('click', '.deleteHouse',function(){
//     let id = $(this).attr('id')
//     let data = {'id':id}
//     if(confirm("Bạn có chắc chắn muốn xóa")){
//         $.post('/cms/deleteHouse/',data, function(res){
//             if(res.data){
//                 showAlert('success',res.Message)
//                 setTimeout(function(){location.reload()},300)
//             }
//             else{
//                 showAlert('failed',res.Message)
//             }
//         })
//     }
//     return false
// })

