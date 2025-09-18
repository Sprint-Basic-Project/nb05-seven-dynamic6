[![English](https://img.shields.io/badge/lang-English-blue.svg)](https://github.com/Sprint-Basic-Project/nb05-seven-dynamic6/tree/develop/README.EN.md)
[![Korean](https://img.shields.io/badge/lang-Korean-red.svg)](https://github.com/Sprint-Basic-Project/nb05-seven-dynamic6/tree/develop)

# Dynamic 6  
(Link to team collaboration documents)

</br>

## Team Members  
| Project Manager | UX Designer | Backend Developer | UI Designer | Security Developer | Data Analyst |
|-----------------|-------------|-------------------|--------------|--------------------|---------------|
| **juho-creator** | **lapel0314** | **gyeongyeonkmy** | **june5815** | **try08253-crypto** | **918-jihye** |
| ![Juho](https://avatars.githubusercontent.com/juho-creator) | ![Lapel](https://avatars.githubusercontent.com/lapel0314) | ![Gyeongyeon](https://avatars.githubusercontent.com/gyeongyeonkmy) | ![June](https://avatars.githubusercontent.com/june5815) | ![Younghwan](https://avatars.githubusercontent.com/try08253-crypto) | ![Jihye](https://avatars.githubusercontent.com/918-jihye) |
| <div align="center">[Juho Kim](https://github.com/juho-creator)</div> | <div align="center">[Woojin Ko](https://github.com/lapel0314)</div> | <div align="center">[Gyeongyeon Kim](https://github.com/gyeongyeonkmy)</div> | <div align="center">[Daon Yang](https://github.com/june5815)</div> | <div align="center">[Younghwan Jang](https://github.com/try08253-crypto)</div> | <div align="center">[Jihye Choi](https://github.com/918-jihye)</div> |

</br>

-----

</br>

# Project Overview  
Backend system development for a programming education platform.  
**Project Period:** 2025.09.15 ~ 2025.10.02

</br>

-----

</br>

## Tech Stack
- **Backend:** Express.js, PrismaORM  
- **Database:** PostgreSQL  
- **Tools:** Git & GitHub, Discord, Notion

</br>

-----

</br>

## Features by Member

**Daon Yang**  
(Attach image or GIF of the developed features)  
</br>

- **Group CRUD/Search API**
  - Implemented `POST /groups`, `GET /groups/{groupId}`, `PATCH /groups/{groupId}`
  - Designed Prisma models and handled migrations
  - Password hashing and validation for group creation/edit
  - Search and sort group list by latest/recommendation/participant count
- **Additional Features**
  - Designed search/sort/pagination logic
  - Created DTOs and wrote unit/integration tests and cURL examples

</br>

**Gyeongyeon Kim**  
(Attach image or GIF of the developed features)  
</br>

- **Group Participation & Authorization API**
  - Implemented `POST /groups/{groupId}/participants`, `DELETE /groups/{groupId}/participants`
  - Handled nickname/password validation and uniqueness
  - Deleted workout records upon group leave (via Prisma transaction)
- **Middleware**
  - Developed reusable `ensureParticipantAuth` middleware
  - Created unit and E2E tests

</br>

**Jihye Choi**  
(Attach image or GIF of the developed features)  
</br>

- **Workout Record Registration API**
  - Implemented `POST /groups/{groupId}/records`
  - Used middleware for participant authentication
  - Validated workout fields (type, time, distance, up to 3 images)
- **Discord Webhook Integration**
  - Implemented `DiscordAdapter` with retry logic on failure
  - Created unit/integration tests with mocked external API

</br>

**Woojin Ko**  
(Attach image or GIF of the developed features)  
</br>

- **Group Recommendation & Sorting Utilities**
  - Implemented `GET /groups`, `GET /groups/{groupId}/rank`
  - Aggregated workout data (count, duration) with weekly/monthly filtering
  - Developed relation count-based sorting/pagination utilities (used by R1 & R5)
- **Performance Optimization**
  - Wrote indexing optimization guide
  - Used Prisma groupBy and date-range queries efficiently

</br>

**Younghwan Jang**  
(Attach image or GIF of the developed features)  
</br>

- **Like & Badge System**
  - Implemented `POST /groups/{groupId}/likes`, `DELETE /groups/{groupId}/likes`, `DELETE /groups/{groupId}`
  - Configured like restrictions (e.g., 1 per user, TBD by team)
  - Deleted related data upon group deletion
- **BadgeEvaluator Domain Service**
  - Auto-granted badges when participant ≥ 10, records ≥ 100, likes ≥ 100
  - Badge info returned in group detail API
  - Performed conditional aggregation and edge-case testing

</br>

**Juho Kim**  
(Attach image or GIF of the developed features)  
</br>

- **Workout Record Listing & Detail API**
  - Implemented `GET /groups/{groupId}/records`
  - Supported sorting (by latest/workout time) and nickname filtering
- **Image Upload Feature**
  - Implemented `POST /images`
  - Used `multer` for multipart image uploads (1–3 files)
  - Validated file extensions and size
  - Designed `StorageProvider` interface (local | S3)

</br></br>

## File Structure
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

## Live Website
(Link to the deployed site)  
https://www.codeit.kr/

</br>

----

</br>

# Project Retrospective  
(Link or file attachment of presentation materials)
- [Notion Page](https://www.notion.so/1-2025-09-15-25ee9d59f596808f8dbde297962d624b)

