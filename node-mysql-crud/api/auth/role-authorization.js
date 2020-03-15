const role = require('user-groups-roles')

role.createNewRole('admin')
role.createNewRole('user')

role.createNewPrivileges(['/api/user/login','POST'],'login user',true)
role.createNewPrivileges(['/api/admin/login','POST'],'login admin',true)

role.createNewPrivileges(['/api/avenger','GET'],'get all avenger',false)
role.createNewPrivileges(['/api/avenger','POST'],'create avenger',false)
role.createNewPrivileges(['/api/avenger/:id','GET'],'get avenger by id',false)
role.createNewPrivileges(['/api/avenger/:id','PUT'],'update avenger by id',false)
role.createNewPrivileges(['/api/avenger/:id','DELETE'],'delete avenger by id',false)

role.createNewPrivileges(['/api/post/','GET'],'get all posts',false)
role.createNewPrivileges(['/api/post/','POST'],'create post',false)
role.createNewPrivileges(['/api/post/:id','GET'],'get post by id',false)
role.createNewPrivileges(['/api/post/:id','PUT'],'update post by id',false)
role.createNewPrivileges(['/api/post/:id','DELETE'],'delete post by id',false)

role.addPrivilegeToRole('admin',['/api/avenger','GET'],true)
role.addPrivilegeToRole('admin',['/api/avenger','POST'],true)
role.addPrivilegeToRole('admin',['/api/avenger/:id','GET'],true)
role.addPrivilegeToRole('admin',['/api/avenger/:id','PUT'],true)
role.addPrivilegeToRole('admin',['/api/avenger/:id','DELETE'],true)

role.addPrivilegeToRole('user',['/api/post','POST'],false)
role.addPrivilegeToRole('user',['/api/post','GET'],true)
role.addPrivilegeToRole('user',['/api/post/:id','GET'],false)
role.addPrivilegeToRole('user',['/api/post/:id','PUT'],false)
role.addPrivilegeToRole('user',['/api/post/:id','DELETE'],false)

module.exports = role;