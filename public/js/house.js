$('.btnSaveHouse').click(function(){
    let BuildingId = $('#BuildingId').find(":selected").val()
    let ManagerId = $('#ManagerId').find(":selected").val()
    let Name = $('#Name').val()
    let Note = $('#Note').val()
    let Code = $('#Code').val()
    let Block = $('#Block').val()
    let Floor = $('#Floor').val()
    let RentalFee = $('#RentalFee').val()
    let BillDateRange = $('#BillDateRange').find(":selected").val()
    let Status = $('#Status').find(":selected").val()
    let CheckinDate = $('#CheckinDate').val()
    let CheckoutDate = $('#CheckoutDate').val()
    let Funiture = $('#Funiture').val()
    let data = {BuildingId,ManagerId,Name,Note,Code,Block,Floor,Status,RentalFee,BillDateRange,CheckinDate,CheckoutDate,Funiture}
    $.post('/cms/createHousePost',data,function(res){
        if(res.data){
            showAlert('success',res.Message)
            setTimeout(function(){location.href = "/cms/listHouse"},600)
        }
        else {
            showAlert('failed',res.Message)
        }
    })
})

$( document ).ready(function() {
  $.get('/cms/createHouseGet',function(res){
      var optionBuiding = '<option value="">-- Vui lòng chọn --</option>'
      var optionBuidingSearch = '<option value="">-- Tất cả--</option>'
      $.each(res.listBuiding, function (index, value) {
        optionBuiding += "<option value='"+value.Id+"'>"+value.Name+"</option>"
      });
      $.each(res.listBuiding, function (index, value) {
        optionBuidingSearch += "<option value='"+value.Id+"'>"+value.Name+"</option>"
    });
      $('#BuildingId').html(optionBuiding) 
      $('#searchUserByHouse').html(optionBuiding)
      $('#BuildingIdSearch').html(optionBuidingSearch) 

  })
  
});

$('#BuildingId').on('change',function(){ 
  let BuildingId = $('#BuildingId').find(":selected").val()
  $.get('/cms/createHouseGetManager/'+BuildingId,function(res){
    var optionManager = `<option value="${res.listManager[0].User.Id}">${res.listManager[0].User.FullName}</option>`
    $('#ManagerId').html(optionManager) 
  })
})

$('#BuildingIdSearch').on('change', function(){ 
  let BuildingId = $('#BuildingIdSearch').find(":selected").val()
  tableHouse.ajax.url( '/cms/houseList?BuildingId='+BuildingId).load();
})


var tableHouse = $('#table-house').DataTable({

    "ajax": "/cms/houseList",
    'serverSide': true,
    "processing": true,
    "searching": true,
    "columns": [
        { "data": "STT" },
        { "data": "Name" },
        { "data": "Code" },
        { "data": "Block" },
        { "data": "Floor" },
        { "data": "Building" },
        { "data": "Manager" },
  
      ],
    "columnDefs": [
      {
        "render": function (data, type, row) {
          // console.log("data",row) //giá trị của từng cột = row.FullName
          let Name = row.Name !== '' ? row.Name : 'N/A'
          return Name
        },
        "targets": 0
      },
      {
        "render": function (data, type, row) {
          let Code = row.Code !== '' ? row.Code : 'N/A'
          return Code
        },
        "targets": 1
      },
      {
        "render": function (data, type, row) {
          let Block = row.Block !== '' ? row.Block : 'N/A'
          return Block
          
        },
        "targets": 2
      },

      {
        "render": function (data, type, row) {
          let Floor = row.Floor !== '' ? row.Floor : 'N/A'
          return Floor
          
        },
        "targets": 3
      },
      {
        "render": function (data, type, row) {
          let NameBuilding = row.Building !== '' ? row.Building.Name : 'N/A'
          return NameBuilding
          
        },
        "targets": 4
      },
      {
        "render": function (data, type, row) {
          let User = row.User !== '' ? row.User.FullName : 'N/A'
          return User
          
        },
        "targets": 5
      },
      {
        "render": function (data, type, row) {
          let status = row.Status != null ? row.Status : 'N/A'
          if (status == 1) {status = "Trống/Chưa ss"}
          else if (status == 2) {status = "Trống/Sẵn sàng"}
          else if (status == 3) {status = "Đã cọc"}
          else if (status == 4) {status = "Đang ở"}
          else if (status == 5) {status = "Gần hết hạn"}
          else if (status == 6) {status = "Gia hạn"}
          else if (status == 7) {status = "Thanh lý"}
          else {status = 'N/A'}
          return status          
        },
        "targets": 6
      },
      {
        "render": function (data, type, row) {
          return `
            <a href="javascript:void(0)"title="Sửa" class="btn btn-primary btn-sm editHouse"><i class="fas fa-edit"></i></a>
            <a href="javascript:void(0)"title="Sửa trạng thái" id="${row.Id}" class="bt btn-sm btn-success editStatusHouse">Sửa trạng thái</a>
            <a class="btn btn-sm deleteHouse btn-danger" href="#" id="${row.Id}" title="Xóa"><i class="fas fa-trash"></i></a>
          `
        },
        "targets": 7
      }
    ]
  });


  $('#table-house tbody').on('click', '.editStatusHouse', function () {
    let IdHouse = $(this).attr('id')
    $(".save-edit-status-house-data").attr('id',IdHouse)
    $('.modal_status_house').modal('show')
  });

  $('.save-edit-status-house-data').click(function(){
    let StatusId  = $('.modal #StatusHouse ').find(":selected").val()
    let HouseId = $(this).attr('id')
    $.post('/cms/updateStatusApartmentstatusHis', { HouseId,StatusId }, res =>{
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


  $('#table-house tbody').on('click', '.editHouse', function () {
    let _this = $(this)
    let data = tableHouse.row(_this.closest('tr')).data();
    $('.modal_House #fullNameHouse').html(data.Name)
    $('.modal_House #Building').html("<option value='"+data.BuildingId+"'>"+data.Building.Name+"</option>")
    $('.modal_House #Manager').html("<option value='"+data.ManagerId+"'>"+data.User.FullName+"</option>")
    $('.modal_House #Name').val(data.Name)
    $('.modal_House #Code').val(data.Code)
    $('.modal_House #Note').val(data.Note)
    $('.modal_House #Floor').val(data.Floor)
    $('.modal_House #Block').val(data.Block)
    $('.modal_House .save-house-data').attr('id', data.Id)
    $('.modal_House').modal('show')
  });

  $('.save-house-data').click(function(){
    let BuildingId  = $('.modal_House #Building ').find(":selected").val()
    let ManagerId   = $('.modal_House #Manager').find(":selected").val()
    let Name  = $('.modal_House #Name ').val()
    let Code = $('.modal_House #Code').val()
    let Note = $('.modal_House #Note').val()
    let Floor = $('.modal #Floor').val()
    let Block = $('.modal_House #Block').val()
    let Id = $(this).attr('id')
    $.post('/cms/updateHouse', { BuildingId, ManagerId,Name,Code,Note,Floor,Block,Id }, res =>{
      if (res.data){
        $('.modal_House').modal('hide')
        showAlert('success', res.Message)
        setTimeout(function(){location.reload()}, 300)
      }else {
        console.log(res.Message)
        showAlert('failed', res.Message)
      }
    })
  })

$('#table-house').on('click', '.deleteHouse',function(){
    let id = $(this).attr('id')
    let data = {'id':id}
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: "Nếu xoá căn hộ này thì tất cả cư dân, hợp đồng, hoá đơn cũng bị xoá theo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'btn btn-success',
      cancelButtonColor: 'btn btn-danger',
      confirmButtonText: 'Đồng ý'
    }).then((result) => {
      if(result.value){
        $.post('/cms/deleteHouse/',data, function(res){
          if(res.data){
              Swal.fire(
              'Thành công!',
              'Xoá căn hộ thành công',
              'success'
            )
            setTimeout(function(){location.reload()},300)
          }
        })
      }
    })
    return false
})

/**
 For Manager
**/
  let tableManagerHouse = $('#table-managerHouse').DataTable({
    "ajax": "/cms/listManagerHouse",
    'serverSide': true,
    "processing": true,
    "searching": true,
    "columns": [
        { "data": "Code" },
        { "data": "Name" },
        { "data": "Block" },
        { "data": "Floor" },
        { "data": "Building" }
      ],
    "columnDefs": [
      {
        "render": function (data, type, row) {
          return `<code>${row.Code !== null ? row.Code : 'N/A'}</code>`
        },
        "targets": 0
      },
      {
        "render": function (data, type, row) {
          let Name = row.Name !== null ? row.Name : 'N/A'
          return Name
        },
        "targets": 1
      },
      {
        "render": function (data, type, row) {
          let Block = row.Block !== null ? row.Block : 'N/A'
          return Block
          
        },
        "targets": 2
      },

      {
        "render": function (data, type, row) {
          let Floor = row.Floor !== null ? row.Floor : 'N/A'
          return Floor
          
        },
        "targets": 3
      },
      {
        "render": function (data, type, row) {
          let Building = row.Building.Name !== null ? row.Building.Name : 'N/A'
          return Building
          
        },
        "targets": 4
      }
    ]
  });
/**
  End
**/
/**
  For Accounting
**/
let tableAccoutingHouse = $('#table-accountingHouse').DataTable({
    "ajax": "/cms/listAccountingHouse",
    'serverSide': true,
    "processing": true,
    "searching": true,
    "columns": [
        { "data": "Code" },
        { "data": "Name" },
        { "data": "Block" },
        { "data": "Floor" },
        { "data": "Building" }
      ],
    "columnDefs": [
      {
        "render": function (data, type, row) {
          return `<code>${row.Code !== null ? row.Code : 'N/A'}</code>`
        },
        "targets": 0
      },
      {
        "render": function (data, type, row) {
          let Name = row.Name !== null ? row.Name : 'N/A'
          return Name
        },
        "targets": 1
      },
      {
        "render": function (data, type, row) {
          let Block = row.Block !== null ? row.Block : 'N/A'
          return Block
          
        },
        "targets": 2
      },

      {
        "render": function (data, type, row) {
          let Floor = row.Floor !== null ? row.Floor : 'N/A'
          return Floor
          
        },
        "targets": 3
      },
      {
        "render": function (data, type, row) {
          let Building = row.Building.Name !== null ? row.Building.Name : 'N/A'
          return Building
          
        },
        "targets": 4
      },
      {
        "render": function (data, type, row) {
          return `
            <a href="javascript:void(0)" class="btn btn-success btn-sm btn_createBill" id="${row.Id}" title="Tạo hoá đơn" >Hoá đơn</a>
          `
        },
        "targets": 5
      }
    ]
  });
    $('#table-accountingHouse tbody').on('click', '.btn_createBill', function () {
      let _this = $(this)
      let data = tableAccoutingHouse.row(_this.closest('tr')).data();
      $('.modal_createBill #houseId').val(data.Id)
      $('.modal_createBill .createBill').attr('id', data.Id)
      $('.modal_createBill').modal('show',300)
    });
  $('.createBill').click(function(){
    let type  = $('.modal_createBill #typeBill').find(":selected").val()
    let Id = $(this).attr('id')
    $.post('/cms/checkBeforeSave',{type, Id},function(res){
        if(res.data){
            $('.modal_createBill').modal('hide')
            showAlert('success',res.Message)
            setTimeout(function(){location.href = `/cms/accountingCreateBilling/${Id}?type=${type}`},600)
        }
        else {
            $('.modal_createBill').modal('hide')
            showAlert('failed',res.Message)
        }
    })
  })
/**
  End
**/
