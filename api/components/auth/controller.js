const bcryt = require('bcrypt');
const auth = require('../../../auth');
const TABLE = 'auth';

module.exports = function(injectedStore){
    let store = injectedStore;
    if(!store){
        store = require('./../../../store/mysql');
    }

    async function login(username, password){
        const data = await store.query(TABLE, {username: username });
        if(!data){
            data = { password:''}

        }
        return bcryt.compare(password, data.password)
            .then(sonIguales =>{
                if(sonIguales === true){
                    //Genera token
                    return auth.sign({...data});
                }else{
                    throw new Error('Informacion invalida ')
                }
            });
    }

    async function upsert(data){
        const authData = {
            id:data.id,
        }
        if(data.username){
            authData.username = data.username;
        }

        if(data.password){
            authData.password = await bcryt.hash(data.password, 10);
        }
        return store.upsert(TABLE, authData);
    }
    return {
        upsert,
        login,
    }
};