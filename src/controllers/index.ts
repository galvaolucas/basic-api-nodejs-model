import { getAsBuiltAndTVO } from "../methods/getAsBuildAndTVO";

export class Controller {
  public async getAsBuiltAndTVO() {
    const sharedFolderId = process.env.TEAM_DRIVE_ID;
    const response = await getAsBuiltAndTVO(sharedFolderId, '0000');
    return response;
  }
}
