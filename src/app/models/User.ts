export default class User {
    authType: string;
    name: string;
    id: number | undefined; // 将 id 改为 number 类型
    nickname?: string; // 修正拼写错误
    email?: string;
    password?: string;
    created_at?: Date;

    constructor(
        authType: string,
        name: string,
        id: number | undefined, // 将 id 改为 number 类型
        nickname?: string, // 修正拼写错误
        email?: string,
        password?: string,
        created_at?: Date
    ) {
        this.authType = authType;
        this.name = name;
        this.id = id;
        this.nickname = nickname; // 修正拼写错误
        this.email = email;
        this.password = password;
        this.created_at = created_at;
    }
}
