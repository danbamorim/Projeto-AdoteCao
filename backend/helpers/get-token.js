//esse código encapsula a lógica de extração de tokens de autorização de uma requisição HTTP em uma função independente, tornando-a reutilizável em diferentes partes do projeto.


const getToken = (req) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    return token;
  };
  
  module.exports = getToken;