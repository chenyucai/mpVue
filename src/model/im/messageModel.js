import {Check, CheckType, RCModel} from "../../framework/framework";
import ImMessageRequest from "./message";

export default class ImMessageModel extends RCModel {

  @Check(CheckType.String)
  relationId = '';

  @Check(CheckType.String)
  toRelationId = '';

  @Check(CheckType.Object)
  letters = new ImMessageRequest();

  verify() {

  }
}
