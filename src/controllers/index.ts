import { getAsBuiltAndTVO } from "../methods/getAsBuildAndTVO";

export class Controller {
  public async getAsBuiltAndTVO(codigo: string) {
    const sharedFolderId = process.env.TEAM_DRIVE_ID;
    const response = await getAsBuiltAndTVO(sharedFolderId, codigo);
    return response;
  }
}
