var Sql={
    get:'select id,username,content,head_pic,created_at from test',
    insert:'INSERT INTO test(username,content,head_pic) VALUES(?,?,?)',
    delete:'delete from test where id = ? '
};
module.exports=Sql;