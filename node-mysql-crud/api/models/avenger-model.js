/* const Avenger = (avenger) =>{
    this.name = avenger.name;
    this.description = avenger.description;
} */
class Avenger{
    constructor(avenger){
        this.id = avenger.id
        this.name = avenger.name;
        this.email= avenger.email;
        this.password= avenger.password;
        this.description = avenger.description;
        this.createdBy = avenger.createdBy;
        this.role = avenger.role;
    }
}

module.exports = Avenger;