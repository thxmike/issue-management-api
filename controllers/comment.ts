import { CommonController } from '@thxmike/express-common-controller';

export class CommentController extends CommonController {
  public setup_instance_routes() {
    this._router
      .route(this.instance_route)
      .get(this.get_instance_request.bind(this));
  }

  public setup_aggregate_routes() {
    this._router
      .route(this.aggregate_route)
      .get(this.get_aggregate_request.bind(this))
      .post(this.post_aggregate_request.bind(this));
  }

  //Override Common
  public post_aggregate_request(req: any, res: any, next: any) {
    let filter = this.setup_filter(req.headers, req.query);

    let comment_response: any = {};
    let issue_id: string = '';
    if (this.has_parent) {
      let parts = req.baseUrl.split("/");
      issue_id = parts[parts.length - 1];
      req.body[`${this._parent.alternate_name}_id`] = issue_id
    }

    this.check_payload(res, req.body)
      .then(() => {
        return this.data_service.post_operation(req.body, filter);
      })
      .then((response: any) => {
        comment_response = response;
        //TODO : There is a better way
        if(this.has_parent){

          return this._parent.data_service.get_instance_operation_by_id(issue_id)
            .then((resp: any) => {
              let comment_id = response.message.id.toString().replace(/-/g, '').slice(8);
              let respmessage = JSON.parse(JSON.stringify(resp.message)); 
              respmessage.comments.push(comment_id);
              let payload = {
                "nonce": respmessage.nonce.toString(),
                "comments" : respmessage.comments
              }
              return this._parent.data_service.patch_operation(issue_id, payload);
            });
        }
        return Promise.resolve(response);
      })
      .then(() => {
        
        res.status(comment_response.status).json(comment_response.message);
      })
      .catch((err: any) => {
        return this._send_error(
          res,
          req,
          err,
          this.constructor.name,
          "post_aggregate_request"
        );
      });
  }
}
