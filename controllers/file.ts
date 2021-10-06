import { CommonController } from '@thxmike/express-common-controller';
import FormData from 'form-data';
import multer from 'multer';
const upload = multer();

export class FileController extends CommonController {
  public setup_instance_routes() {
    this._router
      .route(this.instance_route)
      .get(this.get_instance_request.bind(this))
      .post(this.post_instance_request.bind(this));
  }

  public setup_aggregate_routes() {
    this._router
      .route(this.aggregate_route)
      .get(this.get_aggregate_request.bind(this))
      .post(
          upload.single('file'),
          this.post_aggregate_request.bind(this)
          );
  }

  post_aggregate_request(req: any, res: any) {

    let form = new FormData();

    let parts = req.baseUrl.split("/");
    let tenant_id: any = `${parts[parts.length - 1]}`;
   
    form.append("content-type", "application/octet-stream");
    form.append('file', req.file.buffer);

    let headers = { ...req.headers, ...{ context_id: tenant_id}, ...form.getHeaders()};
    
    
    this.data_service.upload(form, headers)
        .then((response: any) => {
            res.send(response); 
        });
  }

  post_instance_request(req: any, res: any) {

    this.data_service.download()
  }
}
