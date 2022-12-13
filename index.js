const { joinVoiceChannel } = require('@discordjs/voice');

/** 
 * 
 * Mensaje para el futuro developer de este bot
 * 
 * parcero mire este pedaso de codigo ni yo Julian Ramirez (rcomunica#3285) 
 * quien fue el que creo las bases lo entiendo
 * entoneces ¿que le sugiero? 
 * facil NO HAGA NADA ACA  NO TOQUE NADA UD MUEVE ALGO ACA Y SE CAE TODO
 * ENTONCES HECHESE LA BENCICION Y COMIENZE MAS ABAJO
 * 
 * 
 * AMEN
 *
 */ 

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, discordSort, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');
const { channel } = require('node:diagnostics_channel');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Revise esos logs papito!', ephemeral: true });
	}
});

/** FIN DE LA TORTURA :D */




client.on('interactionCreate', async interaction =>{

	function conexion(){
		const connection = joinVoiceChannel({
			channelId: interaction.member.voice.channelId,
			guildId: interaction.guild.id,
			adapterCreator: interaction.guild.voiceAdapterCreator,
			selfDeaf: true,
		});
	}

	console.log(`/${interaction.commandName} se ha ejecutado`)

	if(interaction.commandName == 'join'){

		let JoinEmbed  = new EmbedBuilder()
		.setColor('#00157f')
		.setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL()})
		.setDescription(`Se ha unido exitoxamente a un canal de voz \n\n ¿cual? ni idea pero se unio`)

		conexion()

		interaction.channel.send({ embeds: [JoinEmbed]});
		
	}

	if(interaction.commandName == 'leave'){
		

		const connection = joinVoiceChannel({
			channelId: interaction.member.voice.channelId,
			guildId: interaction.guild.id,
			adapterCreator: interaction.guild.voiceAdapterCreator,
			selfDeaf: true,
		});

		connection.destroy();

		let LeaveEmbed  = new EmbedBuilder()
		.setColor('#00157f')
		.setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL()})
		.setDescription(`Faralloncito bot se salio del canal fantasma :maurisio:`)

		interaction.channel.send({ embeds: [LeaveEmbed]});

	}
	

});


client.login(token);