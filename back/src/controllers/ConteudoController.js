const Conteudo = require('../models/Conteudo');
const Perfil = require('../models/Perfil');

module.exports = {
    async index(req,res){
        const conteudos = await Conteudo.findAll();

        return res.json(conteudos);
    },
    
    async store(req,res){
        const {nome_conteudo} = req.body;

        const conteudo = await Conteudo.create({nome_conteudo});

        return res.json(conteudo);
        
    },

    async delete(req,res){
        const {perfil_id} = req.params;
        const {nome_conteudo} = req.body;

        const perfil = await Perfil.findByPk(perfil_id);

        if(!perfil){
            return res.status(400).json({error:'Perfil não encontrado'});
        }

        const conteudo = await Conteudo.findOne({
            where: { nome_conteudo }
        });

        await perfil.removeConteudo(conteudo);
    
        return res.json();
    }

};