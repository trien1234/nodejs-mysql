$('.btnSeeBill').click(function(){
  let BuildingId = $('#BillBuildingId').val()
  let HouseId = $('#BillHouseId').val()
  let ResidentId = $('#ResidentId').val()
  let DepositMoney  = $('#DepositMoney').val()?$('#DepositMoney').val():0
  let ResiMoney  = $('#ResiMoney').val()?$('#ResiMoney').val():0
  let HouseFee  = $('#RentalFee').val()
  let FromDate  = $('#FromDate').val()
  let ToDate  = $('#ToDate').val()
  let Type = $('#Type').val()
  let DateRange = $('#DateRange').val()
  let CreatedBy = $('#CreatedBy').val()
  let RoomBlance = $('#RoomBlance').val()?$('#RoomBlance').val():0
  let Note = $('#Note').val()?$('#Note').val():null
  let IsDeleted  = 1
  let IsDraft  = 1
  let WarFirstNum = $('#WarFirstNum').val()?$('#WarFirstNum').val():0
  let WarLastNum = $('#WarLastNum').val()?$('#WarLastNum').val():0
  let WarPrice = $('#WarPrice').val()?$('#WarPrice').val():0
  let ElFirstNum = $('#ElFirstNum').val()?$('#ElFirstNum').val():0
  let ElLastNum = $('#ElLastNum').val()?$('#ElLastNum').val():0
  let ElPrice = $('#ElPrice').val()?$('#ElPrice').val():0
  let ParkingPrice = $('#ParkingPrice').val()?$('#ParkingPrice').val():0
  let SerCompo = $('#SerCompo').val()?$('#SerCompo').val():0
  let InDebtMoney = $('#InDebtMoney').val()?$('#InDebtMoney').val():0
  let RedunMoney = $('#RedunMoney').val()?$('#RedunMoney').val():0
  let SalePrice = $('#SalePrice').val()?$('#SalePrice').val():0
  let OtherFee = $('#OtherFee').val()?$('#OtherFee').val():0

  $.post('/cms/saveBillAsDraft', { 
    BuildingId, 
    HouseId, 
    ResidentId, 
    DateRange, 
    DepositMoney, 
    ResiMoney, 
    HouseFee, 
    FromDate, 
    RoomBlance, 
    ToDate, 
    Type, 
    CreatedBy, 
    IsDeleted,
    IsDraft,
    Note,
    WarFirstNum,
    WarLastNum,
    WarPrice,
    ElFirstNum,
    ElLastNum,
    ElPrice,
    ParkingPrice,
    SerCompo,
    InDebtMoney,
    RedunMoney,
    SalePrice,
    OtherFee
  }, function(res){
    if (res.data) {
      showAlert('success', res.Message)
      setTimeout(function(){location.href = `/cms/viewBillAsDraft/${res.data.Id}`}, 300)
    } else {
      // console.log(res.Message)
      showAlert('failed', res.Message)
    }
  })
})
$('.btnCreateBill').on('click', function(){
  let Id = $(this).attr('id')
  let TotalFee = $('#TotalFee').html()
  let IsDeleted = 0
  let IsDraft = 0
  $.post('/cms/saveBill',{Id, IsDeleted, TotalFee, IsDraft}, function(res){
    if(res.data){
      showAlert('success', res.Message)
      location.href.reload()
    }else{
      showAlert('failed', res.Message)
    }
  })
})