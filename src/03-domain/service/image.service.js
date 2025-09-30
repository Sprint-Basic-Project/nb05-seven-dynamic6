// import { Test1ResDto } from "../../02-controller/res-dto/test1.res.dto.js";
// import { Test1 } from "../entity/test1.js";

// export class ImageService {
//   #repos;

//   constructor(repos) {
//     this.#repos = repos;
//   }

//   getAllTests() {
//     const test1 = this.#repos.imageRepo.findAll();
//     // 추가적으로 비즈니스 로직 구현....

//     return test1;
//   }

//   createTest(dto) {
//     const test1Entity = Test1.forCreate(dto);
//     const responseEntity = this.#repos.imageRepo.save(test1Entity);
//     const resDto = new Test1ResDto(responseEntity);
//     return resDto;
//   }
// }
