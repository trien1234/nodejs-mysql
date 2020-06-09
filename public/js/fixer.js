// $('.btnSaveFixer').click(function(){
//     let Name = $('#Name').val()
//     let Description = $('#Description').val()
//     let data = {Name,Description}
//     console.log("da vao")
//     $.post('/cms/createFixer',data,function(res){
//         if(res.data){
//             showAlert('success',res.Message)
//             setTimeout(function(){location.href('/cms/listFixer')},600)
//         }
//         else{
//             showAlert('failed',res.Message)
//         }
//     })
// })