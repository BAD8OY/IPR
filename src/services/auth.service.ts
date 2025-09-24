import bcrypt from "bcrypt";
import {Emp} from "../models/pg/emp.model.js";

async function createEmp(login: string, password: string) {
    bcrypt.hash(password, 10, async function (err, hash: string) {
        await Emp.create({login: login, password: hash});
    });
}

async function getEmp(login: string, password: string): Promise<Emp> {
    const emp: Emp = await Emp.findOne({
        where: {
            login: login
        }
    });
    if (await bcrypt.compare(password, emp.password).then(function(result: boolean) {
        return result;
    })) {
        return emp;
    }
}

async function getEmpById(id: number): Promise<Emp> {
    return await Emp.findByPk(id);
}

export {createEmp, getEmp, getEmpById}