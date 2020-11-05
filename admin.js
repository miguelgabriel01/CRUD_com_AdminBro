// Database
const mongoose = require("mongoose");//reuisição ao mongoose

const ProjectSchema = new mongoose.Schema({//criamos um novo obj com os schema
  title: {//titulo do projeto
    type: String,//tipo que neste caso é string(texto)
    required: true,//e é obrigatorio
  },
  description: String,//descrição
  completed: Boolean,//um boleano para testar se esta concluida
  created_at: { type: Date, default: Date.now },//data e hora de criação e atualização
});

const Project = mongoose.model("Project", ProjectSchema);

// Admin Bro
const AdminBro = require("admin-bro");//requisição do adminbro
const AdminBroExpress = require("@admin-bro/express");//uso so express com adminbro
const AdminBroMongoose = require("@admin-bro/mongoose");//uso do mongoose com o adminbro

// use mongoose in AdminBro
AdminBro.registerAdapter(AdminBroMongoose);

// config
const adminBroOptions = new AdminBro({
  resources: [
    {
      resource: Project,
      options: {
        properties: {
          description: { type: "richtext" },
          created_at: {
            isVisible: { edit: false, list: true, show: true, filter: true },
          },
        },
      },
    },
  ],
  locale: {
    translations: {
      labels: {
        Project: "Meus projetos",
      },
    },
  },
  rootPath: "/admin",
});

const router = AdminBroExpress.buildRouter(adminBroOptions);

// Server
const express = require("express");
const server = express();

server.use(adminBroOptions.options.rootPath, router);


// Run App
const run = async () => {
  await mongoose.connect("mongodb://localhost/Projects", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await server.listen(5500, () => console.log("Server started"));
};

run();
