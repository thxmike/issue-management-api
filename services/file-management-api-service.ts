import { RestClientService } from "@thxmike/rest-client";

export class FileManagementApiService {

    private uri: string;
    private rest_client: RestClientService;

    constructor(uri: string){
        this.uri = uri;
        this.rest_client = new RestClientService();
    }

    public upload(file_content: any, headers: string){
       
        return this.rest_client.post_file(`${this.uri}/files`, file_content, headers)
    }

    public download(file_id: number,  headers: string){
        
        return this.rest_client.post_file(`${this.uri}/files/${file_id}`,null, headers);
    }
}