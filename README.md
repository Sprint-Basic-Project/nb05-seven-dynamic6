
  [![English](https://img.shields.io/badge/lang-English-blue.svg)](https://github.com/Sprint-Basic-Project/nb05-seven-dynamic6/tree/develop/README.EN.md)
  [![한국어](https://img.shields.io/badge/lang-한국어-red.svg)](https://github.com/Sprint-Basic-Project/nb05-seven-dynamic6/tree/develop)
  
  
  # 다이나믹 6
  (팀 협업 문서 링크 게시) 
  
  
  </br>
  
  ## 팀원 구성
  | 프로젝트 관리 | UX 디자인 | 서버 개발 | UI 디자인 | 보안 개발 | 데이터 분석 |
  |---------------------|---------------------------|---------------------|----------------|----------------|----------------|
  | **juho-creator** | **lapel0314** | **gyeongyeonkmy** | **june5815** | **try08253-crypto** | **918-jihye** |
  | ![Juho](https://avatars.githubusercontent.com/juho-creator) | ![Lapel](https://avatars.githubusercontent.com/lapel0314) | ![Gyeongyeon](https://avatars.githubusercontent.com/gyeongyeonkmy) | ![June](https://avatars.githubusercontent.com/june5815) | ![Younghwan](https://avatars.githubusercontent.com/try08253-crypto) | ![Jihye](https://avatars.githubusercontent.com/918-jihye) |
  | <div align="center">[김주호](https://github.com/juho-creator)</div> | <div align="center">[고우진](https://github.com/lapel0314)</div> | <div align="center">[김경연](https://github.com/gyeongyeonkmy)</div> | <div align="center">[양다온](https://github.com/june5815)</div> | <div align="center">[장영환](https://github.com/try08253-crypto)</div> | <div align="center">[최지혜](https://github.com/918-jihye)</div> |
  
  
  </br>
  
  -------
  </br>
  
  # 프로젝트 소개
  프로그래밍 교육 사이트의 백엔드 시스템 구축 </br>
  프로젝트 기간: 2025.09.15 ~ 2025.10.02
  </br>
  
  ----
  </br>
  
  ## 기술 스택
  - Backend: Express.js, PrismaORM
  - Database: Postgresql
  - 공통 Tool: Git & Github, Discord, Notion
  </br>
  
  ----
  
  </br>
  
  
  ## 팀원별 구현 기능 상세
  
  **양다온**  
  (자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)  
  </br>
  
  - **그룹 CRUD/검색 API**
    - `POST /groups`, `GET /groups/{groupId}`, `PATCH /groups/{groupId}` 구현
    - Prisma 모델 설계 및 마이그레이션 수행
    - 그룹 생성/수정 시 비밀번호 해싱 및 검증 처리
    - 그룹 목록 검색 및 정렬(최신/추천/참여자 순) 기능 구현
  - **기타 기능**
    - 검색/정렬/페이지네이션 설계
    - DTO 설계 및 단위 테스트, 통합 테스트, cURL 예시 작성
  
  </br>
  
  **김경연**  
  (자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)  
  </br>
  
  - **그룹 참여 및 권한 API**
    - `POST /groups/{groupId}/participants`, `DELETE /groups/{groupId}/participants` 구현
    - 닉네임, 비밀번호 등록 및 검증 처리 (닉네임 중복 제한)
    - 그룹 탈퇴 시 운동 기록 일괄 삭제 처리 (Prisma transaction 사용)
  - **공통 미들웨어 구현**
    - `ensureParticipantAuth` 미들웨어 구현 및 재사용 설계
    - 단위 테스트 및 E2E 테스트 구현
  
  </br>
  
  **최지혜**  
  (자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)  
  </br>
  
  - **운동 기록 등록 API**
    - `POST /groups/{groupId}/records` 구현
    - 참여자 인증 미들웨어 적용, 운동 기록 필드 검증(종류, 시간, 거리, 사진)
  - **Discord Webhook 연동**
    - `DiscordAdapter` 구현 및 비동기 전송, 실패 시 재시도 로직 처리
    - 외부 API mocking 테스트 및 통합 테스트 구현
  
  </br>
  
  **고우진**  
  (자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)  
  </br>
  
  - **그룹 추천 및 정렬 유틸 API**
    - `GET /groups`, `GET /groups/{groupId}/rank` 구현
    - Record 집계(횟수, 누적시간) 및 주/월 기준 통계 제공
    - relation count 기반 정렬 및 페이지네이션 유틸 구현 → R1, R5 재사용
  - **성능 최적화**
    - 인덱스 튜닝 가이드 작성
    - Prisma groupBy 활용, 날짜 쿼리 최적화
  
  </br>
  
  **장영환**  
  (자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)  
  </br>
  
  - **추천 및 배지 부여 API**
    - `POST /groups/{groupId}/likes`, `DELETE /groups/{groupId}/likes`, `DELETE /groups/{groupId}` 구현
    - 좋아요 기능(1회 제한 여부 팀 결정), 삭제 시 연관 데이터 처리
  - **BadgeEvaluator 도메인 서비스**
    - 참여자 수/기록 수/좋아요 수 조건 만족 시 배지 자동 부여
    - 그룹 상세 응답 시 배지 포함 처리
    - 조건부 집계, 경계 테스트 수행
  
  </br>
  
  **김주호**  
  (자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)  
  </br>
  
  - **운동 기록 목록/상세 조회 API**
    - `GET /groups/{groupId}/records` 구현
    - 기록 목록 정렬(최신/운동시간), 닉네임 검색 기능 포함
  - **이미지 업로드 기능**
    - `POST /images` 구현
    - multer를 활용한 멀티파트 이미지 업로드(최대 3장), 확장자 및 용량 검증
    - `StorageProvider` 인터페이스 설계(local | S3 대응)
  
  </br></br>
  
  
  
  ## 파일 구조
  ```plaintext
  src
  ┣ 01-app
  ┃ ┗ server.js
  ┣ 02-controller
  ┃ ┣ req-validator
  ┃ ┗ res-dto
  ┃ ┗ base.controller.js
  ┃ ┗ test1.controller.js
  ┣ 03-domain
  ┃ ┣ entity
  ┃ ┗ service
  ┣ 04-repo
  ┃ ┣ mapper
  ┃ ┗ base.repo.js
  ┣ common
  ┃ ┣ const
  ┃ ┗ exception
  ┃ ┗ lib
  ┣ dependency-injector.js
  ┗ index.js
  prisma
  ┗ schema.prisma
  .gitignore
  package.json
  package-lock.json
  README.md
  ```
  
  ----
  
  ## 구현 홈페이지
  (개발한 홈페이지에 대한 링크 게시) </br>
  https://www.codeit.kr/
  
  </br>
  
  ----
  
  </br>
  
  # 프로젝트 회고록 
  (제작한 발표자료 링크 혹은 첨부파일 첨부)
  - [노션 페이지](https://www.notion.so/1-2025-09-15-25ee9d59f596808f8dbde297962d624b)
  
 