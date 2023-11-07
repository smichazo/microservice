const error = require('../../../utils/error');

const TABLE = 'post';
module.exports = function(injectedStore){
    let store = injectedStore;
    if(!store){
        store = require('../../../store/mysql');
    }

    function list(){
        return store.list(TABLE)

    }
    async function get(id) {
		const user = await store.get(COLLECTION, id);
		if (!user) {
			throw error('No existe el post', 404);
		}

		return user;
	}

    return {
        list,
        get
    }

}
