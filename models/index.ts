//Collection -> Survey -> Question
import { MongooseBaseDirector } from '@thxmike/mongoose-base-director';

import { IssueModelManager } from './managers/issue-model-manager.js';
import { IssueSchema } from './schema/issue.js';

import { CommentModelManager } from './managers/comment-model-manager.js';
import { CommentSchema } from './schema/comment.js';

export class Director extends MongooseBaseDirector {

  private _issue_model_manager: any;
  private _comment_model_manager: any;
   
  get director(): any {
    return {
      "issue_model_manager": this._issue_model_manager,
      "comment_model_manager": this._comment_model_manager
    };
  }

  setup_schemas() {

    const issue_schema = new IssueSchema({}, {}, this.mongoose);
    const comment_schema = new CommentSchema({}, {}, this.mongoose);
    
    return {
      issue_schema: issue_schema,
      comment_schema: comment_schema
    };
  }

  setup_managers(schemas: any) {

    this._issue_model_manager = new IssueModelManager(
      this.mongoose,
      this.mongoose.model("issue", schemas.issue_schema)
    );

    this._comment_model_manager = new CommentModelManager(
      this.mongoose,
      this.mongoose.model("comment", schemas.comment_schema)
    );
  }
}