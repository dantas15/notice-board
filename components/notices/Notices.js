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
 * Alterar um aviso no banco de dados
 * @param {object} notice O aviso deve estar no seguinte formato:
 * {title: <string>, date: <date>, message: <string> }
 * @param {int} id ID do aviso
 * @returns {object} Mensagem de sucesso ou de erro
 */
function edit(notice, id){
  return db('notices').where('ID_notices', id).update(notice)

  .then( _ => {
    return { type:"success", body: `Aviso Alterado com sucesso!` }
  })
  
  .catch(err => {
    return { type:"error", body:`Erro: ${err}`}
  })
} // fim do edit

/**
 * Seleciona todos os avisos cadastrados
 * @return {object} Objeto com todos os avisos cadastrados ou uma mensagem de erro
 */
function selectAll(){
  return db.select('*').from('notices').orderBy('date','asc')
  .then(notices =>{
    return notices
  })
  .catch(err =>{
    return { type: "error", body:`Erro: ${err}`}
  })
}// fim do selectAll

/**
 * Seleciona um aviso
 * @param {*} id ID do aviso que será selecionado
 * @return {object} Objeto com o aviso selecionado
 */
function selectNotice(id){
  return db.select('*').from('notices').where('ID_notices', id).first()
  .then(notice => {return notice})
  .catch(err =>{
    return { type: "error", body:`Erro: ${err}`}
  })
}// fim do selectNotice

/**
 * Função que exclui um aviso no banco de dados
 * @param {int} id Id do aviso
 */
function deletingNotice(id){
  return db.del().from('notices').where('ID_notices', id)
}

module.exports = {
  save, 
  selectAll, 
  selectNotice, 
  deletingNotice,
  edit
}
