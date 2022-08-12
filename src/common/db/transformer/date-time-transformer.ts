import { DateTime } from "luxon";
import { ValueTransformer } from "typeorm";

export class DateTimeTransformer implements ValueTransformer {
  to(entityValue: DateTime): Date {
    return entityValue.toJSDate();
  }

  from(dbValue: Date): DateTime {
    return DateTime.fromJSDate(dbValue);
  }
}
