import { CommonController } from '@thxmike/express-common-controller';

export class IssueController extends CommonController {
  public setup_instance_routes() {
    this._router
      .route(this.instance_route)
      .get(this.get_instance_request.bind(this))
      .delete(this.delete_instance_request.bind(this))
      .patch(this.patch_instance_request.bind(this));
  }

  public setup_aggregate_routes() {
    this._router
      .route(this.aggregate_route)
      .get(this.get_aggregate_request.bind(this))
      .post(this.post_aggregate_request.bind(this));
  }
}
