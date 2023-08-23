import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
const dotenv = require('dotenv');
const fs = require('node:fs');
const path = require('node:path');
// const { Client, Collection Events, GatewayIntentBits } = require('discord.js');

dotenv.config();
const {TOKEN, CLIENT_ID, GUILD_ID} = process.env;

const client = new Client({intents: [GatewayIntentBits.Guilds]});

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));

client.commands = new Collection();

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`Command in ${filePath} don't has "data or "execute".`)
    }
}

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(TOKEN);

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command:any = interaction.client.commands.get(interaction.commandName);
    if(!command) console.error('Cannot find this command.');
    try {
        await command.execute(interaction);
    } catch(e) {
        console.error(e);
        await interaction.reply('Got and error.');
    }
});