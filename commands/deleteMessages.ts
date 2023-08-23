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

            const messages = await channel.messages.fetch({ limit: number });

            messages.forEach(async (message:any) => {
                const deleted_messages = await message.delete();
                // console.log(deleted_messages);
            });

            await interaction.reply(`Delete ${messages.size} messages.`);

        }
}