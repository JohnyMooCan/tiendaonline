"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.addUsuario = void 0;
const addUsuario = (request, response) => {
    console.log(request.body);
    response.json({
        msg: 'addUsuario',
        req: request.body
    });
};
exports.addUsuario = addUsuario;
const login = (request, response) => {
    console.log(request.body);
    response.json({
        msg: 'login ',
        req: request.body
    });
};
exports.login = login;
