/* eslint-disable prettier/prettier */
class Token {
  constructor(isiToken){
    this.isiToken = isiToken;
  }
  
  TokenRahasia(){
    let a = 'RekayasaPerangkatLunak';
    return a;
  }
}

module.exports = {
  TokenRahasia: function(){
    const objtkn = new Token('');
    return objtkn.TokenRahasia();
  }
};