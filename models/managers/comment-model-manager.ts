import { CommonModelManager } from '@thxmike/mongoose-common-model-manager';

export class CommentModelManager extends CommonModelManager { 
    set_data(ent: any, data: any){
        super.set_data(ent, data);
        
        if(data.issue_id){
            let obj_id = data.issue_id.replace(/-/g, '').slice(8);
            ent.issue_id = obj_id;
        }
    }
}