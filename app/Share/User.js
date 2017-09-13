

export default class User {
    hoVaTen = '';
    constructor (){
        if(!User.instance){
            User.instance = this;   
        }
        return User.instance;
    }

    setHoVaTen(name){
        this.hoVaTen = name;
    }

    getHoVaTen(){
        return this.hoVaTen;
    }
    static getUserInfo(){
        console.log(this.hoVaTen);
        return this.hoVaTen;
    }
    clearUser(){
        this.accessToken = null;
        this.name = null;
        this.email = null;
        this.avatar = null;
        this.phone = null;
        this.address = null;
    }

}