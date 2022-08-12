import { DateTime } from "luxon";
import { SchoolEntity } from "../../common/db/entity/school";
import { ClassDto } from "./class.dto";

export class SchoolUpdateDto {
  id: number;
  name: string;
  etc: string;
}
