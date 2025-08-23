import {Emp} from "../models/pg/emp.model.js";

async function createEmp(login: string, password: string) {
    await Emp.create({login: login, password: password});
}

async function getEmp(login: string, password: string): Promise<Emp> {
    return await Emp.findOne({
        where: {
            login: login,
            password: password,
        },
    });
}

async function getEmpById(id: number): Promise<Emp> {
    return await Emp.findByPk(id);
}

export {createEmp, getEmp, getEmpById}