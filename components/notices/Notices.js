const db = require('../../knexfile')

/**
 * Inserir aviso no banco de dados
 * @param {object} notice  O aviso deve estar no seguinte formato:
 * {title: <string>, date: <date>, message: <string> }
 * @returns {object} Mensagem de sucesso ou de erro
 */


function save(notice){
  return db.insert(notice).into('notices')
    .then( _ => {
      return { type:"success", body: `Dados inseridos com sucesso` }
    })
    
    .catch(err => {
      return { type:"error", body:`Erro: ${err}`}
    })

}// fim do salvar

/**
 * Seleciona todos os avisos cadastrados
 * @return {object} Objeto com todos os avisos cadastrados ou uma mensagem de erro
 */
function selectAll(){
  return db.select('*').from('notices')
  .then(notices =>{
    return notices
  })
  .catch(err =>{
    return { type: "error", body:`Erro: ${err}`}
  })
}// fim do selectAll

module.exports = {save, selectAll}
