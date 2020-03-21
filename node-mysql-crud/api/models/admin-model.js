class Admin{
    constructor(admin){
        this.id = admin.id
        this.name = admin.name;
        this.email= admin.email;
        this.password= admin.password;
        this.description= admin.description;
        this.createdBy= admin.createdBy;
        this.role = admin.role;
    }
}

module.exports = Admin;