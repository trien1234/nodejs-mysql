activeMenu()
const RoleType = {
        CMS : 1,
        CMSAndManager: 2,
        Fixed: 3,
        Resident: 4
    }

$('#RoleId').change(function(e){
  e.preventDefault
  let role = $('#RoleId').find(":selected").val()
  if(role==4){
    $('#HouseIdR').removeClass('hidden')
    $('#FixerGroupIdR').addClass('hidden')
    $('#FixerGroupId').find(":selected").prop("selected", false);
  }else if(role==7){
    $('#FixerGroupIdR').removeClass('hidden')
    $('#HouseIdR').addClass('hidden')
    $('#HouseId').find(":selected").prop("selected", false);
  }else{
    $('#HouseIdR').addClass('hidden')
    $('#FixerGroupIdR').addClass('hidden')
  }
})

$('.btnSaveUser').click(function(){
  let FullName = $('#FullName').val()
  let Email = $('#Email').val()
  let RoleId = $('#RoleId').find(":selected").val()
  let FixerGroupId = $('#FixerGroupId').find(":selected").val()
  let HouseId = $('#HouseId').find(":selected").val()
  let Tel  = $('#Tel').val()
  let Password  = $('#Password').val()
  $.post('/cms/addUser', { FullName, Email, RoleId, FixerGroupId, HouseId, Tel, Password }, res => {
    if (res.data) {
      showAlert('success', res.Message)
      setTimeout(function(){location.reload()}, 600)
    } else {
      console.log(res.Message)
      showAlert('failed', res.Message)
    }
  })
})

let tableUser = $('#table-users').DataTable({
  "ajax": `/cms/getListUser?role=${RoleType.Resident}`,
  'serverSide': true,
  "processing": true,
  "columns": [
    { "data": "STT" },
    { "data": "Avatar" },
    { "data": "FullName" },
    { "data": "Email" },
    { "data": "Tel" },
    { "data": "House" }
  ],
  "columnDefs": [
    {
      "render": function (data, type, row) {
        return `<a href="javascript:void(0)" class="avatar avatar-online" id = ${row.Id}>
                  <img style="width:30px;height:30px;max-width:unset" src="${row.Avatar?row.Avatar:window.location.origin+'/public/images/noavatar.png'}" alt="" />
                </a>`
      },
      "targets": 0
    },
    {
      "render": function (data, type, row) {
        let FullName = row.FullName !== '' ? row.FullName : 'N/A'
        return FullName
      },
      "targets": 1
    },
    {
      "render": function (data, type, row) {
        let Email = row.Email !== '' ? row.Email : 'N/A'
        return Email
      },
      "targets": 2
    },
    {
      "render": function (data, type, row) {
        let Tel = row.Tel !== '' ? row.Tel : 'N/A'
        return Tel
        
      },
      "targets": 3
    },
    {
      "render": function (data, type, row) {
        return `<code>${row.House?row.House:''}</code></br>`    
      },
      "targets": 4
    },
    {
      "render": function (data, type, row) {
        return `
          <a href="javascript:void(0)"title="Sửa" class="editResident"><i class="fas fa-edit"></i></a>
          <a class="deleteUser" href="#" id="${row.Id}" title="Xóa"><i class="fas fa-trash text-danger"></i></a>
        `
      },
      "targets": 5
    }
  ]
});

$('#searchUserByHouse').on('change', function(){ 
  let BuildingId = $('#searchUserByHouse').find(":selected").val()
  tableUser.ajax.url( '/cms/getListUser?role=4&BuildingId='+BuildingId).load();
})



$('#table-users tbody').on('click', '.editResident', function () {
  let _this = $(this)
  let data = tableUser.row(_this.closest('tr')).data();
  $('.modal #fullNameHeader').html(data.FullName)
  $('.modal #fullName').val(data.FullName)
  $('.modal #userEmail').val(data.Email)
  $('.modal #address').val(data.Address)
  $('.modal #phone').val(data.Tel)
  $('.modal .save-resident-data').attr('id', data.Id)
  $('.modal').modal('show')
});
$('.save-resident-data').click(function(){
  let FullName = $('.modal #fullName').val()
  let Email = $('.modal #userEmail').val()
  let Address = $('.modal #address').val()
  let Tel = $('.modal #phone').val()
  let Id = $(this).attr('id')
  $.post('/cms/editUsers', { FullName, Address, Id }, res =>{
    if (res.data){
      $('.modal').modal('hide')
      showAlert('success', res.Message)
      setTimeout(function(){location.reload()}, 300)
    }else {
      console.log(res.Message)
      showAlert('failed', res.Message)
    }
  })
})
$('#table-users').on('click', '.deleteUser', function () {
  let id = $(this).attr('id')
  if (confirm("Bạn có chắc chắn muốn xóa?")) {
    $.post('/cms/deleteUserPost/'+id, function(res){
      if(res.data){
        showAlert('success', res.message)
        setTimeout(function(){location.reload()}, 300)
      }else{
        showAlert('failed', res.message)
      }
    })
  }
  return false;
});


//Fixer table
let tableFixer = $('#table-fixer').DataTable({
  "ajax": `/cms/getListUser?role=${RoleType.Fixed}`,
  'serverSide': true,
  "processing": true,
  // "search": {
  //   "regex": true
  // },
  "columns": [
    { "data": "FullName" },
    { "data": "FixerGroup" },
    { "data": "Email" },
    { "data": "Tel" },
    { "data": "Address" },
    { "data": "DOB" }
  ],
  "columnDefs": [
    {
      "render": function (data, type, row) {
        return `<a href="javascript:void(0)" class="avatar avatar-online" id = ${row.Id}>
                  <img style="width:30px;height:30px;max-width:unset" src="${row.Avatar?row.Avatar:window.location.origin+'/public/images/noavatar.png'}" alt="" />
                </a>`
      },
      "targets": 0
    },
    {
      "render": function (data, type, row) {
        let FullName = row.FullName !== '' ? row.FullName : 'N/A'
        return FullName
      },
      "targets": 1
    },
    {
      "render": function (data, type, row) {
        let FixerGroup = row.FixerGroup !== '' ? row.FixerGroup.Name : 'N/A'
        return FixerGroup
      },
      "targets": 2
    },
    {
      "render": function (data, type, row) {
        let Email = row.Email !== '' ? row.Email : 'N/A'
        return Email
      },
      "targets": 3
    },
    {
      "render": function (data, type, row) {
        let Tel = row.Tel !== '' ? row.Tel : 'N/A'
        return Tel
        
      },
      "targets": 4
    },
    {
      "render": function (data, type, row) {
        let Address = row.Address !== '' ? row.Address : 'N/A'
        return Address
        
      },
      "targets": 5
    },
    {
      "render": function (data, type, row) {
        let DOB = row.DOB !== '' ? row.DOB : 'N/A'
        return DOB
        
      },
      "targets": 6
    },
    {
      "render": function (data, type, row) {
        return `
          <a href="javascript:void(0)"title="Sửa" class="editFixer"><i class="fas fa-edit"></i></a>
          <a class="deleteFixer" href="#" id="${row.Id}" title="Xóa"><i class="fas fa-trash text-danger"></i></a>
        `
      },
      "targets": 7
    }
  ]
});

$('#table-fixer tbody').on('click', '.editFixer', function () {
  let _this = $(this)
  let data = tableFixer.row(_this.closest('tr')).data();
  $('.modal #fullNameFixerHeader').html(data.FullName)
  $('.modal #fullNameFixer').val(data.FullName)
  $('.modal #FixerEmail').val(data.Email)
  $('.modal #addressFixer').val(data.Address)
  $('.modal #FixerGroup').val(data.FixerGroup.Name)
  $('.modal #phoneFixer').val(data.Tel)
  $('.modal .save-fixer-data').attr('id', data.Id)
  $('.modal').modal('show')
});

$('.save-fixer-data').click(function(){
  let FullName = $('.modal #fullNameFixer').val()
  let Email = $('.modal #FixerEmail').val()
  let Address = $('.modal #addressFixer').val()
  let Tel = $('.modal #phoneFixer').val()
  let FixerGroup = $('.modal #FixerGroup').val()
  let Id = $(this).attr('id')
  $.post('/cms/editUsers', { FullName, Address, Id }, res =>{
    if (res.data){
      $('.modal').modal('hide')
      showAlert('success', res.Message)
      setTimeout(function(){location.reload()}, 300)
    }else {
      console.log(res.Message)
      showAlert('failed', res.Message)
    }
  })
})
$('#table-fixer').on('click', '.deleteFixer', function () {
  let id = $(this).attr('id')
  if (confirm("Bạn có chắc chắn muốn xóa?")) {
    $.post('/cms/deleteUserPost/'+id, function(res){
      if(res.data){
        showAlert('success', res.message)
        setTimeout(function(){location.reload()}, 300)
      }else{
        showAlert('failed', res.message)
      }
    })
  }
  return false;
});

//Manager table
let tableManager = $('#table-manager').DataTable({
  "ajax": `/cms/getListUser?role=${RoleType.CMSAndManager}`,
  'serverSide': true,
  "processing": true,
  // "search": {
  //   "regex": true
  // },
  "columns": [
    { "data": "FullName" },
    { "data": "Email" },
    { "data": "Tel" },
    { "data": "Address" },
    { "data": "DOB" }
  ],
  "columnDefs": [
    {
      "render": function (data, type, row) {
        return `<a href="javascript:void(0)" class="avatar avatar-online" id = ${row.Id}>
                  <img style="width:30px;height:30px;max-width:unset" src="${row.Avatar?row.Avatar:window.location.origin+'/public/images/noavatar.png'}" alt="" />
                </a>`
      },
      "targets": 0
    },
    {
      "render": function (data, type, row) {
        let FullName = row.FullName !== '' ? row.FullName : 'N/A'
        return FullName
      },
      "targets": 1
    },
    {
      "render": function (data, type, row) {
        let Email = row.Email !== '' ? row.Email : 'N/A'
        return Email
      },
      "targets": 2
    },
    {
      "render": function (data, type, row) {
        let Tel = row.Tel !== '' ? row.Tel : 'N/A'
        return Tel
        
      },
      "targets": 3
    },
    {
      "render": function (data, type, row) {
        let Address = row.Address !== '' ? row.Address : 'N/A'
        return Address
        
      },
      "targets": 4
    },
    {
      "render": function (data, type, row) {
        let DOB = row.DOB !== '' ? row.DOB : 'N/A'
        return DOB
        
      },
      "targets": 5
    },
    {
      "render": function (data, type, row) {
        return `
        <a href="javascript:void(0)"title="Sửa" class="editManager"><i class="fas fa-edit"></i></a>
          <a class="deleteManager" href="#" id="${row.Id}" title="Xóa"><i class="fas fa-trash text-danger"></i></a>
        `
      },
      "targets": 6
    }
  ]
});

$('#table-manager tbody').on('click', '.editManager', function () {
  let _this = $(this)
  let data = tableManager.row(_this.closest('tr')).data();
  $('.modal #fullNameManagerHeader').html(data.FullName)
  $('.modal #fullNameManager').val(data.FullName)
  $('.modal #managerEmail').val(data.Email)
  $('.modal #addressManager').val(data.Address)
  $('.modal #phoneManager').val(data.Tel)
  $('.modal .save-manager-data').attr('id', data.Id)
  $('.modal').modal('show')
});

$('.save-manager-data').click(function(){
  let FullName = $('.modal #fullNameManager').val()
  let Email = $('.modal #managerEmail').val()
  let Address = $('.modal #addressManager').val()
  let Tel = $('.modal #phoneManager').val()
  let Id = $(this).attr('id')
  $.post('/cms/editUsers', { FullName, Address, Id }, res =>{
    if (res.data){
      $('.modal').modal('hide')
      showAlert('success', res.Message)
      setTimeout(function(){location.reload()}, 300)
    }else {
      console.log(res.Message)
      showAlert('failed', res.Message)
    }
  })
})

$('#table-manager').on('click', '.deleteManager', function () {
  let id = $(this).attr('id')
  if (confirm("Bạn có chắc chắn muốn xóa?")) {
    $.post('/cms/deleteUserPost/'+id, function(res){
      if(res.data){
        showAlert('success', res.message)
        setTimeout(function(){location.reload()}, 300)
      }else{
        showAlert('failed', res.message)
      }
    })
  }
  return false;
});



