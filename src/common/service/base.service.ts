import { DataSourceService } from "../db/config/datasource.service";
export class BaseService {
  /*
  schoolDb 의 트랜잭션 없는 경우 처리 함수
  */
  protected async schoolDbNoTran(callback) {
    const dataSource = await DataSourceService.getInstance();
    const manager = dataSource.schoolDataSource.manager;
    let result = null;
    try {
      result = await callback(manager);
    } catch (e) {
      console.log(e);
    }

    return result;
  }

  /*
  schoolDb 트랜잭션이 필요한 함수
  */
  protected async schoolDbTran(callback) {
    const dataSource = await DataSourceService.getInstance();
    const runner = await dataSource.schoolDataSource.createQueryRunner();
    let result = null;

    try {
      await runner.startTransaction();
      result = await callback(runner.manager);
      await runner.commitTransaction();
    } catch (e) {
      await runner.rollbackTransaction();
      console.log(e);
    } finally {
      await runner.release();
    }

    return result;
  }
}
