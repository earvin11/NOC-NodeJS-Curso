import { envs } from './config/plugins/envs.plungin';
import { Server } from './presentation/server';

(async () => {
    main();
})();


function main() {
    Server.start();
    // console.log( envs.PORT )
};