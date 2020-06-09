$('.btnSetting').click(function(){
	let Name = $('#Name').val();
	let Slogan = $('#Slogan').val();
	let Address = $('#Address').val();
	let Email = $('#Email').val();
	let Phone = $('#Phone').val();
	let Website = $('#Website').val();
	let BankName = $('#BankName').val();
	let BankAccount = $('#BankAccount').val();
	let BankNum = $('#BankNum').val();
	let FaceBook = $('#FaceBook').val();
	let Youtube = $('#Youtube').val();
	let Twitter = $('#Twitter').val();
	let LinkedIn = $('#LinkedIn').val();
	let OpenTime = $('#OpenTime').val();
	let CloseTime = $('#CloseTime').val();
	let IncidentReceiveTime = $('#IncidentReceiveTime').val();
	let IncidentFixingTime = $('#IncidentFixingTime').val();
	let ExpriedContractTime = $('#ExpriedContractTime').val();
	let IncidentFixingScheduleTime = $('#IncidentFixingScheduleTime').val();
	$.post('/cms/updateSetting',{
		Name,Slogan,
		Address,Email,
		Phone,Website,
		BankName,BankAccount,
		BankNum,FaceBook,
		Youtube,Twitter,
		LinkedIn,
		OpenTime,CloseTime,
		IncidentReceiveTime,
		IncidentFixingTime,
		ExpriedContractTime,
		IncidentFixingScheduleTime
	},function(res){
        if(res.data){
            showAlert('success',res.Message)
            setTimeout(function(){location.reload()}, 500)
        }
        else {
            showAlert('failed',res.Message)
        }
    })
})
