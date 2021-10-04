import { CommonModelManager } from '@thxmike/mongoose-common-model-manager';

export class IssueModelManager extends CommonModelManager { 
    set_data(ent: any, data: any){
        super.set_data(ent, data);
        
        if(data.comments){
            ent.comments = data.comments;
        }
    }
}