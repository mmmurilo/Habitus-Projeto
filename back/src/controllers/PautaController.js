const Pauta = require("../models/Pauta");
const Conteudo = require("../models/Conteudo");

module.exports = {
    async index (req,res){
        const {conteudo_id} = req.params;
        
        const conteudo = await Conteudo.findByPk(conteudo_id,{
            include: {association: 'pautas'}
        });

        return res.json(conteudo);
    },

    async store (req,res){
        const {conteudo_id} = req.params;
        const {desc_pauta} = req.body;

        const conteudo = await Conteudo.findByPk(conteudo_id);

        if(!conteudo){
            return res.status(400).json({error: "Conteúdo não existe"})
        }

        const pauta = await Pauta.create({desc_pauta,conteudo_id});

        return res.json(pauta);
    }
};