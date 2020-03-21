const role = require('user-groups-roles')

role.createNewRole('admin')
role.createNewRole('user')

role.createNewPrivileges(['/api/user/login','POST'],'login user',true)
role.createNewPrivileges(['/api/admin/login','POST'],'login admin',true)

role.createNewPrivileges(['/api/avenger','GET'],'get all avenger',false)
role.createNewPrivileges(['/api/avenger/by-creater','GET'],'get avenger by creater',false)
role.createNewPrivileges(['/api/avenger','POST'],'create avenger',false)
role.createNewPrivileges(['/api/avenger/:id','GET'],'get avenger by id',false)
role.createNewPrivileges(['/api/avenger/:id','PUT'],'update avenger by id',false)
role.createNewPrivileges(['/api/avenger/:id','DELETE'],'delete avenger by id',false)

role.createNewPrivileges(['/api/posts','GET'],'get all posts',false)
role.createNewPrivileges(['/api/posts/by-creater','GET'],'get all posts',false)
role.createNewPrivileges(['/api/posts','POST'],'create post',false)
role.createNewPrivileges(['/api/posts/:id','GET'],'get post by id',false)
role.createNewPrivileges(['/api/posts/:id','PUT'],'update post by id',false)
role.createNewPrivileges(['/api/posts/:id','DELETE'],'delete post by id',false)

role.addPrivilegeToRole('admin',['/api/avenger','GET'],true)
role.addPrivilegeToRole('admin',['/api/avenger/by-creater','GET'],true)
role.addPrivilegeToRole('admin',['/api/avenger','POST'],true)
role.addPrivilegeToRole('admin',['/api/avenger/:id','GET'],true)
role.addPrivilegeToRole('admin',['/api/avenger/:id','PUT'],true)
role.addPrivilegeToRole('admin',['/api/avenger/:id','DELETE'],true)

role.addPrivilegeToRole('admin',['/api/posts','GET'],true)
role.addPrivilegeToRole('admin',['/api/posts/:id','DELETE'],true) 

role.addPrivilegeToRole('user',['/api/posts','POST'],true)
role.addPrivilegeToRole('user',['/api/posts/by-creater','GET'],true)
role.addPrivilegeToRole('user',['/api/posts/:id','GET'],true)
role.addPrivilegeToRole('user',['/api/posts/:id','PUT'],true)
role.addPrivilegeToRole('user',['/api/posts/:id','DELETE'],true) 

module.exports = role;