import { createStore} from 'vuex';
import user from './modules/user.js';
import game from './modules/game.js';

export default createStore({
    modules:{
        user,
        game
    }
})

