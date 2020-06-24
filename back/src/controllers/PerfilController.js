const Perfil = require('../models/Perfil');
const Curso = require('../models/Curso');
const { default: Conteudo } = require('../../../frontend/src/pages/Conteudo');

module.exports = {
    async index(req,res){
        const perfis = await Perfil.findAll();

        return res.json(perfis);
    },
    
    async store(req,res){
        const {titulo_perfil,lista_conteudos} = req.body;

        const curso = await Curso.findByPk(curso_id);

        if(!curso){
            return res.status(400).json({error:'Curso não encontrado'});
        }

        const [perfil] = await Perfil.findOrCreate({
            where: {titulo_perfil}
        });

    
        return res.json(perfil);
    }
};