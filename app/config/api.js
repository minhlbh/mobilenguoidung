const domain = 'http://api.truongkhoa.com/';

var apiUrl = {
    menu : `${domain}api/Center/home_detail?i=0&tenmien=`,
    login: `${domain}token`,
    signUp: `${domain}api/Account/Register`,
    confirmPhone: `${domain}api/Account/XacNhanPhone`,
    forgotPassword: `${domain}api/Account/ForgotPassword`,
    listBenh: `${domain}api/CSDLYT/Benh_List`,
    detailBenh: `${domain}api/CSDLYT/Benh_Detail?Id=`,
    listSideBar: `${domain}api/Center/system_list/`,
    checkFacebookLogin: `${domain}api/Account/CheckFacebookLogin`,
    socialRegister: `${domain}api/Account/SocialRegister`,
    userInfo:`${domain}api/Account/UserInfo`,
    listDichVu :`${domain}api/CSDLYT/DichVu_List`,
    listHoSoSucKhoe: `${domain}api/BADT/HoSoSucKhoe_List`,
    taoMoiNhanhHoSo: `${domain}api/BADT/HoSoSucKhoe_Create_Fast`
}



export default apiUrl;