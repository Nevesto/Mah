import { SlashCommandBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('message-purge')
        .setDescription('Delete channel messages.')
        .addIntegerOption((option:any) =>
            option.setName('number')
                .setDescription('Number of messages, example: 100')
                .setRequired(true)),
        async execute(interaction:any) {
            const channel = interaction.channel;
            const number = interaction.options.getInteger('number');
            
            const module_messages = number / 100;
            const resto = module_messages % 100;

            await interaction.deferReply();

            for (let i = 0; i < module_messages; i++) {
                await channel.bulkDelete(100)
            }
            
            await channel.bulkDelete(resto)
                .then(() => interaction.editReply(`Deleted ${number} messages.`).catch(() => {}))
                .catch(() => interaction.editReply(`Could not delete messages.`).catch(() => {}))
        }
}