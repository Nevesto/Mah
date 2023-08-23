import { SlashCommandBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('namorada-command')
        .setDescription('Eu amo muito a minha namorada.'),
    
    async execute(interaction:any) {
        await interaction.reply("MINHA NAMORADA É MUITO SEXY BUNDUDA, PEITUDA, GOSTOSA, EU SOU TODO DELA, SOMENTE DELA. EU AMO SÓ ELA!");
    }
}