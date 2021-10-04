import { MongooseBaseSchema } from '@thxmike/mongoose-base-schema';
import { TypeConversionService } from '@thxmike/type-conversion';

export class CommentSchema extends MongooseBaseSchema {
    constructor(obj: any, options: any, my_mongoose: any) {

        super(obj, options, my_mongoose);
    
        delete this.paths.code;

        let additional_schema = {
          "issue_id": {
            "type": my_mongoose.Schema.Types.ObjectId,
            "required": true,
            "ref": "issueS"
          }
        };

        this.add( 
          additional_schema
        )
        
        this.path('issue_id').get(function (v: any) {
          let val = v.toString()
          return TypeConversionService.convert_objectid_to_uuid(val, true);
        });
        
      }
}
