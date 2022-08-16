## Description

typeorm 예제

## Installation

1. sample.env 를 참조하여 .env 파일 생성
2. DB는 sql/tables.sql 참조하여 테이블 생성
3. $ npm install

## Test

현재 controller 를 지원하지않고 \*.spec.ts 파일에서 jest 테스트 실행

## 설명

./src/school/school.service.spec.ts

1. left Join

```
it(" getSchoolClass ", async () => {
    const result = await service.getSchoolClass(1);
    console.log("result=> " + JSON.stringify(result));
    expect(result).toBeDefined();
});
```

2. left Join (leftJoinAndMapMany)

```
it(" getSchoolClassLeftJoin ", async () => {
    const result = await service.getSchoolClassLeftJoin(1);
    console.log("result=> " + JSON.stringify(result));
    expect(result).toBeDefined();
});
```

3. inner Join (innerJoinAndMapMany)

```
it(" getSchoolClassInnerJoin ", async () => {
    const result = await service.getSchoolClassInnerJoin(1);
    console.log("result=> " + JSON.stringify(result));
    expect(result).toBeDefined();
});
```

4. paging

```
it(" getSchoolClassPage ", async () => {
	const result = await service.getSchoolClassPage(1, 3);
	console.log("result=> " + JSON.stringify(result));
	expect(result).toBeDefined();
});
```

5. 문자열 검색

```
it(" getSchoolClassLikeName ", async () => {
    const result = await service.getSchoolClassLikeName("서울초등학교");
    console.log("result=> " + JSON.stringify(result));
    expect(result).toBeDefined();
});
```

6. From 서브 쿼리

```
it(" getSchoolFromSubQueryLikeName ", async () => {
    const result = await service.getSchoolFromSubQueryLikeName("서울초등학교");
    console.log("result=> " + JSON.stringify(result));
    expect(result).toBeDefined();
});
```
