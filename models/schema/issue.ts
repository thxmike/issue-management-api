import { MongooseBaseSchema } from '@thxmike/mongoose-base-schema';

export class IssueSchema extends MongooseBaseSchema {
    constructor(obj: any, options: any, my_mongoose: any) {

        super(obj, options, my_mongoose);
    
        let additional_schema = {
         
          "status": {
            "type": String,
            "required": true,
            "enum": ["pending", "complete"],
            "default": "pending"
          },
          "comments": [{
            "type": my_mongoose.Schema.Types.ObjectId,
            "ref": "comment"
          }],
          "files": [{
            "type": my_mongoose.Schema.Types.ObjectId
          }],
          "timestamps": {
            "completed": {
              "type": Date
            }
          }
        };

        this.add( 
          additional_schema
        )
      }
}
