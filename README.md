# 🧗 다이나믹 6
## 📕 프로젝트 소개

- 🏋️ **프로젝트 개요**  
  - 운동 기록과 그룹 활동을 지원하는 **커뮤니티 서비스 백엔드** 개발 프로젝트  

- 📅 **프로젝트 기간**
  - 2025.09.15 ~ 2025.10.02  

- **관련 문서**  
  - [다이나믹6 Dev협업 문서](https://www.notion.so/1-2025-09-15-25ee9d59f596808f8dbde297962d624b?source=copy_link)


</br>

## 👨‍💻👨‍💻 팀원 구성

| 그룹 목록·상세 조회 · 랭킹 · 이미지 | 그룹 생성 · 수정 | 그룹 삭제 · 추천 · 추천취소 | 그룹 참여 · 취소 | 운동 기록 생성 · 조회 |
|------------------------------------|------------------|-----------------------------|------------------|------------------------|
| <div align="center">[juho-creator](https://github.com/juho-creator)</div> | <div align="center">[june5815](https://github.com/june5815)</div> | <div align="center">[try08253-crypto](https://github.com/try08253-crypto)</div> | <div align="center">[gyeongyeonkmy](https://github.com/gyeongyeonkmy)</div> | <div align="center">[918-jihye](https://github.com/918-jihye)</div> |
| <div align="center"><img src="https://avatars.githubusercontent.com/juho-creator" width="80"/></div> | <div align="center"><img src="https://avatars.githubusercontent.com/june5815" width="80"/></div> | <div align="center"><img src="https://avatars.githubusercontent.com/try08253-crypto" width="80"/></div> | <div align="center"><img src="https://avatars.githubusercontent.com/gyeongyeonkmy" width="80"/></div> | <div align="center"><img src="https://avatars.githubusercontent.com/918-jihye" width="80"/></div> |
| <div align="center"><b>김주호</b></div> | <div align="center"><b>양다온</b></div> | <div align="center"><b>장영환</b></div> | <div align="center"><b>김경연</b></div> | <div align="center"><b>최지혜</b></div> |



</br>

## 🕹️ 기술 스택
- Backend: Express.js, PrismaORM
- Database: PostgresSQL
- 공통 Tool: Git & Github, Discord, Notion
</br>
</br>

</br>

## 🛠️ 팀원별 구현 기능 상세
### 👨‍💻 김주호
- 그룹 목록 조회 API
  - 페이지네이션(page, limit), 정렬(order, orderBy), 검색(search) 기능 제공
  - 잘못된 정렬 기준(orderBy) 입력 시 `400 BAD REQUEST` 반환
- 그룹 상세 조회 API
  - 그룹 ID를 기반으로 단일 그룹 상세 정보 반환
  - 존재하지 않는 그룹 ID 요청 시 `404 NOT FOUND` 반환
- 그룹 랭킹 조회 API
  - 그룹 ID와 기간(duration: monthly/weekly)에 따라 참여자 랭킹 데이터 반환
  - 잘못된 groupId 입력 시 `400 BAD REQUEST` 반환
- 이미지 업로드 API
  - 멀티파트 폼 데이터로 이미지 파일 업로드
  - 정상 업로드 시 이미지 URL 목록 반환
  - 이미지 파일이 아닌 경우 `400 BAD REQUEST` 반환
</br>

### 👨‍💻 양다온
- 그룹 생성 API
  - 그룹 이름, 설명, 대표 이미지, 목표 횟수(goalRep), 태그, Discord 연동 URL 등을 입력받아 새로운 그룹을 생성
  - 생성 시 그룹장(ownerNickname, ownerPassword) 정보 포함
  - 유효성 검증 실패 시 `400 BAD REQUEST` 반환 (예: goalRep이 정수가 아닌 경우)
- 그룹 수정 API
  - 기존 그룹 정보를 업데이트 (이름, 설명, 이미지, 목표 횟수, 태그, Discord URL 등)
  - 수정 시 비밀번호(ownerPassword) 검증 필요
  - 비밀번호 불일치 시 `401 UNAUTHORIZED` 반환
  - 잘못된 값 입력 시 `400 BAD REQUEST` 반환
</br>
 
### 👨‍💻 장영환 </br>
- 그룹 삭제 API
  - 그룹 ID를 기반으로 그룹 삭제
  - 삭제 시 비밀번호 검증 필요
  - 잘못된 비밀번호 입력 시 `401 UNAUTHORIZED` 반환
  - 존재하지 않는 그룹 ID 요청 시 `404 NOT FOUND` 반환
- 그룹 좋아요 API
  - 특정 그룹에 좋아요를 추가
  - 그룹 ID를 기준으로 처리
  - 잘못된 비밀번호 입력 시 `401 UNAUTHORIZED` 반환
  - 존재하지 않는 그룹 ID 요청 시 `404 NOT FOUND` 반환
- 그룹 좋아요 취소
  - 특정 그룹에 추가된 좋아요를 취소
  - 그룹 ID를 기준으로 처리
  - 정상 취소 시 `200 OK` 반환
</br>

### 👨‍💻 김경연 </br>
- 그룹 참여 API
  - 그룹 ID와 사용자 정보(nickname, password)를 입력받아 그룹에 참여
  - 정상 참여 시 그룹 정보와 참여자 목록 반환 (`201 CREATED`)
  - 잘못된 요청 시 `400 BAD REQUEST` 반환 (예: nickname 누락)
- 그룹 참여 취소 API
  - 그룹 ID와 사용자 정보(nickname, password)를 입력받아 그룹 참여를 취소
  - 정상 취소 시 `204 NO CONTENT` 반환
  - 잘못된 요청 시 `400 BAD REQUEST` 반환 (예: nickname 누락)
  - 비밀번호 불일치 시 `401 UNAUTHORIZED` 반환
</br>

### 👨‍💻 최지혜 </br>
- 운동 기록 생성 API
  - 그룹 ID와 운동 정보(exerciseType, description, time, distance, photos, authorNickname, authorPassword)를 입력받아 새로운 운동 기록 생성
  - 정상 생성 시 생성된 운동 기록 데이터 반환 (`201 CREATED`)
  - 잘못된 요청 시 `400 BAD REQUEST` 반환 (예: groupId가 정수가 아닌 경우)
- 운동 기록 조회 API
  - 그룹 ID를 기준으로 운동 기록 목록을 조회
  - 페이지네이션(page, limit), 정렬(order, orderBy), 닉네임 검색(search) 지원
  - 정상 조회 시 운동 기록 목록과 전체 개수 반환 (`200 OK`)
  - 잘못된 요청 시 `400 BAD REQUEST` 반환 (예: groupId가 정수가 아닌 경우)
  </br></br>
</br>

##  📂 파일 구조
```
nb01-seven-team3
├── .github/ # PR 템플릿 및 GitHub 관련 설정
│ └── pull_request_template.md
├── .husky/ # Git hook 관리 (pre-commit 등)
├── prisma/ # Prisma ORM 설정 및 마이그레이션
│ ├── migrations/ # DB 마이그레이션 파일
│ ├── schema.prisma # Prisma 스키마 정의
│ └── migration_lock.toml
├── public/ # 정적 파일 관리
├── src/
│ ├── app/
│ │ └── server.js # 서버 실행 진입점
│ ├── common/ # 공통 모듈
│ │ ├── adapter/ # 어댑터 계층
│ │ ├── const/ # 상수 정의
│ │ ├── exception/ # 예외 처리 클래스
│ │ └── middleware/ # 인증, 에러핸들러 등 미들웨어
│ ├── controller/ # 컨트롤러 (요청/응답 DTO 포함)
│ │ ├── req-dto/ # 요청 DTO
│ │ ├── res-dto/ # 응답 DTO
│ │ ├── group.controller.js
│ │ ├── record.controller.js
│ │ ├── image.controller.js
│ │ └── user-joingroup.controller.js
│ ├── domain/ # 도메인 계층 (Entity)
│ │ ├── entity/ # 그룹, 유저, 기록 등 엔티티 정의
│ │ └── service/ # 비즈니스 로직 서비스 계층
│ ├── repo/ # Repository 계층
│ │ ├── data/ # 더미 데이터, Seed 파일
│ │ ├── mapper/ # 엔티티 <-> DTO 매퍼
│ │ ├── group.repo.js
│ │ ├── record.repo.js
│ │ └── user.repo.js
│ └── app.js # 애플리케이션 초기화
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── README.EN.md
```

<br>

<br>

## 🌐 서비스 배포 주소 </br>
- [다이나믹6's 운동 인증 커뮤니티 서비스](https://www.codeit.kr/)

</br>
</br>

</br>

## 📝 프로젝트 회고록 
- [다이나믹6 개발자들의 회고록](https://www.notion.so/1-2025-09-15-25ee9d59f596808f8dbde297962d624b)


