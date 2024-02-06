const multer = require("multer"); // Um middleware para lidar com o upload de arquivos.
const path = require("path"); // Um módulo integrado do Node.js para manipular caminhos de arquivos.

// Destino para armazenar imagem
const imageStorage = multer.diskStorage({ // Aqui estamos criando uma instância de armazenamento de disco para o multer. Isso significa que os arquivos serão armazenados no disco do servidor.
  destination: function (req, file, cb) { //: Este é um método que define o diretório de destino para os arquivos enviados.
    let folder = " " ; //Inicializando a variável folder como uma string vazia.
    console.log(req)
    if (req.baseUrl.includes('users')) { //Este bloco de código verifica se o URL da solicitação contém a substring 'users
      folder = "users";
    } else if (req.baseUrl.includes('pets')) {
      folder = "pets";
    }
    cb(null, `public/images/${folder}/`);
  },
  filename: (req, file, cb) => { // Este é outro método que define o nome do arquivo a ser salvo.
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({ //ao utilizar esse módulo em outros lugares da aplicação, você pode aplicar o middleware imageUpload para processar solicitações de upload de imagens, garantindo que elas sejam armazenadas no local apropriado e que apenas os formatos desejados sejam aceitos.
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
     // carrega somente formato png e jpg
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };