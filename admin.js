const AdminBro = require("admin-bro");//const para receber a dependencia do admbro
const AdminBroExpress = require("@admin-bro/express");//const que recebe o connector entre o adminbro e o experss

//criamos um novo obj com as configurações
const adminBro = new AdminBro({
    databases: [],
    rootPath: '/admin',
});

const router = AdminBroExpress.buildRouter(adminBro);

const express = require("express");
const server = express();

server 
  .use(adminBro.options.rootPath,router)
  .listen(5500,() => console.log("Servidor iniciado com sucesso"));
