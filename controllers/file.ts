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

    //req.headers.context_id = req.headers.tenant_id
    //res.redirect(301, 'http://localhost:3001/api/v1/files');
    
    let { headers, file } = req;
    headers.context_id = req.headers.tenant_id
    const { buffer, originalname: filename, mimetype } = file;

    const formData = new FormData();
    
    formData.append('file', buffer, {
      filename: filename, contentType: mimetype
    });

    //const buff = Buffer.from(buffer);

    //headers['content-type'] = mimetype;
    headers = { ...formData.getHeaders(), ...headers, ...{ context_id: headers.tenant_id } };

    this.data_service.upload( formData,
      headers
    ).then((response: any) => {
      res.send(response);
    })
    .catch((err: Error) => {
      res.send(err);
    });
  }
  

  post_instance_request(req: any, res: any) {

    this.data_service.download()
  }
}
