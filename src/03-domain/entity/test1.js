export class Test1 {
    #id
    #title
    #content

    constructor(id, title, content){
        this.#id = id;
        this.#title = title;
        this.#content = content;
    }

    get id(){
        return this.#id;
    }

    get title(){
        return this.#title;
    }

    get content(){
        return this.#content;
    }


    static forCreate({id, title, content}){
        // 검증 + 생성  
        this.validateTitle(title);
        this.validateContent(content);
        return new Test1(id, title, content);
    }

    static validateTitle(title){
        if (title.length < 1) { 
            throw Error("제목은 1글자 이상으로 작성해주세요");
        }
    }

    static validateContent(content){
        if (content.length < 1) { 
            throw Error("내용은 1글자 이상으로 작성해주세요");
        }
    }
}