import { HttpClinet } from '../../../config/plugins/axios.plugin';


interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly succesCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {}
    
    async execute(url: string): Promise<boolean> {
        try {
           const req = await HttpClinet.get(url);
           
           if(!req) {
            throw new Error(`Error on check service ${ url }`);
           } 

           this.succesCallback();
           return true;
        } catch (error) {
            console.log(error);
            this.errorCallback('error');
            return false
        }
    }
};